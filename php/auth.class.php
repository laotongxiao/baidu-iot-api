<?php

class baiduAuth implements interfaceDevice{
    public $accessKeyId;
    public $secretAcessKey;
	public $host = interfaceDevice::HOST;
    function __construct($accessKeyId,$secretAcessKey){
        $this->accessKeyId = $accessKeyId; 
        $this->secretAcessKey = $secretAcessKey;
    } 
	function device01(){
		$x_bce_date = date('Y-m-d\TH:i:s\Z', time() - date('Z'));
		//$x_bce_date = "2020-03-20T13:33:41Z";
		$authStringPrefix = "bce-auth-v1" . "/" . $this->accessKeyId . "/" . $x_bce_date . "/" . "1800";
        $signingKey = hash_hmac('sha256', $authStringPrefix, ($this->secretAcessKey));
		
		$deviceUrl = interfaceDevice::DEVICEURL01;
		$deviceName = interfaceDevice::DEVICENAME01;
		$method = interfaceDevice::METHOD01;
		$canonicalQueryString = interfaceDevice::CANONICALQUERYSTRING;
		$CanonicalRequest = $method . "\n" . $deviceUrl . $deviceName . "\n" . $canonicalQueryString . "\n" . "host:" . $this->host;
        $signature = hash_hmac('sha256', $CanonicalRequest, $signingKey);
		//echo interfaceDevice::DEVICEURL01;
		echo $CanonicalRequest;
		echo "<br>";
		echo $signature;
		$authString = $authStringPrefix . "/host/" . $signature;
		$authorization = "Authorization:" . $authString;
		$hostUrl = "Host:" . $this->host;
		$contentType = "Content-type:application/json; charset=utf-8";
        $headerArray = array($authorization, $hostUrl, $contentType);
		$url = "http://" . $this->host . $deviceUrl . $deviceName;
		echo "<br>";
		echo $url;
		echo "<br>";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch,CURLOPT_HTTPHEADER,$headerArray);
        $output = curl_exec($ch);
        curl_close($ch);
        //$output = json_decode($output,true);
		var_dump($output);
	}
}
?>