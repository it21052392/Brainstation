import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components";
import ModuleCard from "@/components/cards/course-card";
import ScrollView from "@/components/common/scrollable-view";
import AddModule from "@/components/popups/add-module";
import useFetchData from "@/hooks/fetch-data";
import { getAllModules } from "@/service/module";
import { setModules } from "@/store/moduleSlice";

// Redux action

const Dashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch data with debounce (e.g., 500ms debounce)
  const modulesData = useFetchData(getAllModules);

  useEffect(() => {
    if (modulesData) {
      dispatch(setModules(modulesData.data.docs));
    }
  }, [modulesData, dispatch]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleModuleClick = (moduleId) => {
    navigate(`/admin-portal/module/${moduleId}`);
  };

  return (
    <>
      {!modulesData ? (
        <Loader />
      ) : (
        <div className="p-4 px-6">
          {/* header */}
          <div className="flex justify-between items-center">
            <h1 className="font-inter font-bold text-2xl">All Modules</h1>
          </div>
          {/* Module cards */}

          <ScrollView initialMaxHeight="10rem">
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 px-4 pb-4 cursor-pointer"
              onClick={togglePopup}
            >
              <div
                className="bg-blue-100 select-none w-[18rem] h-[18rem] flex flex-col items-center justify-center text-center rounded-xl"
                style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.24)" }}
              >
                <div className="text-blue-900 text-6xl font-bold">+</div>
                <p className="text-blue-900 font-bold">Add New Module</p>
              </div>
              {modulesData?.data.docs.map((module) => (
                <ModuleCard key={module._id} title={module.name} onClick={() => handleModuleClick(module._id)} />
              ))}
            </div>
          </ScrollView>

          {showPopup && <AddModule onClose={togglePopup} />}
        </div>
      )}
    </>
  );
};

export default Dashboard;
