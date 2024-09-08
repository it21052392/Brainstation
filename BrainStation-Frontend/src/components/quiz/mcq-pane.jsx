import { useEffect } from "react";

const MCQPane = ({ isVisible = true, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-[90%] h-[90%] p-6 transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-75"
        }`}
      >
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
          &times;
        </button>
        <div className="flex justify-center items-center h-full">
          <p className="text-center text-lg">This is your practice session</p>
        </div>
      </div>
    </div>
  );
};

export default MCQPane;
