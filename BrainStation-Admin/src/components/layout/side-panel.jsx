import AnalyticsIcon from "../icons/side-panel-icons/analytics";
import HomeIcon from "../icons/side-panel-icons/home";

const Sidebar = () => {
  return (
    <div className="w-[73px] z-[100] bg-white overflow-hidden h-full border-r pt-20 p-2 flex-col gap-4 select-none rounded-l-xl">
      <HomeIcon />
      <div className="border-b my-2" />
      <AnalyticsIcon />
    </div>
  );
};

export default Sidebar;
