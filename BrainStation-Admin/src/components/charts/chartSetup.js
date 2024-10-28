import {
  // Required for bar charts
  ArcElement, // Required for y-axis (numeric values)
  BarElement,
  CategoryScale,
  Chart as ChartJS, // For tooltips
  Legend, // For legends
  // Required for category scales (x-axis in bar charts)
  LinearScale, // Required for pie charts
  Title, // For chart titles
  Tooltip
} from "chart.js";

// Register the components globally
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);
