import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#f1c40f", "#e74c3c", "#2ecc71", "#9b59b6", "#3498db"]
      }
    ]
  };

  return <Pie data={chartData} />;
};

export default PieChart;
