<?php
function getDbPath() {
    return __DIR__ . "/db.json";
}

function readDb() {
    $path = getDbPath();
    if (!file_exists($path)) {
        return [
            "users" => [], "products" => [], "cart" => [],
            "wishlist" => [], "addresses" => [], "orders" => [], "reviews" => []
        ];
    }
    $content = file_get_contents($path);
    return json_decode($content, true) ?: [];
}

function writeDb($data) {
    file_put_contents(getDbPath(), json_encode($data, JSON_PRETTY_PRINT));
}

function db_getCollection($name) {
    $db = readDb();
    return isset($db[$name]) ? $db[$name] : [];
}

function db_find($collection, $query = []) {
    $items = db_getCollection($collection);
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
    $db = readDb();
    if (!isset($db[$collection])) $db[$collection] = [];
    $item["_id"] = isset($item["_id"]) ? $item["_id"] : uniqid() . bin2hex(random_bytes(4));
    $item["createdAt"] = isset($item["createdAt"]) ? $item["createdAt"] : date("c");
    $item["updatedAt"] = isset($item["updatedAt"]) ? $item["updatedAt"] : date("c");
    $db[$collection][] = $item;
    writeDb($db);
    return $item;
}

function db_update($collection, $query, $updates) {
    $db = readDb();
    if (!isset($db[$collection])) return null;
    $updatedItem = null;
    foreach ($db[$collection] as &$item) {
        $match = true;
        foreach ($query as $k => $v) {
            if (!isset($item[$k]) || $item[$k] !== $v) {
                $match = false; break;
            }
        }
        if ($match) {
            foreach ($updates as $uk => $uv) {
                $item[$uk] = $uv;
            }
            $item["updatedAt"] = date("c");
            $updatedItem = $item;
            break; // Update only first match (like node backend)
        }
    }
    if ($updatedItem) {
        writeDb($db);
    }
    return $updatedItem;
}

function db_delete($collection, $query) {
    $db = readDb();
    if (!isset($db[$collection])) return true;
    $initialCount = count($db[$collection]);
    $db[$collection] = array_values(array_filter($db[$collection], function($item) use ($query) {
        foreach ($query as $k => $v) {
            if (!isset($item[$k]) || $item[$k] !== $v) return true; // Keep it
        }
        return false; // Remove it
    }));
    if (count($db[$collection]) !== $initialCount) {
        writeDb($db);
    }
    return true;
}

