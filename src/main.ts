import { z } from "zod";
import { getWeatherData } from "./api/weatherApi";
import { initMap } from "./components/map";
import { renderChart } from "./components/chart";
import { WeatherData } from "./types/weather";
import "./styles/tailwind.css";

const citySchema = z.string().min(2, "Název města musí mít alespoň 2 znaky.");

const handleFormSubmit = async (event: Event) => {
	event.preventDefault();
	const input = document.getElementById("city-input") as HTMLInputElement;
	const resultDiv = document.getElementById("weather-result");

	if (resultDiv) resultDiv.textContent = "";

	try {
		const city = citySchema.parse(input.value);

		// Načtení dat z API
		const data: WeatherData = await getWeatherData(city);

		// Inicializace mapy
		initMap(data.location.lat, data.location.lon);

		// Simulace dat pro graf
		const currentTemp = data.current.temp_c;
		const temps = Array.from({ length: 8 }, () =>
			(currentTemp + Math.random() * 2 - 1).toFixed(1)
		).map(Number);

		const times = Array.from({ length: 8 }, (_, i) => {
			const now = new Date();
			now.setHours(now.getHours() - (7 - i));
			return now.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			});
		});

		renderChart(temps, times);

		if (resultDiv) {
			const { name } = data.location;
			const { temp_c, humidity, wind_kph, condition } = data.current;
			const { text, icon } = condition;

			resultDiv.innerHTML = `
				<h2 class="text-xl font-bold">Počasí v ${name}</h2>
				<p class="text-gray-700">Teplota: ${temp_c}°C</p>
				<p class="text-gray-700">Popis: ${text}</p>
				<img src="${icon}" alt="${text}" class="inline-block">
				<p class="text-gray-700">Vlhkost: ${humidity}%</p>
				<p class="text-gray-700">Rychlost větru: ${wind_kph} km/h</p>
			`;
		}
	} catch (error) {
		console.error(error);
		if (resultDiv)
			resultDiv.textContent =
				error instanceof Error ? error.message : "Chyba!";
	}
};

document
	.getElementById("weather-form")
	?.addEventListener("submit", handleFormSubmit);
