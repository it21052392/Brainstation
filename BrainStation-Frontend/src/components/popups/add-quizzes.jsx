const AddQuizPopup = ({ onClose, onManualAddQuiz, onGenerateQuiz }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div className="min-w-80 w-1/4 bg-white p-8 rounded-lg shadow-lg relative">
        <div className="flex flex-col">
          <button
            className="min-w-60 my-2 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onGenerateQuiz} // Trigger the function passed from the parent to show the Generate Quiz popup
          >
            Generate Quizzes
          </button>
          <button
            className="min-w-60 my-2 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onManualAddQuiz} // Trigger the function passed from the parent to show the Manual Add Quiz popup
          >
            Manually Add Quizzes
          </button>
        </div>
        <button className="text-red-600 absolute top-2 right-2 hover:text-gray-700" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default AddQuizPopup;
