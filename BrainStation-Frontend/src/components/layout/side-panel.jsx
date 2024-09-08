import BookIcon from "../icons/side-panel-icons/book";
import HomeIcon from "../icons/side-panel-icons/home";
import QuizzIcon from "../icons/side-panel-icons/quize";

const Sidebar = () => {
  return (
    <div className="w-[73px] z-[100] bg-white overflow-hidden h-full border-r pt-20 p-2 flex-col gap-4 select-none rounded-l-xl">
      <HomeIcon />
      <div className="border-b my-2" />
      <BookIcon />
      <div className="border-b my-2" />
      <QuizzIcon />
    </div>
  );
};

export default Sidebar;
