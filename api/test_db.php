<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
echo "Testing DB...\n";
try {
    \ = new PDO("mysql:host=localhost;dbname=padminiv_products;charset=utf8mb4", "padminiv_admin", "padmini12345");
    \->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully!\n";
    
    \->exec("CREATE TABLE IF NOT EXISTS \	est\ (\id\ INT PRIMARY KEY)");
    echo "Table created!\n";
} catch (Exception \) {
    echo "Error: " . \->getMessage();
}
