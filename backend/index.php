<?php 

include('common/cors_header.php');
include('database/words.php');

cors_header();
header("Content-Type: application/json");

$json = file_get_contents('php://input');

$data = json_decode($json);
if ($data->word_prefix === NULL) {
    // Todo:  Error handling
    http_response_code(500);
    echo json_encode(array('errorCode' => 500, 'error' => "word_prefix required when calling wordleAutocomplete"));
    exit();
}

$filtered_words = fetchFilteredWords($data->word_prefix);

echo json_encode($filtered_words);
exit();