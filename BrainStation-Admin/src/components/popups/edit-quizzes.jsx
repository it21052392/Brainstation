// EditPopup.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuestion as updateQuestionService } from "@/service/question";
import { updateQuestion } from "@/store/questionSlice";
import ScrollView from "../common/scrollable-view";

const EditPopup = ({
  onClose,
  questionId,
  question,
  answer,
  distractors,
  alternativeQuestions,
  context,
  lectureId
}) => {
  const dispatch = useDispatch();

  const [editedQuestion, setEditedQuestion] = useState(question || "");
  const [editedAnswer, setEditedAnswer] = useState(answer || "");
  const [editedDistractors, setEditedDistractors] = useState(distractors || ["", "", ""]);
  const [editedAlternativeQuestions, setEditedAlternativeQuestions] = useState(alternativeQuestions || [""]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveChanges = async () => {
    const errors = {};

    // Validation check for empty fields
    if (!editedQuestion.trim()) errors.question = true;
    if (!editedAnswer.trim()) errors.answer = true;
    editedAlternativeQuestions.forEach((altQuestion, index) => {
      if (!altQuestion.trim()) errors[`alternativeQuestion${index}`] = true;
    });
    editedDistractors.forEach((distractor, index) => {
      if (!distractor.trim()) errors[`distractor${index}`] = true;
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const updatedQuiz = {
      question: editedQuestion,
      answer: editedAnswer,
      distractors: editedDistractors,
      alternative_questions: editedAlternativeQuestions,
      context,
      lectureId
    };

    setIsSaving(true);

    try {
      // Update question in the backend
      const response = await updateQuestionService(questionId, updatedQuiz);
      if (response.success) {
        dispatch(updateQuestion(response.data)); // Update question in Redux store
        onClose();
      }
    } catch (error) {
      console.error("Failed to update question:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAlternativeQuestionChange = (index, value) => {
    const updatedAlternativeQuestions = [...editedAlternativeQuestions];
    updatedAlternativeQuestions[index] = value;
    setEditedAlternativeQuestions(updatedAlternativeQuestions);
    setValidationErrors((prevErrors) => ({ ...prevErrors, [`alternativeQuestion${index}`]: false }));
  };

  const handleDistractorChange = (index, value) => {
    const updatedDistractors = [...editedDistractors];
    updatedDistractors[index] = value;
    setEditedDistractors(updatedDistractors);
  };

  const addAlternativeQuestion = () => {
    setEditedAlternativeQuestions([...editedAlternativeQuestions, ""]);
  };

  const removeAlternativeQuestion = (index) => {
    const updatedAlternativeQuestions = editedAlternativeQuestions.filter((_, i) => i !== index);
    setEditedAlternativeQuestions(updatedAlternativeQuestions);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div className="min-w-80 w-1/3 bg-white p-8 rounded-lg shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4 uppercase">Edit Quiz</h2>

        <ScrollView>
          <form className="p-1">
            {/* Question Input */}
            <div className="mb-4">
              <input
                type="text"
                value={editedQuestion}
                onChange={(e) => {
                  setEditedQuestion(e.target.value);
                  setValidationErrors((prevErrors) => ({ ...prevErrors, question: false }));
                }}
                placeholder="Enter Question"
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                  validationErrors.question ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            {/* Answer Input */}
            <div className="mb-4">
              <input
                type="text"
                value={editedAnswer}
                onChange={(e) => {
                  setEditedAnswer(e.target.value);
                  setValidationErrors((prevErrors) => ({ ...prevErrors, answer: false }));
                }}
                placeholder="Enter Answer"
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                  validationErrors.answer ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            {/* Distractors (Fixed Count of 3) */}
            <div className="mb-4">
              <p className="font-semibold">Distractors (must have exactly 3)</p>
              {editedDistractors.map((distractor, index) => (
                <input
                  key={index}
                  type="text"
                  value={distractor}
                  onChange={(e) => handleDistractorChange(index, e.target.value)}
                  placeholder={`Enter Distractor ${index + 1}`}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 ${
                    validationErrors[`distractor${index}`] ? "border-red-500" : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Alternative Questions (Dynamic Count) */}
            <div className="mb-4">
              <p className="font-semibold">Alternative Questions</p>
              {editedAlternativeQuestions.map((altQuestion, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={altQuestion}
                    onChange={(e) => handleAlternativeQuestionChange(index, e.target.value)}
                    placeholder={`Enter Alternative Question ${index + 1}`}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ${
                      validationErrors[`alternativeQuestion${index}`] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {editedAlternativeQuestions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAlternativeQuestion(index)}
                      className="ml-2 px-2 py-2 text-red-600"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addAlternativeQuestion}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Alternative Question
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${
                  isSaving ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </ScrollView>

        {/* Close Button */}
        <button className="text-red-600 absolute top-2 right-2" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default EditPopup;
