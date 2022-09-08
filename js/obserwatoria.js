function showLocation(position) {
  var latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  var output = document.getElementById("geo");
  output.innerHTML =
    "<p>Szerokość geograficzna: " +
    latitude.toFixed(1) +
    "</p>" +
    "<p>Długość geograficzna: " +
    longitude.toFixed(1) +
    "</p>";
}

function errorHandler(error) {
  var output = document.getElementById("geo");
  switch (error.code) {
    case error.PERMISSION_DENIED:
      output.innerHTML = "Użytkownik nie udostępnił danych.";
      break;
    case error.POSITION_UNAVAILABLE:
      output.innerHTML = "Dane lokalizacyjne niedostępne.";
      break;
    case error.TIMEOUT:
      output.innerHTML = "Przekroczono czas żądania.";
      break;
    case error.UNKNOWN_ERROR:
      output.innerHTML = "Wystąpił nieznany błąd.";
      break;
  }
}

function getLocation() {
  if (navigator.geolocation) {
    var options = { timeout: 60000 };
    navigator.geolocation.getCurrentPosition(
      showLocation,
      errorHandler,
      options
    );
  } else {
    alert("Twoja przeglądarka nie wspiera geolokalizacji!");
  }
}

var coordinates = new google.maps.LatLng(51.412498, 21.974506);
var mapOptions = {
  zoom: 16,
  center: coordinates,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

function generateMap(coords, mapOpt, nazwa) {
  var map = new google.maps.Map(document.getElementById("mapPlace"), mapOpt);
  new google.maps.Marker({
    position: coords,
    map,
    tittle: nazwa,
  });
}

function showCoords(city, adress) {
  var dest = document.querySelector("#placeCoords");
  var ct = document.createElement("span");
  ct.classList.add("d-block", "placeInfo");
  var adr = document.createElement("span");
  adr.classList.add("d-block", "placeInfo");
  ct.appendChild(document.createTextNode("Miasto: " + city));
  adr.appendChild(document.createTextNode("Ulica: " + adress));
  dest.innerHTML = "";
  dest.appendChild(ct);
  dest.appendChild(adr);
}

generateMap(coordinates, mapOptions, "Puławy");
showCoords("Puławy", "Filtrowa 50");

place1_btn.addEventListener(
  "click",
  () => {
    var coordinates = new google.maps.LatLng(51.412498, 21.974506);
    var mapOptions = {
      zoom: 15,
      center: coordinates,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    generateMap(coordinates, mapOptions, "Puławy");
    showCoords("Puławy", "Filtrowa 50");
  },
  false
);

place2_btn.addEventListener(
  "click",
  () => {
    var coordinates = new google.maps.LatLng(52.216843, 21.025889);
    var mapOptions = {
      zoom: 15,
      center: coordinates,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    generateMap(coordinates, mapOptions, "Warszawa");
    showCoords("Warszawa", "Al. Ujazdowskie 4");
  },
  false
);

place3_btn.addEventListener(
  "click",
  () => {
    var coordinates = new google.maps.LatLng(51.777119, 19.458542);
    var mapOptions = {
      zoom: 15,
      center: coordinates,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    generateMap(coordinates, mapOptions, "Łódź");
    showCoords("Łódź", "Pomorska 16A");
  },
  false
);

place4_btn.addEventListener(
  "click",
  () => {
    var coordinates = new google.maps.LatLng(52.393949, 16.875371);
    var mapOptions = {
      zoom: 15,
      center: coordinates,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    generateMap(coordinates, mapOptions, "Poznań");
    showCoords("Poznań", "Słoneczna 36");
  },
  false
);

place5_btn.addEventListener(
  "click",
  () => {
    var coordinates = new google.maps.LatLng(50.053798, 19.827118);
    var mapOptions = {
      zoom: 15,
      center: coordinates,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    generateMap(coordinates, mapOptions, "Kraków");
    showCoords("Kraków", "Orla 171");
  },
  false
);

place6_btn.addEventListener(
  "click",
  () => {
    var coordinates = new google.maps.LatLng(53.772367, 20.488541);
    var mapOptions = {
      zoom: 15,
      center: coordinates,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    generateMap(coordinates, mapOptions, "Olsztyn");
    showCoords("Olsztyn", "Żołnierska 13B");
  },
  false
);
