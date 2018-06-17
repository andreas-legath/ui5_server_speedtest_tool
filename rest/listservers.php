<?php

// Initialize the command line output array
$speedtestcli_outputs = array();
// Initialize the returning array which will be reprsented as json
$json = array();

// Execute the speedtest tool and receive output
exec("speedtest-cli --list", $speedtestcli_outputs);

// Remove first line... Description text of output
array_shift($speedtestcli_outputs);

foreach($speedtestcli_outputs as $speedtestcli_output) {
	$parts = explode(")", $speedtestcli_output, 2);

	$entry = array();
	$entry["id"] = intval($parts[0]);
	$entry["text"] = $parts[1];
	array_push($json, $entry);
}

print json_encode($json);

?>
