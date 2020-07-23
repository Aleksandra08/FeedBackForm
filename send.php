<?php

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];

$firstname = htmlspecialchars($firstname);
$lastname = htmlspecialchars($lastname);
$email = htmlspecialchars($email);

$firstname = urldecode($firstname);
$lastname = urldecode($lastname);
$email = urldecode($email);

$firstname = trim($firstname);
$lastname = trim($lastname);
$email = trim($email);


mail("saffylia@gmail.com", "Заявка с сайта", "ФИО:".$firstname $lastname."  . E-mail: ".$email" );



if (mail("saffylia@gmail.com", "Заказ с сайта", "ФИО:".$firstname $lastname.". E-mail: ".$email"))
 {
    echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}
    }
?>
