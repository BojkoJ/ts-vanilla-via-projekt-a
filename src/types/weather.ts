export interface WeatherData {
	location: {
		name: string; // Název města
		region: string; // Region
		country: string; // Země
		lat: number; // Zeměpisná šířka
		lon: number; // Zeměpisná délka
		tz_id: string; // Časová zóna
		localtime_epoch: number; // Lokální čas v UNIX timestampu
		localtime: string; // Lokální čas
	};
	current: {
		last_updated_epoch: number; // Čas poslední aktualizace v UNIX timestampu
		last_updated: string; // Čas poslední aktualizace
		temp_c: number; // Aktuální teplota (°C)
		temp_f: number; // Aktuální teplota (°F)
		is_day: number; // Indikace dne (1) nebo noci (0)
		condition: {
			text: string; // Popis počasí
			icon: string; // URL ikony počasí
			code: number; // Kód počasí
		};
		wind_mph: number; // Rychlost větru v mph
		wind_kph: number; // Rychlost větru v km/h
		wind_degree: number; // Směr větru ve stupních
		wind_dir: string; // Směr větru (např. "SSW")
		pressure_mb: number; // Tlak v hPa
		pressure_in: number; // Tlak v palcích
		precip_mm: number; // Srážky v mm
		precip_in: number; // Srážky v palcích
		humidity: number; // Vlhkost v %
		cloud: number; // Pokrytí oblačností v %
		feelslike_c: number; // Pocitová teplota (°C)
		feelslike_f: number; // Pocitová teplota (°F)
		windchill_c: number; // Chill faktor (°C)
		windchill_f: number; // Chill faktor (°F)
		heatindex_c: number; // Index horka (°C)
		heatindex_f: number; // Index horka (°F)
		dewpoint_c: number; // Rosný bod (°C)
		dewpoint_f: number; // Rosný bod (°F)
		vis_km: number; // Viditelnost v km
		vis_miles: number; // Viditelnost v mílích
		uv: number; // UV index
		gust_mph: number; // Poryv větru v mph
		gust_kph: number; // Poryv větru v km/h
	};
}
