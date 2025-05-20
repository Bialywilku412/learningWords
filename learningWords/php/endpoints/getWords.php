<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../classes/Words.php';

try {
    $words = Words::getWords();

    echo json_encode([
        "valid" => true,
        "words" => $words
    ]);
} catch (Exception $e) {
    // W razie błędu zwracamy JSON z info o błędzie
    echo json_encode([
        "valid" => false,
        "error" => $e->getMessage()
    ]);
}

exit;
