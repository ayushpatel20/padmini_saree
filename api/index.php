<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Content-Type: application/json");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/db.php";
require_once __DIR__ . "/jwt.php";

$SECRET = "padmini_secret_key_123";

function res($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}
function resError($msg, $status = 400) {
    res(["message" => $msg], $status);
}

// Extract path
$scriptDir = dirname($_SERVER["SCRIPT_NAME"]);
$requestUri = explode("?", $_SERVER["REQUEST_URI"])[0];
$route = trim(strpos($requestUri, $scriptDir) === 0 ? substr($requestUri, strlen($scriptDir)) : $requestUri, "/");
$route = preg_replace("/^index\.php\/?/", "", $route);
$parts = explode("/", $route);
$method = $_SERVER["REQUEST_METHOD"];
$input = json_decode(file_get_contents("php://input"), true) ?? [];

function getAuthUser() {
    global $SECRET;
    $headers = getallheaders();
    $authHeader = $headers["Authorization"] ?? $headers["authorization"] ?? $_SERVER["HTTP_AUTHORIZATION"] ?? "";
    if (preg_match("/Bearer\s(\S+)/", $authHeader, $matches)) {
        return jwtDecode($matches[1], $SECRET);
    }
    return null;
}
function requireAuth() {
    $user = getAuthUser();
    if (!$user) resError("Unauthorized", 401);
    return $user;
}
function requireAdmin() {
    $user = requireAuth();
    if (($user["role"] ?? "") !== "admin") resError("Forbidden", 403);
    return $user;
}

