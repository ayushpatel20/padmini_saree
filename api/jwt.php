<?php
function jwtEncode($payload, $secret = "your_super_secret_key_change_this") {
    $header = json_encode(["alg" => "HS256", "typ" => "JWT"]);
    $base64UrlHeader = str_replace(["+", "/", "="], ["-", "_", ""], base64_encode($header));
    $base64UrlPayload = str_replace(["+", "/", "="], ["-", "_", ""], base64_encode(json_encode($payload)));
    $signature = hash_hmac("sha256", $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
    $base64UrlSignature = str_replace(["+", "/", "="], ["-", "_", ""], base64_encode($signature));
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

function jwtDecode($jwt, $secret = "your_super_secret_key_change_this") {
    $tokenParts = explode(".", $jwt);
    if (count($tokenParts) != 3) return null;
    $header = base64_decode(str_replace(["-", "_"], ["+", "/"], $tokenParts[0]));
    $payload = base64_decode(str_replace(["-", "_"], ["+", "/"], $tokenParts[1]));
    $signatureProvided = $tokenParts[2];
    $base64UrlHeader = $tokenParts[0];
    $base64UrlPayload = $tokenParts[1];
    $signature = hash_hmac("sha256", $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
    $base64UrlSignature = str_replace(["+", "/", "="], ["-", "_", ""], base64_encode($signature));
    if ($base64UrlSignature === $signatureProvided) {
        $p = json_decode($payload, true);
        if (isset($p["exp"]) && $p["exp"] < time()) return null; // Expired
        return $p;
    }
    return null;
}

