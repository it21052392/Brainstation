import { useLocation } from "react-router-dom";
import ToggleTabs from "@/components/toggle/toggle";

// Import this to get query params

const MetricsPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search); // Get query parameters
  const userId = params.get("userId"); // Extract userId from the query

  return (
    <div className="flex flex-col items-center p-4 px-6">
      <h1 className="text-center font-semibold text-2xl mb-6">Oshadha Thawalampola</h1>
      <div className="w-full max-w-screen-2xl">
        {/* Pass the userId to ToggleTabs */}
        <ToggleTabs userId={userId} />
      </div>
    </div>
  );
};

export default MetricsPage;
