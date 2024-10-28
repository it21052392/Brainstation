import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./side-panel";

const DefaultLayout = () => {
  return (
    <div className="bg-primary-blue h-screen p-3">
      <div className="bg-white h-full w-full rounded-xl flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
