<?php

function post_request(): array {
    $curl = curl_init();
    $response = null;

    curl_setopt_array($curl, [
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_URL => "https://localhost/api",
        CURLOPT_RETURNTRANSFER => true,
        // CURLOPT_SSL_VERIFYPEER => false,
        // CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_POSTFIELDS => json_encode([
            "a" => 1
        ]),
        CURLOPT_HTTPHEADER => [
            "Accept" => "application/json"
        ],
    ]);
    $response = curl_exec($curl);
    curl_close($curl);
    if(curl_getinfo($curl, CURLINFO_RESPONSE_CODE) != 200)
        return [];

    return json_decode($response, true);
}

?>