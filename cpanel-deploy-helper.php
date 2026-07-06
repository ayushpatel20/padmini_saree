<?php
/**
 * cPanel Secure Deployment Helper
 *
 * This script handles automated backups, rollbacks, and process restarts
 * for cPanel deployments when SSH is not available.
 *
 * Security: This file MUST be secured with a token.
 */

// Disable error reporting output to client, but log them
ini_set('display_errors', 0);
error_reporting(E_ALL);

header('Content-Type: application/json');

// --- Configuration ---
// Define a hardcoded token fallback, or it will attempt to read DEPLOY_TOKEN from .env
$secret_token = 'padmini_deploy_token_2026_xyz'; 

// Define paths to exclude from backups
$exclusions = [
    '.git',
    '.github',
    'node_modules',
    'scripts',
    '.cpanel',
    '.well-known',
    'logs',
    'tmp',
    'backups',
    'mail',
    'ssl',
    '.env',
    'cgi-bin',
    'api/db.json',
    'uploads',
    'cpanel-deploy-helper.php'
];

$backup_dir = __DIR__ . '/backups';
$app_root = __DIR__;

// --- Token Authentication ---
$provided_token = $_POST['token'] ?? $_GET['token'] ?? null;

// Resolve target token: check hardcoded, then .env file
if (empty($secret_token) && file_exists(__DIR__ . '/.env')) {
    $env_content = file_get_contents(__DIR__ . '/.env');
    if (preg_match('/^DEPLOY_TOKEN\s*=\s*["\'\s]?([^"\'\s#\n]+)/m', $env_content, $matches)) {
        $secret_token = trim($matches[1]);
    }
}

if (empty($secret_token) || empty($provided_token) || !hash_equals($secret_token, $provided_token)) {
    http_response_code(401);
    echo json_encode([
        'status' => 'ERROR',
        'message' => 'Unauthorized. Invalid or missing token.'
    ]);
    exit;
}

$action = $_POST['action'] ?? $_GET['action'] ?? 'test';

switch ($action) {
    case 'test':
        echo json_encode([
            'status' => 'SUCCESS',
            'message' => 'Connection successful. ZipArchive is ' . (extension_loaded('zip') ? 'enabled' : 'DISABLED') . '.'
        ]);
        break;

    case 'backup':
        if (!extension_loaded('zip')) {
            http_response_code(500);
            echo json_encode(['status' => 'ERROR', 'message' => 'PHP ZipArchive extension is not enabled.']);
            exit;
        }

        if (!is_dir($backup_dir)) {
            mkdir($backup_dir, 0755, true);
        }

        $timestamp = date('Ymd_His');
        $zip_file = $backup_dir . '/deploy_backup_' . $timestamp . '.zip';

        $zip = new ZipArchive();
        if ($zip->open($zip_file, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            http_response_code(500);
            echo json_encode(['status' => 'ERROR', 'message' => 'Failed to create zip file archive.']);
            exit;
        }

        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($app_root, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );

        $added_count = 0;
        foreach ($files as $file) {
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($app_root) + 1);

            if (empty($relativePath)) continue;

            if (shouldExclude($relativePath, $exclusions)) {
                continue;
            }

            if ($file->isDir()) {
                $zip->addEmptyDir($relativePath);
            } else {
                $zip->addFile($filePath, $relativePath);
                $added_count++;
            }
        }

        if ($zip->close()) {
            // Prune backups (keep latest 5)
            pruneBackups($backup_dir);
            
            echo json_encode([
                'status' => 'SUCCESS',
                'message' => "Backup completed. Archived {$added_count} files.",
                'file' => basename($zip_file)
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'ERROR', 'message' => 'Failed to finalize ZIP archive.']);
        }
        break;

    case 'rollback':
        if (!extension_loaded('zip')) {
            http_response_code(500);
            echo json_encode(['status' => 'ERROR', 'message' => 'PHP ZipArchive extension is not enabled.']);
            exit;
        }

        // Find latest zip file
        $backups = glob($backup_dir . '/deploy_backup_*.zip');
        if (empty($backups)) {
            http_response_code(400);
            echo json_encode(['status' => 'ERROR', 'message' => 'No backups found to restore.']);
            exit;
        }

        // Sort by modified time descending
        usort($backups, function($a, $b) {
            return filemtime($b) - filemtime($a);
        });

        $latest_backup = $backups[0];

        $zip = new ZipArchive();
        if ($zip->open($latest_backup) !== true) {
            http_response_code(500);
            echo json_encode(['status' => 'ERROR', 'message' => 'Failed to open backup ZIP file.']);
            exit;
        }

        // Extract files
        if ($zip->extractTo($app_root)) {
            $zip->close();
            
            // Restart application (Phusion Passenger)
            $tmp_dir = $app_root . '/tmp';
            if (!is_dir($tmp_dir)) {
                mkdir($tmp_dir, 0755, true);
            }
            touch($tmp_dir . '/restart.txt');
            
            echo json_encode([
                'status' => 'SUCCESS',
                'message' => 'Rollback completed successfully. App restarted.',
                'restored_from' => basename($latest_backup)
            ]);
        } else {
            $zip->close();
            http_response_code(500);
            echo json_encode(['status' => 'ERROR', 'message' => 'Extraction failed during rollback.']);
        }
        break;

    default:
        http_response_code(400);
        echo json_encode(['status' => 'ERROR', 'message' => 'Invalid action requested.']);
        break;
}

// --- Helper Functions ---

function shouldExclude($path, $exclusions) {
    $path = str_replace('\\', '/', $path);
    foreach ($exclusions as $exclusion) {
        if ($path === $exclusion || 
            strpos($path, $exclusion . '/') === 0 || 
            basename($path) === $exclusion) {
            return true;
        }
    }
    return false;
}

function pruneBackups($backup_dir) {
    $backups = glob($backup_dir . '/deploy_backup_*.zip');
    if (count($backups) <= 5) return;
    
    // Sort oldest first
    usort($backups, function($a, $b) {
        return filemtime($a) - filemtime($b);
    });
    
    // Delete until 5 are left
    $delete_count = count($backups) - 5;
    for ($i = 0; $i < $delete_count; $i++) {
        @unlink($backups[$i]);
    }
}
