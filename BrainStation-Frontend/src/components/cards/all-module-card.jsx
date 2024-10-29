const AllModulesCard = ({ module, description }) => {
  return (
    <div
      className={`flex justify-between items-center rounded-xl py-6 px-10 mx-1.5 my-4`}
      style={{ boxShadow: "0px 0px 4.4px rgba(0, 0, 0, 0.15)" }}
    >
      <div>
        <h2 className="text-xl font-bold">{module}</h2>
        <p className="text-sm">{description}</p>
      </div>
      <div>
        <button className="text-white bg-blue-900 hover:bg-blue-700 px-5 py-1 border rounded-lg mx-2">
          View Lectures
        </button>
        <button className="text-white bg-blue-900 hover:bg-blue-700 px-5 py-1 border rounded-lg mx-2">
          View Quizes
        </button>
        <button className="text-white bg-red-700 hover:bg-red-800 px-5 py-1 border rounded-lg mx-2">Delete</button>
      </div>
    </div>
  );
};

export default AllModulesCard;
