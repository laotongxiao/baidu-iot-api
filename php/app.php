<?php
$AK = "c02376d42a05434c***************";
$SK = "08ead63a52f84adc***************";
require_once("interfaceDevice.class.php");
require_once("auth.class.php");
$one = new baiduAuth($AK, $SK);
echo "<br>";
echo $one->device01();
?>