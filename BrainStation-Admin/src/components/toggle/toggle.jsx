import { useEffect, useState } from "react";
// Adjust this import path if needed
import { getSessionDataByUser, getSessionsByUser } from "@/service/SessionService";
// Ensure this path is correct
import image01 from "../badges/01.png";
import image02 from "../badges/02.png";
import image03 from "../badges/03.png";
import image04 from "../badges/04.png";
import image05 from "../badges/05.png";
import image06 from "../badges/06.png";
import image07 from "../badges/07.png";
import image08 from "../badges/08.png";
import BarChart from "../charts/bar-chart";
import PieChart from "../charts/pie-chart";
import ScrollView from "../common/scrollable-view";
import SessionLogs from "../popups/session-logs";
import Loader from "/src/components/common/loader";

const ToggleTabs = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("Session Overview");
  const [sessionLogs, setSessionLogs] = useState([]);
  const [sessionOverview, setSessionOverview] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const tabs = [
    { name: "Session Overview" },
    { name: "User Metrics" },
    { name: "Session Logs" },
    { name: "System Usage" }
  ];

  // Fetch session data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === "Session Logs" && userId) {
          const response = await getSessionsByUser(userId);
          setSessionLogs(response.data.docs || []);
        } else if (activeTab === "Session Overview" && userId) {
          const response = await getSessionDataByUser(userId);
          console.log("response", response);
          setSessionOverview(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, userId]);

  // Handle session ID click to open popup
  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setShowPopup(true);
  };

  // Determine image source
  const getImageSource = (classification) => {
    switch (classification) {
      case "ADHD symptoms with emotional and head movement alterations":
        return image01;
      case "ADHD symptoms with emotional alterations":
        return image02;
      case "ADHD symptoms with head movement alterations":
        return image03;
      case "ADHD symptoms detected, consider monitoring":
        return image04;
      case "No ADHD symptoms with emotional and head movement alterations":
        return image05;
      case "No ADHD symptoms with emotional alterations":
        return image06;
      case "No ADHD symptoms with head movement alterations":
        return image07;
      case "No ADHD symptoms":
        return image08;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* Tab Buttons */}
      <div className="flex items-center justify-center p-2 border rounded-full w-full max-w-2xl mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`py-2 px-4 rounded-full mx-1 ${activeTab === tab.name ? "bg-blue-900 text-white" : "bg-white text-black"}`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full max-w-fill">
        {/* Session Overview Tab */}
        {activeTab === "Session Overview" && (
          <>
            {loading ? (
              <div>
                <Loader />
              </div>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              sessionOverview && (
                <ScrollView initialMaxHeight="18rem">
                  {" "}
                  {/* Add ScrollView here */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bar chart for Study Time and Focus Time */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Study vs Focus Time</h3>
                      <BarChart
                        data={[
                          {
                            label: "Total Study Time (hrs)",
                            value: (sessionOverview.totalStudyTime / 3600).toFixed(2)
                          },
                          { label: "Total Focus Time (hrs)", value: (sessionOverview.totalFocusTime / 3600).toFixed(2) }
                        ]}
                      />
                    </div>

                    {/* Bar chart for Movements */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Movements Overview</h3>
                      <BarChart
                        data={[
                          { label: "Total Movements", value: sessionOverview.totalMovements },
                          { label: "Total Erratic Movements", value: sessionOverview.totalErraticMovements }
                        ]}
                      />
                    </div>

                    {/* ADHD Classification Image */}
                    <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
                      <h3 className="text-lg font-semibold mb-2">ADHD Classification:</h3>
                      <img
                        src={getImageSource(sessionOverview.adhdClassification)}
                        alt={sessionOverview.adhdClassification}
                        className="w-80"
                      />
                    </div>
                  </div>
                </ScrollView>
              )
            )}
          </>
        )}

        {/* Session Logs Tab */}
        {activeTab === "Session Logs" && (
          <ScrollView initialMaxHeight="18rem">
            {loading ? (
              <p>Loading session logs...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <ul>
                {sessionLogs.map((log) => (
                  <li
                    key={log._id}
                    className="p-4 my-4 shadow-md cursor-pointer"
                    onClick={() => handleSessionClick(log)}
                  >
                    <p>
                      <strong>Session ID:</strong> {log._id}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </ScrollView>
        )}

        {/* Popup for Session Logs Details */}
        {showPopup && selectedSession && (
          <SessionLogs onClose={() => setShowPopup(false)}>
            <ScrollView initialMaxHeight="12rem">
              <div className="p-4">
                <h3 className="text-2xl text-center font-bold mb-2">Session Details</h3>
                <div className="flex justify-center my-12">
                  <div className="w-1/2 mx-4 p-6 shadow flex flex-col justify-center items-center">
                    <p className="text-center font-bold mb-3 text-lg">Basic Details</p>
                    <p>
                      <strong>Date:</strong> {new Date(selectedSession.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Start Time:</strong> {new Date(selectedSession.startTime).toLocaleTimeString()}
                    </p>
                    <p>
                      <strong>Stop Time:</strong> {new Date(selectedSession.stopTime).toLocaleTimeString()}
                    </p>
                    <p>
                      <strong>Focus Time (hrs):</strong>{" "}
                      {selectedSession.focus_time ? selectedSession.focus_time.toFixed(2) : "N/A"}
                    </p>
                  </div>

                  {/* Bar chart for Movements */}
                  <div className="w-1/2 flex flex-col items-center p-6 shadow mx-4">
                    <p className="text-center font-bold mb-3 text-lg">Movements</p>
                    <BarChart
                      data={[
                        { label: "Total Movements", value: selectedSession.total_movements || 0 },
                        { label: "Erratic Movements", value: selectedSession.erratic_movements || 0 }
                      ]}
                    />
                    <p className="text-center mt-4 text-red-500">
                      Erratic Percentage:{" "}
                      {selectedSession.erratic_percentage ? selectedSession.erratic_percentage.toFixed(2) : "N/A"}%
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 shadow p-6 mx-4 flex flex-col justify-center items-center">
                    <p className="text-center font-bold mb-3 text-lg">Emotion Distribution:</p>
                    <div className="w-60">
                      <PieChart data={selectedSession.emotion_distribution || []} />
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col items-center shadow p-6 mx-4">
                    <p className="text-center font-bold mb-3 text-lg">Final Classification</p>
                    <img
                      src={getImageSource(selectedSession.final_classification)}
                      alt={selectedSession.final_classification}
                      className="w-80"
                    />
                  </div>
                </div>
              </div>
            </ScrollView>
          </SessionLogs>
        )}
      </div>
    </div>
  );
};

export default ToggleTabs;
