<?php

function getDbConnection() {
    static $pdo = null;
    if ($pdo === null) {
        $host = 'localhost';
        $db   = 'padminiv_products';
        $user = 'padminiv_admin';
        $pass = 'padmini12345';
        $charset = 'utf8mb4';

        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, $user, $pass, $options);
        } catch (\PDOException $e) {
            // If the database connection fails, return null so we can handle it
            error_log("Database connection failed: " . $e->getMessage());
            die(json_encode(["success" => false, "error" => "Database connection failed"]));
        }
    }
    return $pdo;
}

function ensureTableExists($collection) {
    $pdo = getDbConnection();
    if (!preg_match('/^[a-zA-Z0-9_]+$/', $collection)) return false;
    // We use LONGTEXT because MySQL versions < 5.7 don't have native JSON
    // and LONGTEXT works perfectly as a JSON store across all versions.
    $pdo->exec("CREATE TABLE IF NOT EXISTS `$collection` (
        `_id` VARCHAR(191) PRIMARY KEY,
        `data` LONGTEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
    return true;
}

function db_getCollection($collection) {
    return db_find($collection);
}

function db_find($collection, $query = []) {
    if (!ensureTableExists($collection)) return [];
    $pdo = getDbConnection();
    
    // Optimization for simple ID lookup
    if (isset($query['_id']) && count($query) === 1) {
        $stmt = $pdo->prepare("SELECT data FROM `$collection` WHERE _id = ?");
        $stmt->execute([$query['_id']]);
        $row = $stmt->fetch();
        if ($row) {
            $item = json_decode($row['data'], true);
            return [$item];
        }
        return [];
    }

    $stmt = $pdo->query("SELECT data FROM `$collection`");
    $items = [];
    while ($row = $stmt->fetch()) {
        $items[] = json_decode($row['data'], true);
    }

    if (empty($query)) return $items;

    return array_values(array_filter($items, function($item) use ($query) {
        foreach ($query as $k => $v) {
            if (!isset($item[$k]) || $item[$k] !== $v) return false;
        }
        return true;
    }));
}

function db_findOne($collection, $query = []) {
    $res = db_find($collection, $query);
    return count($res) > 0 ? $res[0] : null;
}

function db_insert($collection, $item) {
    if (!ensureTableExists($collection)) return null;
    $pdo = getDbConnection();

    $item["_id"] = isset($item["_id"]) ? $item["_id"] : uniqid() . bin2hex(random_bytes(4));
    $item["createdAt"] = isset($item["createdAt"]) ? $item["createdAt"] : date("c");
    $item["updatedAt"] = isset($item["updatedAt"]) ? $item["updatedAt"] : date("c");

    $stmt = $pdo->prepare("INSERT INTO `$collection` (_id, data) VALUES (?, ?)");
    $stmt->execute([$item["_id"], json_encode($item)]);
    
    return $item;
}

function db_update($collection, $query, $updates) {
    if (!ensureTableExists($collection)) return null;
    $pdo = getDbConnection();

    $items = db_find($collection, $query);
    if (count($items) === 0) return null;
    
    $item = $items[0]; // Update only the first match
    
    foreach ($updates as $uk => $uv) {
        $item[$uk] = $uv;
    }
    $item["updatedAt"] = date("c");
    
    $stmt = $pdo->prepare("UPDATE `$collection` SET data = ? WHERE _id = ?");
    $stmt->execute([json_encode($item), $item['_id']]);
    
    return $item;
}

function db_delete($collection, $query) {
    if (!ensureTableExists($collection)) return true;
    $pdo = getDbConnection();

    $items = db_find($collection, $query);
    foreach ($items as $item) {
        $stmt = $pdo->prepare("DELETE FROM `$collection` WHERE _id = ?");
        $stmt->execute([$item['_id']]);
    }
    return true;
}
