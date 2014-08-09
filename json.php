<?php

// Yahoo! Weather badge (alpha)
// copyright Paul O'Shannessy 2007
// Released under the MIT license
// see http://playground.zpao.com/yweather


// require_once('../shared/lastRSS.php');

// Via Richard Crowley
// @ http://old.richarddcrowley.org/blog/view/125
function curl_quickie($url, $post = FALSE, $print = FALSE) {
   $ch = curl_init($url);
   curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
   curl_setopt($ch, CURLOPT_TIMEOUT, 10);
   curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
   curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
   if (FALSE !== $post) {
      curl_setopt($ch, CURLOPT_POST, TRUE);
      if (is_array($post)) $post = http_build_query($post);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
   }
   if ($print) return curl_exec($ch);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
   return curl_exec($ch);
   # $ch goes out of scope here and is freed accordingly
}

function ppr($data) {
   echo "<pre>"; print_r($data); echo "</pre>";
}
// main code

// get our args
$code = $_GET['p'];
$units = $_GET['u'];
$callback = $_GET['callback'];

// build our json array
$json = array();
$json["url"] = "http://weather.yahoo.com/forecast/" . strtoupper($code) . ".html";

// build the xml url
$url = "http://weather.yahooapis.com/forecastrss?p={$code}&u={$units}";
// get xml via curl
$xml = curl_quickie($url);
// parse the xml
   // (just parsing for yweather:___ using regex

// get location information
$json['location'] = array();
preg_match("'<yweather:location (.*?) />'si", $xml, $location);
preg_match("'city=\"(.*?)\"'si", $location[1], $city);
$json['location']['city'] = $city[1];
preg_match("'region=\"(.*?)\"'si", $location[1], $region);
$json['location']['region'] = $region[1];
preg_match("'country=\"(.*?)\"'si", $location[1], $country);
$json['location']['country'] = $country[1];

// get units information
$json['units'] = array();
preg_match("'<yweather:units (.*?) />'si", $xml, $units);
preg_match("'temperature=\"(.*?)\"'si", $units[1], $temperature);
$json['units']['temperature'] = $temperature[1];
preg_match("'distance=\"(.*?)\"'si", $units[1], $region);
$json['units']['distance'] = $region[1];
preg_match("'pressure=\"(.*?)\"'si", $units[1], $country);
$json['units']['pressure'] = $country[1];
preg_match("'speed=\"(.*?)\"'si", $units[1], $country);
$json['units']['speed'] = $country[1];

//astronomy (sinrise/sunset)
$json['astronomy'] = array();
preg_match("'<yweather:astronomy (.*?) />'si", $xml, $astronomy);
preg_match("'sunrise=\"(.*?)\"'si", $astronomy[1], $temp);
$json['astronomy']['sunrise'] = $temp[1];
preg_match("'sunset=\"(.*?)\"'si", $astronomy[1], $temp);
$json['astronomy']['sunset'] = $temp[1];

//forecast (high/low) - only grab first instance and then only use high and low
// should match up to today
$json['forecast'] = array();
preg_match("'<yweather:forecast (.*?) />'si", $xml, $forecast);
preg_match("'high=\"(.*?)\"'si", $forecast[1], $temp);
$json['forecast']['high'] = $temp[1];
preg_match("'low=\"(.*?)\"'si", $forecast[1], $temp);
$json['forecast']['low'] = $temp[1];

// i'm getting bored and just want the current conditions now...
$json['condition'] = array();
preg_match("'<yweather:condition (.*?) />'si", $xml, $condition);
preg_match("'text=\"(.*?)\"'si", $condition[1], $temp);
$json['condition']['text'] = $temp[1];
preg_match("'code=\"(.*?)\"'si", $condition[1], $temp);
$json['condition']['code'] = $temp[1];
preg_match("'temp=\"(.*?)\"'si", $condition[1], $temp);
$json['condition']['temp'] = $temp[1];
preg_match("'date=\"(.*?)\"'si", $condition[1], $temp);
$json['condition']['date'] = $temp[1];


// encode json
$encoded_json = json_encode($json);
// set our mime-type
header("mime-type:application/json");
// and output (with/without callback)
if (isset($callback)) {
   echo "{$callback}({$encoded_json})";
} else {
   echo $encoded_json;
}
?>
