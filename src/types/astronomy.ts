export interface AstronomyData {
	location: {
		name: string; // Název města
		region: string; // Region
		country: string; // Země
		lat: number; // Zeměpisná šířka
		lon: number; // Zeměpisná délka
		tz_id: string; // Časová zóna
		localtime: string; // Lokální čas
	};
	astronomy: {
		astro: {
			sunrise: string; // Východ slunce
			sunset: string; // Západ slunce
			moonrise: string; // Východ měsíce
			moonset: string; // Západ měsíce
			moon_phase: string; // Fáze měsíce
			moon_illumination: string; // Osvětlení měsíce (v %)
		};
	};
}
