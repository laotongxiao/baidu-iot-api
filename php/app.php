<?php
$AK = "c02376d42a05434c9827f0c5706dc970";
$SK = "08ead63a52f84adc806d51c2e6174520";
require_once("interfaceDevice.class.php");
require_once("auth.class.php");
$one = new baiduAuth($AK, $SK);
echo "<br>";
echo $one->device01();
?>