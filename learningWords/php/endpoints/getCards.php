<?php

require_once __DIR__ . '/../classes/Cards.php';

header('Content-Type: application/json');

$cards = Cards::getCards();

if(!$cards) {
    http_response_code(500);
    exit(json_encode(array("valid" => false, "error" => "DOESNT_EXIST")));

}

exit(json_encode(array("valid" => true, "cards" => $cards)));
