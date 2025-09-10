"use client"; // Required for Next.js App Router

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Chart options
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
    },
  },
};

// Example labels and data
const labels = ["Rent", "Food", "Transport", "Entertainment", "Other"];

export const data = {
  labels,
  datasets: [
    {
      label: "Expenses",
      data: [500, 200, 100, 80, 70],
      backgroundColor: [
        "rgba(59, 130, 246, 0.7)", // blue-500
        "rgba(16, 185, 129, 0.7)", // green-500
        "rgba(234, 179, 8, 0.7)", // yellow-500
        "rgba(239, 68, 68, 0.7)", // red-500
        "rgba(168, 85, 247, 0.7)", // purple-500
      ],
      borderColor: [
        "rgba(59, 130, 246, 1)",
        "rgba(16, 185, 129, 1)",
        "rgba(234, 179, 8, 1)",
        "rgba(239, 68, 68, 1)",
        "rgba(168, 85, 247, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChartComponent() {
  return (
    <>
      <Doughnut options={options} data={data} />
    </>
  );
}
