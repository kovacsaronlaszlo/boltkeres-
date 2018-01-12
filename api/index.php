<?php 
$lat 	= (isset($_GET['lat'])) ? (float)$_GET['lat'] : 47.4982656;
$lng 	= (isset($_GET['lng'])) ? (float)$_GET['lng'] : 19.03779;
$radius = (isset($_GET['radius'])) ? (int)$_GET['radius'] : 5;
$limit 	= (isset($_GET['limit'])) ? (int)$_GET['limit'] : 5;

// kapcsollódás az adatbázishoz
$dbconn = mysqli_connect('localhost', 'root', '', 'boltkereso');
mysqli_query($dbconn, "SET NAMES UTF8");

// sql parancs ami megcsinálja a boltkeresést
$sql = "SELECT id, lat, lng, irszam, varos, cim, ROUND(( 
			6371 
			* acos( cos( radians({$lat}) ) 
				* cos( radians( lat ) ) 
				* cos( radians( lng ) 
					- radians({$lng}) ) 
				+ sin( radians({$lat}) ) 
				* sin( radians(lat) ) 
			) 
		)*1000) / 1000 AS tavolsag 
		FROM spar 
		HAVING tavolsag < {$radius} 
		ORDER BY tavolsag ASC
		LIMIT {$limit}";

$result = mysqli_query($dbconn, $sql);
$json = array();
while($row = mysqli_fetch_assoc($result)) {
	$json[] = $row;
}
header("Access-Control-Allow-Origin: *");
header("Content_Type: application/json; charset=utf-8");
print json_encode($json, JSON_UNESCAPED_UNICODE);


