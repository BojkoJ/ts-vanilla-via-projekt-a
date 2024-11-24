import L from "leaflet";

let map: L.Map | null = null; // Globální proměnná pro mapu

export const initMap = (lat: number, lon: number) => {
	const mapDiv = document.getElementById("map");
	if (!mapDiv) return;

	// Pokud mapa již existuje, znič ji
	if (map) {
		map.remove();
	}

	// Vytvoření nové mapy
	map = L.map(mapDiv).setView([lat, lon], 13);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: "© OpenStreetMap contributors",
	}).addTo(map);

	L.marker([lat, lon])
		.addTo(map)
		.bindPopup("Zde se nachází město.")
		.openPopup();
};
