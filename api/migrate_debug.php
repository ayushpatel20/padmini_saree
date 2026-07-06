<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/db_mysql.php';

// Check if db.json exists
\ = __DIR__ . '/db.json';
if (!file_exists(\)) {
    die("Error: db.json not found.");
}

\ = file_get_contents(\);
\ = json_decode(\, true);

if (!\) {
    die("Error: Failed to parse db.json or it is empty.");
}

\ = getDbConnection();
\ = 0;

echo "Starting migration...\n";

foreach (\ as \ => \) {
    echo "Migrating collection '\' (" . count(\) . " items)...\n";
    
    // Ensure table exists
    ensureTableExists(\);
    
    // Prepare INSERT statement
    \ = \->prepare("INSERT IGNORE INTO \ (_id, data) VALUES (?, ?)");
    
    \ = 0;
    foreach (\ as \) {
        if (!isset(\['_id'])) {
            \['_id'] = uniqid() . bin2hex(random_bytes(4));
        }
        
        \->execute([\['_id'], json_encode(\)]);
        \++;
        \++;
    }
    
    echo "  -> Successfully inserted \ items into \.\n";
}

echo "\nMigration complete! A total of \ records were successfully migrated to MySQL.\n";
