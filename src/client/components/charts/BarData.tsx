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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

interface BarDataProps {
  dataset: number[];
  title?: string;
}

export function BarData({ dataset, title }: BarDataProps) {
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataset,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: dataset,
        backgroundColor: "rgba(210, 100, 24, 0.5",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}
