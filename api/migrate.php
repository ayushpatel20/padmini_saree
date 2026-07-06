<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/db_mysql.php';

// Check if db.json exists
$jsonPath = __DIR__ . '/db.json';
if (!file_exists($jsonPath)) {
    die("Error: db.json not found.");
}

$content = file_get_contents($jsonPath);
$db = json_decode($content, true);

if (!$db) {
    die("Error: Failed to parse db.json or it is empty.");
}

$pdo = getDbConnection();
$totalRecords = 0;

echo "Starting migration...\n";

foreach ($db as $collection => $items) {
    echo "Migrating collection '$collection' (" . count($items) . " items)...\n";
    
    try {
        // Ensure table exists
        ensureTableExists($collection);
        
        // Prepare INSERT statement
        $stmt = $pdo->prepare("INSERT IGNORE INTO `$collection` (_id, data) VALUES (?, ?)");
        
        $count = 0;
        foreach ($items as $item) {
            if (!isset($item['_id'])) {
                $item['_id'] = uniqid() . bin2hex(random_bytes(4));
            }
            
            $stmt->execute([$item['_id'], json_encode($item)]);
            $count++;
            $totalRecords++;
        }
        
        echo "  -> Successfully inserted $count items into `$collection`.\n";
    } catch (Exception $e) {
        echo "  -> Error migrating '$collection': " . $e->getMessage() . "\n";
    }
}

echo "\nMigration complete! A total of $totalRecords records were successfully migrated to MySQL.\n";
