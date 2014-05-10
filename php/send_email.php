<?php

if(isset($_POST['email'])) {

    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "demontiejunior@gmail.com";
    $email_subject = "[Site] ";

    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }

    // validation expected data exists
    if(!isset($_POST['name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['subject']) ||
        !isset($_POST['message'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    $name = $_POST['name']; // required
    $email_from = $_POST['email']; // required
    $subject = $_POST['subject']; // required
    $message = $_POST['message']; // required

    $error_message = "";

    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }

    $email_message .= clean_string($name).", with e-mail ";
    $email_message .= clean_string($email_from).", sent the message below:\n";
    $email_message .= "\n==================================================\n\n";
    $email_message .= clean_string($message)."\n";

// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject.$subject, $email_message, $headers);

 $redirect = "../";

 header("location:$redirect");

}
?>
