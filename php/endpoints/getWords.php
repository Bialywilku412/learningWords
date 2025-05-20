<?php

require_once "..classes/Database.php";
require_once "..classes/Words.php";

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);

$words = Words::getWords();

exit(json_encode(array("valid" => true, "words" => $words)));
