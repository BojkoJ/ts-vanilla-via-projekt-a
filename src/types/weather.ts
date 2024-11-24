export interface WeatherData {
	location: {
		name: string;
		lat: number;
		lon: number;
	};
	current: {
		temp_c: number;
		humidity: number;
		wind_kph: number;
		condition: {
			text: string;
			icon: string;
		};
	};
}
