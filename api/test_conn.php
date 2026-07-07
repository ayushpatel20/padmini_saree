<?php
try {
    \ = new PDO("mysql:host=localhost;dbname=padminiv_products;charset=utf8mb4", "padminiv_admin", "padmini12345");
    \->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully!\n";
} catch (PDOException \) {
    echo "PDOException: " . \->getMessage();
} catch (Exception \) {
    echo "Exception: " . \->getMessage();
}
