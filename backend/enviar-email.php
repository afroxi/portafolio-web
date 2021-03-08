<?php
    if (isset($_POST['nombre']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['mensaje'])) {
        ini_set('display_errors', 1);
        error_reporting(E_ALL);
        $nombre = $_POST['nombre'];
        $from = $_POST['email'];
        /* Tu email */
        $to = "youremail@gmail.com";
        $subject = $_POST['subject'];
        $message = $_POST['mensaje'];
        $headers = "From: " . $from;
        $success = mail($to, $subject, $message, $headers);
        if ($success) {
            $json = [
                'alerta' => "Su mensaje ha sido enviado",
                'color' => "#3B711C"
            ];
        } else {
            $json = [
                'alerta' => "No se ha podido enviar el mensaje",
                'color' => "#D32020"
            ];
        }
        $jsonStr = json_encode($json);
        echo $jsonStr;
    }
?>