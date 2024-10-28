import { Bar } from "react-chartjs-2";
import "./chartSetup";

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Value",
        data: data.map((item) => item.value),
        backgroundColor: ["#3498db", "#2ecc71"]
      }
    ]
  };

  return <Bar data={chartData} />;
};

export default BarChart;
