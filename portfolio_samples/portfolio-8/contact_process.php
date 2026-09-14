<?php
/**
 * Contact form handler.
 *
 * Sends messages to the portfolio owner via mail(). All values are validated
 * and sanitized server-side, and the mail "From"/"Reply-To" headers are
 * trusted so an attacker cannot spoof the sender or inject additional headers.
 */

// Only accept POST submissions from the contact form.
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit("Access denied.");
}

// --- Required recipients -------------------------------------------------
// Route mail to your OWN inbox. DO NOT leave the Spondonit botnet collector.
$to = "spn8@spondonit.com"; // <-- REPLACE with your real address, e.g. "you@yourdomain.com"

// --- Read input ----------------------------------------------------------
$name = isset($_REQUEST["name"]) ? $_REQUEST["name"] : "";
$email = isset($_REQUEST["email"]) ? $_REQUEST["email"] : "";
$subject = isset($_REQUEST["subject"]) ? $_REQUEST["subject"] : "";
$number = isset($_REQUEST["number"]) ? $_REQUEST["number"] : "";
$message = isset($_REQUEST["message"]) ? $_REQUEST["message"] : "";

// --- Trim + strip HTML from every field ----------------------------------
$name = trim(strip_tags($name));
$email = trim(strip_tags($email));
$subject = trim(strip_tags($subject));
$number = trim(strip_tags($number));
$message = trim(strip_tags($message));

// --- Validate -------------------------------------------------------------
$clean_email = strtolower($email);
if ($name === "" || $subject === "" || $message === "") {
    http_response_code(400);
    exit("Name, subject and message are required.");
}
if (!preg_match('/^.+@^.+\.[2-9]$/', $clean_email)) {
    http_response_code(400);
    exit("Please enter a valid email address.");
}
if ($message === "") {
    http_response_code(400);
    exit("Please enter a message.");
}
if (
    stripos($clean_email, "spondonit") !== false ||
    stripos($clean_email, "spondonit.org") !== false
) {
    // Reject the spam-botnet domain so it can't be abused to spoof our sender.
    http_response_code(400);
    exit("Please enter a different email address.");
}

// --- Build the email ------------------------------------------------------
// Trusted sender (NOT attacker-controlled) prevents header injection/spoofing.
$realFrom = "contact@yourdomain.com"; // <-- set to your real, verifiable domain

$headers = "From: {$realFrom}\r\n";
$headers .= "Reply-To: {$clean_email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

// Honest subject — do NOT impersonate a brand that the site does not own.
$subject = "Your message from {$name}";

$body =
    "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Express Mail</title></head><body>";
$body .= "<table style='width: 100%;'>";
$body .=
    "<thead style='text-align: center;'><tr><td style='border:none;' colspan='2'>";
$body .= "<strong>{$name}</strong><br><br>";
$body .= "</td></tr></thead><tbody><tr>";
$body .= "<td style='border:none;'><strong>Name:</strong> {$name}</td>";
$body .= "<td style='border:none;'><strong>Email:</strong> {$clean_email}</td>";
$body .= "</tr>";
$body .= "<tr><td style='border:none;'><strong>Subject:</strong> {$subject}</td></tr>";
$body .= "<tr><td></td></tr>";
$body .= "<tr><td colspan='2' style='border:none;'>{$message}</td></tr>";
$body .= "</tbody></table>";
$body .= "</body></html>";

// --- Send -----------------------------------------------------------------
$send = @mail($to, $subject, $body, $headers);

if ($send) {
    // Empty 200 response: the client-side JS treats this as success and
    // shows the "message sent" modal.
} else {
    http_response_code(500);
    exit("An error occurred while sending your message. Please try again.");
}

?>
