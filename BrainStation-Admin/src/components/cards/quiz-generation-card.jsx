import { useState } from "react";
import DeleteIcon from "../icons/delete-icon";
import EditIcon from "../icons/edit-icon";
import EditGeneratedPopup from "../popups/edit-generated-quizzes";

const QuizGenerationCard = ({
  questionNumber,
  question,
  answer,
  distractors,
  alternativeQuestions,
  index,
  onEdit,
  onDelete,
  disableBtns = false
}) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [showDistractors, setShowDistractors] = useState(false);

  const handleEditClick = () => setShowEditPopup(true);
  const handleCloseEditPopup = () => setShowEditPopup(false);
  const toggleAlternatives = () => setShowAlternatives(!showAlternatives);
  const toggleDistractors = () => setShowDistractors(!showDistractors);

  const handleSaveChanges = (updatedQuiz) => {
    onEdit({ ...updatedQuiz, index });
    setShowEditPopup(false);
  };

  return (
    <div
      className="relative rounded-xl p-8 mx-1.5 my-4 bg-white shadow-md"
      style={{ boxShadow: "0px 0px 4.4px rgba(0, 0, 0, 0.15)" }}
    >
      <p className="uppercase text-xs text-green-500 font-semibold absolute bottom-2 right-3">AI Generated</p>
      <p className="absolute top-2 left-3 text-xs font-semibold text-gray-400">{questionNumber}</p>

      <div className="mb-4">
        <p className="font-semibold text-lg text-gray-700">Question:</p>
        <p className="text-md font-normal text-gray-800 ml-4">{question}</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-lg text-gray-700">Answer:</p>
        <p className="text-md font-normal text-gray-800 ml-4">{answer}</p>
      </div>

      <div className="mb-4">
        <div
          onClick={toggleAlternatives}
          className="flex justify-between items-center cursor-pointer bg-gray-200 p-2 rounded-md"
        >
          <p className="font-semibold text-lg text-gray-700">Alternative Questions:</p>
          <span className="text-sm text-blue-600 font-semibold">{showAlternatives ? "-" : "+"}</span>
        </div>
        {showAlternatives && (
          <ul className="space-y-2 bg-gray-100 rounded-lg p-4 mt-2">
            {alternativeQuestions.map((altQuestion, index) => (
              <li key={index} className="bg-gray-50 text-gray-700 p-2 rounded-md border border-gray-300">
                {altQuestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <div
          onClick={toggleDistractors}
          className="flex justify-between items-center cursor-pointer bg-gray-200 p-2 rounded-md"
        >
          <p className="font-semibold text-lg text-gray-700">Distractors:</p>
          <span className="text-sm text-blue-600 font-semibold">{showDistractors ? "-" : "+"}</span>
        </div>
        {showDistractors && (
          <ul className="space-y-2 bg-gray-100 rounded-lg p-4 mt-2">
            {distractors.map((distractor, index) => (
              <li key={index} className="bg-gray-50 text-gray-700 p-2 rounded-md border border-gray-300">
                {distractor}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!disableBtns && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <EditIcon onClick={handleEditClick} className="cursor-pointer" />
          <DeleteIcon onClick={() => onDelete(index)} className="cursor-pointer" />
        </div>
      )}

      {showEditPopup && (
        <EditGeneratedPopup
          onClose={handleCloseEditPopup}
          onSave={handleSaveChanges}
          question={question}
          answer={answer}
          alternativeQuestions={alternativeQuestions}
          distractors={distractors}
        />
      )}
    </div>
  );
};

export default QuizGenerationCard;
