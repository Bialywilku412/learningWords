<?php

require_once "../classes/Cards.php";

header('Content-Type: application/json');

if (!isset($_POST['id'])) {
    http_response_code(400);
    exit(json_encode(array("valid" => false, "error" => "MISSING_PARAMETERS")));
}

$id = $_POST['id'];
$card = Cards::getCard($id);

if (!$card) {
    http_response_code(500);
    exit(json_encode(array("valid" => false, "error" => "DOESNT_EXIST")));
}

exit(json_encode(array("valid" => true, "card" => $card)));
