import {
	Chart,
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Legend,
	Title,
	Tooltip,
} from "chart.js";

// Registrace komponent Chart.js
Chart.register(
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Legend,
	Title,
	Tooltip
);

let chart: Chart | null = null; // Globální proměnná pro graf

export const renderChart = (temps: number[], times: string[]) => {
	const ctx = document.getElementById("chart") as HTMLCanvasElement | null;

	if (!ctx) {
		console.error("Element s ID 'chart' nebyl nalezen nebo není canvas.");
		return;
	}

	if (chart) {
		chart.destroy(); // Zničíme existující graf, pokud existuje
	}

	chart = new Chart(ctx, {
		type: "line", // Typ grafu
		data: {
			labels: times,
			datasets: [
				{
					label: "Teplota (°C)",
					data: temps,
					borderColor: "rgba(75, 192, 192, 1)",
					backgroundColor: "rgba(75, 192, 192, 0.2)",
					borderWidth: 2,
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				legend: { position: "top" },
			},
		},
	});
};
