import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
// Import DialogBox component
import { deleteQuestion as deleteQuestionService } from "@/service/question";
import { removeQuestion } from "@/store/questionSlice";
import DialogBox from "../common/dialogBox";
import DeleteIcon from "../icons/delete-icon";
import EditIcon from "../icons/edit-icon";
import EditPopup from "../popups/edit-quizzes";

// Assumes a removeQuestion action exists in the slice

const AllQuizCard = ({
  questionId,
  questionNumber,
  question,
  answer,
  distractors,
  disableBtns = false,
  alternativeQuestions,
  context,
  lectureId
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // State for dialog visibility
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [showDistractors, setShowDistractors] = useState(false);

  const isSpecialPage = location.pathname === "/admin-portal/flagged-quiz";

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  const toggleAlternatives = () => setShowAlternatives(!showAlternatives);
  const toggleDistractors = () => setShowDistractors(!showDistractors);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true); // Show confirmation dialog
  };

  const confirmDelete = async () => {
    console.log("questionId", questionId);

    try {
      const response = await deleteQuestionService(questionId);
      if (response.success) {
        dispatch(removeQuestion({ _id: questionId }));
      }
      setShowDeleteDialog(false); // Close dialog after deletion
    } catch (error) {
      console.error("Error deleting question:", error);
      setShowDeleteDialog(false); // Ensure dialog closes even if there's an error
    }
  };

  return (
    <div
      className={`relative rounded-xl p-8 mx-1.5 my-4 ${isSpecialPage ? "bg-red-100" : "bg-white"}`}
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

      <div>
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
        <>
          <div className="absolute top-2 right-2">
            <div className="flex ">
              <EditIcon onClick={handleEditClick} />
              <DeleteIcon onClick={handleDeleteClick} />
            </div>
          </div>
          {showEditPopup && (
            <EditPopup
              onClose={handleCloseEditPopup}
              questionId={questionId}
              question={question}
              answer={answer}
              alternativeQuestions={alternativeQuestions}
              distractors={distractors}
              context={context}
              lectureId={lectureId}
            />
          )}
        </>
      )}

      {/* DialogBox for delete confirmation */}
      <DialogBox
        isVisible={showDeleteDialog}
        title="Confirm Deletion"
        message="Are you sure you want to delete this quiz question?"
        onOkay={confirmDelete}
        onCancel={() => setShowDeleteDialog(false)}
        okayLabel="Delete"
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default AllQuizCard;
