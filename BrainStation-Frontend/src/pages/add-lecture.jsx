import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import { generateLecture } from "@/service/lecture";

function AddLecture() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { moduleId } = useParams();
  const navigate = useNavigate();

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    validateFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    validateFile(file);
  };

  const validateFile = (file) => {
    if (file && file.name.endsWith(".pptx")) {
      setSelectedFile(file);
      setErrorMessage("");
    } else {
      setSelectedFile(null);
      setErrorMessage("Please upload a valid .pptx file.");
    }
  };

  const handleGenerateLecture = async () => {
    if (!lectureTitle) {
      setErrorMessage("Please enter a lecture title.");
      return;
    }

    if (!selectedFile) {
      setErrorMessage("Please select a .pptx file.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    const formData = new FormData();
    formData.append("title", lectureTitle);
    formData.append("organization", "SLIIT");
    formData.append("moduleId", moduleId);
    formData.append("file", selectedFile);

    try {
      const response = await generateLecture(formData);
      if (response.data) {
        toast.done("Lecture generated successfully!");
        navigate(`/admin-portal/edit-lecture/${response.data._id}`);
      } else {
        toast.error("Lecture generation failed! Please try again later.");
      }
    } catch (error) {
      toast.error("Lecture generation failed! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 px-6">
      {loading && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <div className="flex justify-center">
        <div className="border rounded-lg w-7/12 py-4 px-6" style={{ boxShadow: "0px 0px 4.4px rgba(0, 0, 0, 0.3)" }}>
          <div>
            <h2 className="text-2xl font-bold text-center">Upload Your Lecture Slides</h2>
          </div>

          {/* Lecture Title Input */}
          <div className="mt-6">
            <label htmlFor="lecture-title" className="block text-lg font-semibold">
              Lecture Title
            </label>
            <input
              type="text"
              id="lecture-title"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Enter lecture title"
              className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>

          {/* File Drop Zone */}
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col justify-center bg-stone-300 mt-5 mx-24 min-h-80 rounded-lg border py-10 px-6 divide-y divide-black"
            style={{ boxShadow: "0px 0px 4.4px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="drop-zone">
              {selectedFile ? (
                <p>Selected file: {selectedFile.name}</p>
              ) : (
                <p className="text-center">Drag and drop your .pptx file</p>
              )}
            </div>

            <div className="flex justify-center mt-20 pt-4">
              {/* Hidden default input field */}
              <input type="file" accept=".pptx" id="file-input" onChange={handleFileChange} className="hidden" />

              {/* Custom button as label for the file input */}
              <label
                htmlFor="file-input"
                className="cursor-pointer bg-blue-900 hover:bg-blue-700 text-white text-xs font-medium py-2 px-4 rounded-lg"
              >
                Browse from device
              </label>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && <div className="text-green-600 text-center h-5 text-xs mt-4">{successMessage}</div>}

          {/* Error Message */}
          {errorMessage && <div className="text-red-600 text-center h-5 text-xs mt-4">{errorMessage}</div>}

          {/* Generate Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleGenerateLecture}
              disabled={loading}
              className="text-white text-lg bg-blue-900 hover:bg-blue-700 cursor-pointer rounded-lg py-2 px-6"
            >
              Generate Lecture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLecture;
