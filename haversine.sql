SELECT id, irszam, varos, cim, ROUND(( 
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
HAVING tavolsag < 2 
ORDER BY tavolsag ASC
LIMIT 10;

47.5305604,19.078334

/* egy megadott helyhez viszonyítva (47.5305604,19.078334) mennyi bolt van 2 km körzetben */

SELECT id, irszam, varos, cim, ROUND(( 
	6371 
	* acos( cos( radians(47.53056) ) 
		* cos( radians( lat ) ) 
		* cos( radians( lng ) 
			- radians(19.07833) ) 
		+ sin( radians(47.53056) ) 
		* sin( radians(lat) ) 
	) 
)*1000) / 1000 AS tavolsag 
FROM spar 
HAVING tavolsag < 2 
ORDER BY tavolsag ASC
LIMIT 10;

