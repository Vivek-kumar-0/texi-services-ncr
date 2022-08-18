<?php
header("Refresh:5");
$servername = "localhost";
$username = "root";
$dbpassword = "";
$dbname = "booking";

$conn = mysqli_connect($servername, $username, $dbpassword, $dbname);
if (!$conn) {
    echo "connection fail";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $passenger = $_POST['passenger'];
    $pick_up_time = $_POST['time'];
    $pstreet = $_POST['pstreet'];
    $pcity = $_POST['pcity'];
    $pstate = $_POST['pstate'];
    $pzip_code = $_POST['pzipcode'];
    $vehicle = $_POST['vehicle'];
    $side = $_POST['trip'];
    $message = $_POST['message'];

    $temp ="INSERT INTO booking ( name, email, phone, passenger, time, pstreet, pcity,pstate, pzipcode, vehicle,  trip, message) VALUES ('$name','$email','$phone','$passenger','$pick_up_time','$pstreet','$pcity','$pstate','$pzip_code','$vehicle','$side', '$message')";
        mysqli_query($conn,$temp)or die("query fail");
        echo '<script> alart("data submitted")</script>';
}