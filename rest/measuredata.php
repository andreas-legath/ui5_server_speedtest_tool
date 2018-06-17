<?php

$configJson = file_get_contents("../config/config.json");
$config = json_decode($configJson, true);

$speedtestserver = $config["speedtestserver"];
$speedtestserver = (int) $speedtestserver;


$speedtestCsv = file("../speedtest/speedtest_".$speedtestserver.".csv");

$timestampFrom = $_GET["from"];
$timestampTo = $_GET["to"];
$request = $_GET["request"];

$return = array();
$return["ping"] = array();
$return["download"] = array();
$return["upload"] = array();

$dateValues = array();
$pingValues = array();
$downloadValues = array();
$uploadValues = array();


foreach($speedtestCsv as $speedtestCsvLine) {
	$speedtestCsvLine = str_getcsv($speedtestCsvLine);
	if(isset($timestampFrom) && (int)$timestampFrom > (int)$speedtestCsvLine[0]) {
		continue;
	}
	if(isset($timestampTo) && (int)$timestampTo < (int)$speedtestCsvLine[0]) {
		continue;
	}
	$dateValues[] = $speedtestCsvLine[1];

	if(empty($request) || $request == "ping") {
		$pingValues[] = $speedtestCsvLine[2];
	}
	if(empty($request) || $request == "download") {
		$downloadValues[] = $speedtestCsvLine[3];
	}
	if(empty($request) || $request == "upload") {
		$uploadValues[] = $speedtestCsvLine[4];
	}
}

if(count($pingValues) > 0) {
	$return["ping"]["cnt"] = count($pingValues);
	$return["ping"]["avg"] = round(array_sum(array_filter($pingValues)) / count(array_filter($pingValues)), 2);
	$return["ping"]["min"] = round(min(array_filter($pingValues)), 2);
	$return["ping"]["max"] = round(max($pingValues), 2);
	$return["ping"]["out"] = $return["ping"]["cnt"] - count(array_filter($pingValues));
	$return["ping"]["outp"]= round(($return["ping"]["out"] / $return["ping"]["cnt"]) * 100, 2);
	for($i = 0; $i < count($pingValues); $i++) {
		$return["ping"]["data"][] = array(
			"datetime" => $dateValues[$i], 
			"value" => $pingValues[$i],
			"toavgabs" => round($pingValues[$i] - $return["ping"]["avg"], 2),
                        "toavgrel" => round((($pingValues[$i] / $return["ping"]["avg"]) - 1) * 100, 2)
		);

	}
}

if(count($downloadValues) > 0) {
	$return["download"]["cnt"] = count($downloadValues);
	$return["download"]["avg"] = round(array_sum(array_filter($downloadValues)) / count(array_filter($downloadValues)), 2);
	$return["download"]["min"] = round(min(array_filter($downloadValues)), 2);
	$return["download"]["max"] = round(max($downloadValues), 2);
	$return["download"]["out"] = $return["download"]["cnt"] - count(array_filter($downloadValues));
        $return["download"]["outp"]= round(($return["download"]["out"] / $return["download"]["cnt"]) * 100, 2);
	for($i = 0; $i < count($downloadValues); $i++) {
                $return["download"]["data"][] = array(
			"datetime" => $dateValues[$i], 
			"value"    => $downloadValues[$i], 
			"toavgabs" => round($downloadValues[$i] - $return["download"]["avg"], 2),
			"toavgrel" => round((($downloadValues[$i] / $return["download"]["avg"]) - 1) * 100, 2)
		);
        }

}

if(count($uploadValues) > 0) {
	$return["upload"]["cnt"] = count($uploadValues);
	$return["upload"]["avg"] = round(array_sum(array_filter($uploadValues)) / count(array_filter($uploadValues)), 2);
	$return["upload"]["min"] = round(min(array_filter($uploadValues)), 2);
	$return["upload"]["max"] = round(max($uploadValues), 2);
	$return["upload"]["out"] = $return["upload"]["cnt"] - count(array_filter($uploadValues));
        $return["upload"]["outp"]= round(($return["upload"]["out"] / $return["upload"]["cnt"]) * 100, 2);

	for($i = 0; $i < count($uploadValues); $i++) {
                $return["upload"]["data"][] = array(
			"datetime" => $dateValues[$i], 
			"value" => $uploadValues[$i],
			"toavgabs" => round($uploadValues[$i] - $return["upload"]["avg"], 2),
                        "toavgrel" => round((($uploadValues[$i] / $return["upload"]["avg"]) - 1) * 100, 2)
		);

        }

}

echo json_encode($return);

?>
