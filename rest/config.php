<?php

if($_SERVER['REQUEST_METHOD'] === "GET") {
	$configJson = file_get_contents("../config/config.json");
	print $configJson;
} else if($_SERVER['REQUEST_METHOD'] === "POST") {
	$postcontent = trim(file_get_contents("php://input"));
	file_put_contents("../config/config.json", $postcontent);

	$configJson = file_get_contents("../config/config.json");
	$config = json_decode($configJson, true);

	$speedtestserver = $config["speedtestserver"];
	$executioninterval = $config["executioninterval"];

	exec("crontab -l | grep -v 'exec_speedtest.sh $speedtestserver'  | crontab -", $output);	// Delete all entries in crontab where this path occures
	switch($executioninterval) {							// Depending on config add cronjob
		case "M": break;
		case "10M":
			$job = "*/10 * * * * cd ".getcwd()."/../speedtest && ./exec_speedtest.sh $speedtestserver";
			exec("(crontab -l; echo '$job') | crontab -");
			break;
		case "1H":
			$job = "0 * * * * cd ".getcwd()."/../speedtest && ./exec_speedtest.sh $speedtestserver";
                        exec("(crontab -l; echo '$job') | crontab -");
			break;
		case "3H":
			$job = "0 */3 * * * cd ".getcwd()."/../speedtest && ./exec_speedtest.sh $speedtestserver";
                        exec("(crontab -l; echo '$job') | crontab -");
			break;
		case "6H":
			$job = "0 */6 * * * cd ".getcwd()."/../speedtest && ./exec_speedtest.sh $speedtestserver";
                        exec("(crontab -l; echo '$job') | crontab -");
			break;
		case "12H":
			$job = "0 */12 * * * cd ".getcwd()."/../speedtest && ./exec_speedtest.sh $speedtestserver";
                        exec("(crontab -l; echo '$job') | crontab -");
			break;
		case "1D":
			$job = "0 0 * * * cd ".getcwd()."/../speedtest && ./exec_speedtest.sh $speedtestserver";
                        exec("(crontab -l; echo '$job') | crontab -");
			break;	
		default: break;
	}
}

?>
