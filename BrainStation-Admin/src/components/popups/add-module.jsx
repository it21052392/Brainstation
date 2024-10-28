import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addModule } from "@/service/module";

const AddModule = ({ onClose }) => {
  const [moduleName, setModuleName] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAddModule = async () => {
    if (!moduleName || !moduleCode || !description) {
      toast.error("Please fill out all fields to add the module.");
      return;
    }

    const moduleData = {
      name: moduleName,
      moduleCode: moduleCode,
      description: description
    };

    try {
      const response = await addModule(moduleData);
      if (response.success) {
        toast.success("Module added successfully!");
        onClose();
        navigate(0);
      } else {
        toast.error("Failed to add module. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to add module. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div className="min-w-80 w-1/3 bg-white p-8 rounded-lg shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4 uppercase">Add New Module</h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              id="module"
              placeholder="Enter Module Name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              className="border-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="code"
              placeholder="Enter Module Code"
              value={moduleCode}
              onChange={(e) => setModuleCode(e.target.value)}
              className="border-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <textarea
              id="description"
              rows="5"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mr-2"
              onClick={handleAddModule}
            >
              Add
            </button>
          </div>
        </form>
        <button className="text-red-600 absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default AddModule;
