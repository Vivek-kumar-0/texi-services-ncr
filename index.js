

var markers = [];
var locations = [];
var map;
var distanceDirection;
var distanceDisplay;
function string2Location(input, index) {
	var searchBox = new google.maps.places.SearchBox(input);
	// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	map.addListener('bounds_changed', function () {
		searchBox.setBounds(map.getBounds());
	});
	distanceDirection = new google.maps.DirectionsService();
	distanceDisplay = new google.maps.DirectionsRenderer();
	searchBox.addListener('places_changed', function () {
		var places = searchBox.getPlaces();
		if (places.length == 0) {
			return;
		}
		markers[index].setMap(null);
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function (place) {
			if (!place.geometry) {
				console.log("Returned place contains no geometry");
				return;
			}
			var icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};
			markers[index] = new google.maps.Marker({
				map: map,
				icon: icon,
				title: place.name,
				position: place.geometry.location
			});
			if (index == 0) {
				locations[index] = place.geometry.location;
			}
			else {
				locations[index] = place.geometry.location;
			}
			// console.log(locations[index].lat() + ", " + locations[index].lng());
			if (place.geometry.viewport) {
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);
		distanceDisplay.setMap(map);
	});
}
function initAutocomplete() {
	locations[0] = new google.maps.LatLng();
	locations[1] = new google.maps.LatLng();
	markers[0] = new google.maps.Marker();
	markers[1] = new google.maps.Marker();
	map = new google.maps.Map(document.getElementById('map'), {
		// Default position...
		center: {
			lat: 28.4595,
			lng: 77.0266
		},
		zoom: 13,
		mapTypeId: 'roadmap',
	});
	var from = document.getElementById('from-input');
	var to = document.getElementById('to-input');
	string2Location(from, 0);
	string2Location(to, 1);
	google.maps.event.addDomListener(document.getElementById('calculate'), 'click', calcRoute);
}
function calcDistance(start, end) {
	return (google.maps.geometry.spherical.computeDistanceBetween(start, end) / 1000).toFixed(2); //KM
}
function carprice() {
	var parkm = document.getElementById("Step At").value;


}

function calcRoute() {
	var value_distance = document.querySelector("#value-distance");
	var value_price = document.querySelector("#value-price");
	var start = new google.maps.LatLng(locations[0].lat(), locations[0].lng());
	var end = new google.maps.LatLng(locations[1].lat(), locations[1].lng());
	var distance = calcDistance(start, end);
	value_distance.innerHTML = distance;
	value_price.innerHTML = (distance * 12) + " Rs par km"; // We can use .toFixed()...
	let price = value_price.toFixed(2);
	var bounds = new google.maps.LatLngBounds();
	bounds.extend(start);
	bounds.extend(end);
	map.fitBounds(bounds);
	var request = {
		travelMode: google.maps.TravelMode.DRIVING,
		origin: start,
		destination: end,
	};
	distanceDirection.route(request, function (response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			distanceDisplay.setDirections(response);
			distanceDisplay.setMap(map);
		}
		else {
			alert("Error: From " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed : " + status);
		}
	});
}
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
	var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
	s1.async = true;
	s1.src = 'https://embed.tawk.to/62d7a1d27b967b11799a6b8b/1g8d507vd';
	s1.charset = 'UTF-8';
	s1.setAttribute('crossorigin', '*');
	s0.parentNode.insertBefore(s1, s0);
})();