try {
    if ($route === "auth/register" && $method === "POST") {
        $name = trim($input["name"] ?? "");
        $email = strtolower(trim($input["email"] ?? ""));
        $password = $input["password"] ?? "";
        if (!$name || !$email || !$password) resError("Please provide name, email, and password");
        if (db_findOne("users", ["email" => $email])) resError("User already exists with this email");
        
        $user = db_insert("users", [
            "name" => $name,
            "email" => $email,
            "password" => password_hash($password, PASSWORD_DEFAULT),
            "role" => "user"
        ]);
        $token = jwtEncode(["id" => $user["_id"], "email" => $user["email"], "role" => $user["role"]], $SECRET);
        res(["token" => $token, "user" => ["id" => $user["_id"], "name" => $name, "email" => $email, "role" => "user"]], 201);
    }
    elseif ($route === "auth/login" && $method === "POST") {
        $email = strtolower(trim($input["email"] ?? ""));
        $password = $input["password"] ?? "";
        if (!$email || !$password) resError("Please provide email and password");
        $user = db_findOne("users", ["email" => $email]);
        if (!$user || !password_verify($password, $user["password"])) resError("Invalid credentials");
        $token = jwtEncode(["id" => $user["_id"], "email" => $user["email"], "role" => $user["role"]], $SECRET);
        res(["token" => $token, "user" => ["id" => $user["_id"], "name" => $user["name"], "email" => $user["email"], "role" => $user["role"]]]);
    }
    elseif ($route === "guest/send-otp" && $method === "POST") {
        res(["success" => true, "message" => "OTP sent successfully (Use code: 123456)"]);
    }
    elseif ($route === "guest/verify-otp" && $method === "POST") {
        $phone = $input["phone"] ?? "";
        $otp = $input["otp"] ?? "";
        if (!$phone || !$otp) resError("Phone and OTP are required");
        if ($otp !== "123456" && $otp !== "1234") resError("Invalid OTP code. Use 123456");
        
        $email = "guest_{$phone}@padminivasthra.com";
        $user = db_findOne("users", ["email" => $email]);
        if (!$user) {
            $user = db_insert("users", ["name" => "Guest ($phone)", "email" => $email, "phone" => $phone, "role" => "guest"]);
        }
        $token = jwtEncode(["id" => $user["_id"], "email" => $user["email"], "role" => $user["role"]], $SECRET);
        res(["token" => $token, "user" => ["id" => $user["_id"], "name" => $user["name"], "email" => $user["email"], "role" => $user["role"]]]);
    }
    elseif ($route === "products" && $method === "GET") {
        res(db_getCollection("products") ?? []);
    }
    elseif ($parts[0] === "reviews" && isset($parts[1]) && $method === "GET") {
        $productId = $parts[1];
        $reviews = db_find("reviews", ["productId" => $productId]) ?? [];
        $count = count($reviews);
        $avg = 0; $breakdown = [1=>0, 2=>0, 3=>0, 4=>0, 5=>0];
        if ($count > 0) {
            $sum = 0;
            foreach ($reviews as $r) {
                $rating = round((float)($r["rating"] ?? 5));
                if (isset($breakdown[$rating])) $breakdown[$rating]++;
                $sum += (float)($r["rating"] ?? 5);
            }
            $avg = round($sum / $count, 1);
        }
        res(["reviews" => $reviews, "count" => $count, "avg" => $avg, "breakdown" => $breakdown]);
    }
    elseif ($parts[0] === "reviews" && isset($parts[1]) && $method === "POST") {
        $u = requireAuth();
        $rating = $input["rating"] ?? null;
        if (!$rating) resError("Rating is required");
        $user = db_findOne("users", ["_id" => $u["id"]]);
        $rev = db_insert("reviews", [
            "productId" => $parts[1], "userId" => $u["id"],
            "userName" => $user ? $user["name"] : "Anonymous",
            "rating" => (int)$rating, "title" => $input["title"] ?? "", "body" => $input["body"] ?? ""
        ]);
        res($rev, 201);
    }
    elseif ($route === "cart" && $method === "GET") {
        $u = requireAuth();
        $items = db_find("cart", ["userId" => $u["id"]]);
        $products = db_getCollection("products");
        $populated = [];
        foreach ($items as $item) {
            $prod = null;
            foreach ($products as $p) { if ($p["_id"] === $item["productId"]) { $prod = $p; break; } }
            $populated[] = [
                "_id" => $item["_id"], "productId" => $item["productId"], "quantity" => $item["quantity"],
                "variant" => $item["variant"] ?? "",
                "name" => $prod ? $prod["name"] : "Unknown Product",
                "price" => $prod ? $prod["price"] : 0,
                "image" => $prod ? (is_array($prod["image"]) ? $prod["image"][0] : $prod["image"]) : "",
                "stock" => $prod ? $prod["stock"] : 0
            ];
        }
        res($populated);
    }
    elseif ($route === "cart/add" && $method === "POST") {
        $u = requireAuth();
        $pid = $input["productId"] ?? "";
        if (!$pid) resError("Product ID is required");
        $qty = (int)($input["quantity"] ?? 1);
        $variant = $input["variant"] ?? "";
        $existing = db_findOne("cart", ["userId" => $u["id"], "productId" => $pid, "variant" => $variant]);
        if ($existing) {
            $upd = db_update("cart", ["_id" => $existing["_id"]], ["quantity" => $existing["quantity"] + $qty]);
            res($upd);
        } else {
            res(db_insert("cart", ["userId" => $u["id"], "productId" => $pid, "quantity" => $qty, "variant" => $variant]));
        }
    }
    elseif ($route === "cart/remove" && $method === "POST") {
        $u = requireAuth();
        db_delete("cart", ["userId" => $u["id"], "productId" => $input["productId"] ?? "", "variant" => $input["variant"] ?? ""]);
        res(["success" => true]);
    }
    elseif ($route === "cart/merge" && $method === "POST") {
        $u = requireAuth();
        $items = $input["items"] ?? [];
        foreach ($items as $it) {
            $pid = $it["productId"] ?? "";
            if (!$pid) continue;
            $qty = (int)($it["quantity"] ?? 1);
            $variant = $it["variant"] ?? "";
            $ex = db_findOne("cart", ["userId" => $u["id"], "productId" => $pid, "variant" => $variant]);
            if ($ex) db_update("cart", ["_id" => $ex["_id"]], ["quantity" => $ex["quantity"] + $qty]);
            else db_insert("cart", ["userId" => $u["id"], "productId" => $pid, "quantity" => $qty, "variant" => $variant]);
        }
        res(["success" => true]);
    }
    elseif ($route === "wishlist" && $method === "GET") {
        $u = requireAuth();
        res(db_find("wishlist", ["userId" => $u["id"]]));
    }
    elseif ($route === "wishlist/toggle" && $method === "POST") {
        $u = requireAuth();
        $pid = $input["productId"] ?? "";
        $ex = db_findOne("wishlist", ["userId" => $u["id"], "productId" => $pid]);
        if ($ex) { db_delete("wishlist", ["_id" => $ex["_id"]]); res(["status" => "removed"]); }
        else { res(db_insert("wishlist", ["userId" => $u["id"], "productId" => $pid])); }
    }
    elseif ($route === "addresses" && $method === "GET") {
        $u = requireAuth();
        res(["success" => true, "addresses" => db_find("addresses", ["userId" => $u["id"]])]);
    }
    elseif ($route === "addresses" && $method === "POST") {
        $u = requireAuth();
        $addr = array_merge(["userId" => $u["id"]], $input);
        res(["success" => true, "address" => db_insert("addresses", $addr)], 201);
    }
    elseif ($parts[0] === "addresses" && isset($parts[1]) && $method === "PUT") {
        $u = requireAuth();
        res(["success" => true, "address" => db_update("addresses", ["_id" => $parts[1], "userId" => $u["id"]], $input)]);
    }
    elseif ($parts[0] === "addresses" && isset($parts[1]) && $method === "DELETE") {
        $u = requireAuth();
        db_delete("addresses", ["_id" => $parts[1], "userId" => $u["id"]]);
        res(["success" => true]);
    }
    elseif ($route === "checkout/create-order" && $method === "POST") {
        $u = requireAuth();
        $order = db_insert("orders", array_merge($input, ["userId" => $u["id"], "status" => "Processing"]));
        db_delete("cart", ["userId" => $u["id"]]);
        res(["success" => true, "order" => $order, "orderId" => $order["_id"]]);
    }
    elseif ($route === "orders" && $method === "GET") {
        $u = requireAuth();
        res(db_find("orders", ["userId" => $u["id"]]));
    }
    elseif ($route === "admin/products" && $method === "GET") {
        requireAdmin();
        res(["success" => true, "products" => db_getCollection("products") ?? []]);
    }
    elseif ($parts[0] === "admin" && $parts[1] === "products" && isset($parts[2]) && $method === "PUT") {
        requireAdmin();
        res(["success" => true, "product" => db_update("products", ["_id" => $parts[2]], $input)]);
    }
    elseif ($parts[0] === "admin" && $parts[1] === "products" && !isset($parts[2]) && $method === "POST") {
        requireAdmin();
        res(["success" => true, "product" => db_insert("products", $input)]);
    }
    elseif ($parts[0] === "admin" && $parts[1] === "products" && isset($parts[2]) && $method === "DELETE") {
        requireAdmin();
        db_delete("products", ["_id" => $parts[2]]);
        res(["success" => true]);
    }
    elseif ($route === "upload" && $method === "POST") {
        requireAdmin();
        if (!isset($_FILES['image'])) {
            resError("Please upload an image file");
        }
        $file = $_FILES['image'];
        if ($file['error'] !== UPLOAD_ERR_OK) {
            resError("Error uploading file");
        }
        $targetDir = __DIR__ . "/../uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        if (!in_array($ext, $allowed)) {
            resError("Only image files are allowed!");
        }
        $filename = time() . '-' . rand(1000, 9999) . '.' . $ext;
        $targetPath = $targetDir . $filename;
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            res(["url" => "/uploads/" . $filename], 201);
        } else {
            resError("Error uploading file");
        }
    }
    elseif ($route === "admin/stats" && $method === "GET") {
        requireAdmin();
        $orders = db_getCollection("orders") ?? [];
        $totalRev = 0; $totalSales = count($orders);
        foreach ($orders as $o) $totalRev += (float)($o["totalAmount"] ?? 0);
        res([
            "success" => true,
            "stats" => [
                "totalSales" => $totalSales, "totalRevenue" => $totalRev,
                "totalProducts" => count(db_getCollection("products") ?? []),
                "totalUsers" => count(db_getCollection("users") ?? [])
            ]
        ]);
    }
    else {
        resError("Not Found", 404);
    }
} catch (Exception $e) {
    resError($e->getMessage(), 500);
}

