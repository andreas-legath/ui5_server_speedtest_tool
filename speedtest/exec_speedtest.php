<?php

ini_set("max_execution_time", 300);

$configjson = file_get_contents(getcwd()."/../config/config.json");
$config = json_decode($configjson, true);

$speedtestserver = $config["speedtestserver"];
$speedtestserver = (int) $speedtestserver;

//exec("/usr/local/bin/speedtest-cli --server $speedtestserver --simple 2>&1", $speedtestoutput);
// There is a problem, that sometimes speedtest fails probably because speedtestserver is too busy 
// "Retrieving speedtest.net configuration... Cannot retrieve speedtest configuration"
// Only happens on the hour... So give the speedtest three chances to do the test before really writing a down/empty entry
$i = 0;
do {
	exec("/usr/local/bin/speedtest-cli --server $speedtestserver --simple", $speedtestoutput);
	print_r($speedtestoutput);
	//file_put_contents(getcwd()."/".$datetime.".log", print_r($speedtestoutput, true)); // For writing debug logs...

	if(count($speedtestoutput) <= 0 && $i < 2) {
		sleep(2);
		$i++;
		continue;
	}

	$timestamp = time();
	$datetime = (new DateTime())->format('Y-m-d H:i:s');
	$ping = filter_var($speedtestoutput[0], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
	$download = filter_var($speedtestoutput[1], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
	$upload = filter_var($speedtestoutput[2], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

	$csvline = [$timestamp, $datetime, $ping, $download, $upload];
	$csv_handle = fopen(getcwd()."/speedtest_".$speedtestserver.".csv", "a");
	fputcsv($csv_handle, $csvline);
	fclose($csv_handle);
	return;
} while(true);

?>
