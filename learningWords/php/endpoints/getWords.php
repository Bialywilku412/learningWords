<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../classes/Words.php';
header('Content-Type: application/json');

$words = Words::getWords();
if(!$words) {
    http_response_code(500);
    exit(json_encode(array("valid" => false, "error" => "DOESNT_EXIST")));
}

exit(json_encode(array("valid" => true, "words" => $words)));
