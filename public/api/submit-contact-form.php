<?php

echo (function () {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        return "Error: REQUEST_METHOD";
    }


    // form person's name
    $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $name = urldecode($name);
    if (!$name) {
        return "Error: name empty";
    }


    // form person's email address
    $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
    $email = urldecode($email);
    if (!$email) {
        return "Error: email empty after sanitizing";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Error: email format failed";
    }
    if (!domainExists($email)) {
        return "Error: email domain " . $email . " does not exist.";
    }


    // form person's phone number
    $phone = filter_input(INPUT_POST, "phone", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $phone = urldecode($phone);


    // form person's subject
    $subject = filter_input(INPUT_POST, "subject", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $subject = urldecode($subject);
    if (!$subject) {
        return "Error: subject empty";
    }


    // form person's message
    $message = filter_input(INPUT_POST, "message", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $message = urldecode($message);
    if (!$message) {
        return "Error: message empty";
    }


    $htmlMsg = '<html lang="fr-CA">
            <body>
              <h1>Formulaire de contact gestiondesroches.com</h1>
              <br>
              <h3>Nom: ' . $name . '</h3>
              <p>Courriel: ' . $email . '</p>
              <p>Téléphone: ' . $phone . '</p>
              <p>Sujet: ' . $subject . '</p>
              <h3>Message: ' . $message . '</h3>
            </body>
            </html>';

    // To send HTML messages, the Content-type header must be set:
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=utf-8\r\n";

    // define sender address for the default php sendmail method otherwise it's financed@rockland.dns...
    $fdSendingAdress = '-f contact@site.com';

    if (mail("alexandre_d_7@hotmail.com",
        "Site.com - Formulaire de contact",
        $htmlMsg, $headers, $fdSendingAdress)
    ) {
        return "EMAIL_SENT_SUCCESSFULLY";
    }
    return "ERROR";

})();


function domainExists($emailAddress) {
    $array = explode("@", $emailAddress);
    $domain = idn_to_ascii(array_pop($array));
    return checkdnsrr($domain . ".", "MX");
}