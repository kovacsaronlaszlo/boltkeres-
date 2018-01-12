/* kezdeti értékek */
  var map;
  var markers = [];
  var lat = 47.49734;
  var lon = 19.05985;
  var radius = 2;
  var limit = 5;
  var zoom = 14;
  var json;
  var ctrlLimit;
  var ctrlDistance;

  /* Alaptérkép */
  function init() {

    ctrlLimit = document.getElementById("limit");
    ctrlDistance = document.getElementById("radius");

    ctrlDistance.onchange = ajax;
    ctrlLimit.onchange = ajax;

    var mapProp = {
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: new google.maps.LatLng(lat, lon)
    }
    map = new google.maps.Map(document.getElementById('googleMap'), mapProp);

    /* Marker */
    var marker = new google.maps.Marker({
      title: 'itt vagyok',
      position: new google.maps.LatLng(lat, lon)
    });
    marker.setMap(map);

    ajax();
  }

  /* Koordináták beszerzése */
  function ajax() {

    var url = "api/index.php?";
		url+= "lat=" + lat + "&";
		url+= "lon=" + lon + "&";
		url+= "radius=" + ctrlDistance.value + "&";
		url+= "limit=" + ctrlLimit.value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        json = JSON.parse(xhr.responseText);
        
        deleteMarkers();
        
        for (var i = 0; i < json.length; i++) {
          addMarker(json[i]);
          console.log(json[i]);
        }

        showMarkers();
      }
    }
    
    xhr.open("GET", url, true);
    xhr.send();
  }

  function addMarker(poi) {
    var marker = new google.maps.Marker({
      icon: "ikonok/spar.png",
      animation: google.maps.Animation.DROP,
      title: poi.irszam + " " + poi.varos + ", " + poi.cim,
      position: new google.maps.LatLng(poi.lat, poi.lng)
    });
    markers.push(marker);
    console.log(markers);
  }

  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function clearMarkers() {
    setAllMap(null);
  }

  function showMarkers() {
    setAllMap(map);
  }

  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }

  google.maps.event.addDomListener(window, 'load', init);