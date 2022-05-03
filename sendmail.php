<?php
$root = $_SERVER['DOCUMENT_ROOT'];

use PHPMailer\PHPMailer\PHPMailer;

require $root . '/script/PHPMailer.php';
require $root . '/script/Exception.php';

print_r($_POST);

$firstname = trim(htmlspecialchars($_POST['firstname']));
$lastname = trim(htmlspecialchars($_POST['lastname']));
$email = trim(htmlspecialchars($_POST['email']));
$phone = trim(htmlspecialchars($_POST['full_phone']));
$country = trim(htmlspecialchars($_POST['country']));
$message = trim(htmlspecialchars($_POST['message']));

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->isHTML(true);

$mail->setFrom('info@swisshealth.ivlap.ru');
$mail->addAddress('laim0302@mail.ru');
$mail->Subject = 'Feedback from swisshealh.ivlap.ru';

$body = '<p><strong>Name</strong> ' . $firstname . ' ' . $lastname . '</p>';
$body .= '<p><strong>Email</strong> ' . $email . '</p>';
$body .= '<p><strong>Phone</strong> ' . $phone . '</p>';
$body .= '<p><strong>Country</strong> ' . $country . '</p>';
$body .= '<p><strong>Message</strong> ' . $message . '</p>';

$mail->Body = $body;

if (!$mail->send()) {
	$message = 'Sorry, an error has occurred. <br> Try again';
} else {
	$message = 'Data sent successfully. <br> We will contact you as soon as possible';
}

echo ($message);
