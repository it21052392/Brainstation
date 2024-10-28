// ModuleCard.jsx
const ModuleCard = ({ title, onClick }) => {
  return (
    <div
      className="select-none w-[18rem] h-[18rem] p-4 flex flex-col items-center text-center rounded-xl hover:opacity-75 cursor-pointer"
      style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.24)" }}
      onClick={onClick}
    >
      <div className="flex-grow flex items-center">
        <p className="text-[1.15rem] font-bold ">{title}</p>
      </div>
    </div>
  );
};

export default ModuleCard;
