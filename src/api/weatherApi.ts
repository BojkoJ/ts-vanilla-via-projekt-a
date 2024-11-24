import axios from "axios";
import { WeatherData } from "../types/weather";
import { AstronomyData } from "../types/astronomy";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;
const ASTRONOMY_API_URL = import.meta.env.VITE_ASTRONOMY_API_URL as string;

export const getWeatherData = async (
	location: string
): Promise<WeatherData> => {
	try {
		const response = await axios.get(API_BASE_URL, {
			params: {
				key: API_KEY,
				q: location,
			},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.error(
				`Chyba ${error.response.status}: ${error.response.statusText}`
			);
		}
		throw new Error("Nepodařilo se načíst data o počasí.");
	}
};

export const getAstronomyData = async (
	location: string,
	date: string
): Promise<AstronomyData> => {
	try {
		const response = await axios.get(ASTRONOMY_API_URL, {
			params: {
				key: API_KEY,
				q: location,
				dt: date, // Datum, pro které získáváme data
			},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.error(
				`Chyba ${error.response.status}: ${error.response.statusText}`
			);
		}
		throw new Error("Nepodařilo se načíst astronomická data.");
	}
};
