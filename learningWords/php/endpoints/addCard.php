<?php

require_once __DIR__ . '/../classes/Cards.php';

header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Debugging
// error_log("INPUT: " . $input);

if (!isset($data['name']) || empty(trim($data['name']))) {
    http_response_code(400);
    echo json_encode(["valid" => false, "error" => "NO_NAME"]);
    exit;
}

$name = trim($data['name']);

$success = Cards::addCard($name);

if (!$success) {
    http_response_code(500);
    echo json_encode(["valid" => false, "error" => "DATABASE_ERROR"]);
    exit;
}

echo json_encode(["valid" => true]);
exit;
