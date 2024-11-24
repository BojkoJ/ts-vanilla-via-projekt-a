import { z } from "zod";
import { getAstronomyData, getWeatherData } from "./api/weatherApi";
import { initMap } from "./components/map";
import { renderChart } from "./components/chart";
import { WeatherData } from "./types/weather";
import "./styles/tailwind.css";
import { AstronomyData } from "./types/astronomy";

const citySchema = z.string().min(2, "Název města musí mít alespoň 2 znaky.");

const handleFormSubmit = async (event: Event) => {
	event.preventDefault();

	const submitButton = document.querySelector<HTMLButtonElement>(
		"button[type='submit']"
	);
	const input = document.getElementById("city-input") as HTMLInputElement;
	const resultDiv = document.getElementById("weather-result");

	if (resultDiv) resultDiv.textContent = "";

	if (submitButton) {
		submitButton.disabled = true;
		submitButton.classList.remove("bg-blue-500");
		submitButton.classList.remove("cursor-pointer");
		submitButton.classList.add("cursor-not-allowed");
		submitButton.classList.add("bg-blue-300");
		submitButton.textContent = "Načítám...";
	}

	try {
		const city = citySchema.parse(input.value);

		// Načtení dat z WeatherAPI
		const weatherData: WeatherData = await getWeatherData(city);

		// Načtení astronomických dat
		const currentDate = new Date().toISOString().split("T")[0]; // Aktuální datum ve formátu YYYY-MM-DD
		const astronomyData: AstronomyData = await getAstronomyData(
			city,
			currentDate
		);

		// Inicializace mapy
		initMap(weatherData.location.lat, weatherData.location.lon);

		// Simulace dat pro graf
		const currentTemp = weatherData.current.temp_c;
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
			const { name, region, country } = weatherData.location;
			const {
				temp_c,
				feelslike_c,
				humidity,
				wind_kph,
				wind_dir,
				pressure_mb,
				uv,
				condition,
				precip_mm,
				vis_km,
				dewpoint_c,
				gust_kph,
			} = weatherData.current;
			const { text, icon } = condition;

			const {
				sunrise,
				sunset,
				moonrise,
				moonset,
				moon_phase,
				moon_illumination,
			} = astronomyData.astronomy.astro;

			// Zobrazení výsledků
			resultDiv.innerHTML = `
				<h2 class="text-xl font-bold mb-4">Počasí v ${name}, ${region}, ${country}</h2>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex items-center">
						<img src="${icon}" alt="${text}" class="mr-4">
						<p class="text-gray-700 font-bold">${text}</p>
					</div>
					<div>
						<p class="text-gray-700"><strong>Teplota:</strong> ${temp_c}°C</p>
						<p class="text-gray-700"><strong>Pocitová teplota:</strong> ${feelslike_c}°C</p>
					</div>
					<div>
						<p class="text-gray-700"><strong>Vlhkost:</strong> ${humidity}%</p>
						<p class="text-gray-700"><strong>Srážky:</strong> ${precip_mm} mm</p>
					</div>
					<div>
						<p class="text-gray-700"><strong>Rychlost větru:</strong> ${wind_kph} km/h</p>
						<p class="text-gray-700"><strong>Směr větru:</strong> ${wind_dir}</p>
					</div>
					<div>
						<p class="text-gray-700"><strong>Tlak:</strong> ${pressure_mb} hPa</p>
						<p class="text-gray-700"><strong>Viditelnost:</strong> ${vis_km} km</p>
					</div>
					<div>
						<p class="text-gray-700"><strong>Rosný bod:</strong> ${dewpoint_c}°C</p>
						<p class="text-gray-700"><strong>Poryvy větru:</strong> ${gust_kph} km/h</p>
					</div>
					<div>
						<p class="text-gray-700"><strong>UV index:</strong> ${uv}</p>
						<p class="text-gray-700"><strong>Východ slunce:</strong> ${sunrise}</p>
					</div>
					<div>
						<p class="text-gray-700"><strong>Západ slunce:</strong> ${sunset}</p>
					</div>
					<div>
						<p class="text-gray-700"><strong>Východ měsíce:</strong> ${moonrise}</p>
						<p class="text-gray-700"><strong>Západ měsíce:</strong> ${moonset}</p>
					</div>
					<div>
						<p class="text-gray-700"><strong>Fáze měsíce:</strong> ${moon_phase}</p>
						<p class="text-gray-700"><strong>Osvětlení měsíce:</strong> ${moon_illumination}%</p>
					</div>
				</div>
			`;
		}
	} catch (error) {
		if (resultDiv) {
			// Pro ZodError - validace vstupů
			if (error instanceof z.ZodError) {
				const errorMessage = error.errors
					.map((e) => `<p class="text-red-500">${e.message}</p>`)
					.join(""); // Sestavíme všechny chybové zprávy
				resultDiv.innerHTML = `
					<h2 class="text-xl font-bold text-red-500">Chyba validace</h2>
					${errorMessage}
				`;
				return;
			}

			// Pro jiné chyby
			resultDiv.innerHTML = `
				<h2 class="text-xl font-bold text-red-500">Neočekávaná chyba</h2>
				<p class="text-gray-700">${
					error instanceof Error ? error.message : "Něco se pokazilo!"
				}</p>
			`;
		}
	} finally {
		// Znovu povolíme tlačítko
		if (submitButton) {
			submitButton.disabled = false;
			submitButton.classList.remove("bg-blue-300");
			submitButton.classList.remove("cursor-not-allowed");
			submitButton.classList.add("bg-blue-500");
			submitButton.classList.add("cursor-pointer");
			submitButton.textContent = "Načíst počasí";
		}
	}
};

document
	.getElementById("weather-form")
	?.addEventListener("submit", handleFormSubmit);
