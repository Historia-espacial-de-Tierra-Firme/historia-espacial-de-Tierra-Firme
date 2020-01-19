window.onload = function () {
	var data = sitios_18;

	var map = L.map('map').setView([4.598225, -74.075767], 5);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamFpcm9tZWxvIiwiYSI6ImNqd3RoOTl5OTAzNWI0OGw1NzcyOTN4ZWsifQ.AlgasFogpd6rTJnVjFI52g', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);

// Condicional para evitar mostrar campos vacíos en otras denominaciones y en denominación actual

	function onEachFeature(feature, layer) {
    // ¿Hay datos en denominación actual y en otros nombres?
    if (feature.properties.Otros_nombres != "" && feature.properties.Denominación_actual != "") {
     	layer.bindPopup("<b>Topónimo: </b>" + feature.properties.Topónimo + " <br /> <b>Tipo: </b>" + feature.properties.Tipo + " <br /> <b>Jurisdicción: </b>" + feature.properties.Jurisdicción + " <br /> <b>También conocido como: </b> " + feature.properties.Otros_nombres + " <br /> <b>Denominación actual: </b> " + feature.properties.Denominación_actual + " <br /> <b>Coordenadas [lat-long]:</b> <br />" + feature.geometry.coordinates);
     }
    // ¿Hay datos en Otros nombres pero no en denominación_actual?
    else if (feature.properties.Otros_nombres != "") {
        layer.bindPopup("<b>Topónimo: </b>" + feature.properties.Topónimo + " <br /> <b>Tipo: </b>" + feature.properties.Tipo + " <br /> <b>Jurisdicción: </b>" + feature.properties.Jurisdicción + " <br /> <b>También conocido como: </b> " + feature.properties.Otros_nombres + " <br /> <b>Coordenadas [lat-long]:</b> <br />" + feature.geometry.coordinates);
    }
    // ¿Hay datos en denominación actual pero no en otros nombres?
    else if (feature.properties.Denominación_actual != "") {
         layer.bindPopup("<b>Topónimo: </b>" + feature.properties.Topónimo + " <br /> <b>Tipo: </b>" + feature.properties.Tipo + " <br /> <b>Jurisdicción: </b>" + feature.properties.Jurisdicción + " <br /> <b>Denominación actual: </b> " + feature.properties.Denominación_actual + " <br /> <b>Coordenadas [lat-long]:</b> <br />" + feature.geometry.coordinates);
     }
    else {
    	layer.bindPopup("<b>Topónimo: </b>" + feature.properties.Topónimo + " <br /> <b>Tipo: </b>" + feature.properties.Tipo + " <br /> <b>Jurisdicción: </b>" + feature.properties.Jurisdicción + " <br /> <b>Coordenadas [lat-long]:</b> <br />" + feature.geometry.coordinates);
    }
}

	var puntos = new L.geoJSON(data, {
    onEachFeature: onEachFeature
	}).addTo(map);

// Búsqueda

	var searchControl = new L.Control.Search({
	layer: puntos,  // Determines the name of variable, which includes our GeoJSON layer!
	propertyName: 'Topónimo',
	marker: false,
	initial: false,
	zoom: 12
});

map.addControl( searchControl );  //inizialize search control

};