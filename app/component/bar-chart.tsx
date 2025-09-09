"use client"; // if you’re using App Router in Next.js

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May"];

export const data = {
  labels,
  datasets: [
    {
      label: "Revenue",
      data: [12, 19, 3, 5, 2],
      backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind's blue-500
    },
  ],
};

export default function BarChartComponent() {
  return <Bar options={options} data={data} className="h-full" />;
}
