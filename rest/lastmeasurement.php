<?php

$configJson = file_get_contents("../config/config.json");
$config = json_decode($configJson, true);

$speedtestserver = $config["speedtestserver"];
$speedtestserver = (int) $speedtestserver;


$speedtestCsv = file("../speedtest/speedtest_".$speedtestserver.".csv");
$return = array("timestamp" => 0, "datetime" => "never", "ping" => 0, "download" => 0, "upload" => 0);
if(count($speedtestCsv) > 0) {
	$lastMeasurement = $speedtestCsv[count($speedtestCsv) - 1];
	$lastMeasurement = str_getcsv($lastMeasurement);
	$return["timestamp"] = $lastMeasurement[0];
	$return["datetime"]  = $lastMeasurement[1];
	$return["ping"]      = round($lastMeasurement[2], 2);
	$return["download"]  = round($lastMeasurement[3], 2);
	$return["upload"]    = round($lastMeasurement[4], 2);
}
echo json_encode($return);

?>
