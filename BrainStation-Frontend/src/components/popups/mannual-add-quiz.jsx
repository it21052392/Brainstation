import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addQuestion as addQuestionService } from "@/service/question";
import { addQuestion } from "@/store/questionSlice";
import ScrollView from "../common/scrollable-view";

const ManualAddQuizPopup = ({ onClose }) => {
  const { lectureId } = useParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    context: "context not available",
    question: "",
    answer: "",
    distractors: ["", "", ""],
    alternativeQuestions: [""]
  });

  const [isSubmitting, setIsSubmitting] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors((prev) => ({ ...prev, [name]: !value }));
  };

  const handleDistractorChange = (index, value) => {
    setFormData((prev) => {
      const updatedDistractors = [...prev.distractors];
      updatedDistractors[index] = value;
      return { ...prev, distractors: updatedDistractors };
    });
    setErrors((prev) => ({ ...prev, [`distractor${index}`]: !value }));
  };

  const handleAlternativeChange = (index, value) => {
    setFormData((prev) => {
      const updatedAlternatives = [...prev.alternativeQuestions];
      updatedAlternatives[index] = value;
      return { ...prev, alternativeQuestions: updatedAlternatives };
    });
    setErrors((prev) => ({ ...prev, [`alternative${index}`]: !value }));
  };

  const addAlternative = () => {
    setFormData((prev) => ({
      ...prev,
      alternativeQuestions: [...prev.alternativeQuestions, ""]
    }));
  };

  const removeAlternative = (index) => {
    setFormData((prev) => ({
      ...prev,
      alternativeQuestions: prev.alternativeQuestions.filter((_, i) => i !== index)
    }));
  };

  const validateFields = () => {
    const fieldErrors = {};
    if (!formData.question) fieldErrors.question = true;
    if (!formData.answer) fieldErrors.answer = true;
    formData.distractors.forEach((distractor, index) => {
      if (!distractor) fieldErrors[`distractor${index}`] = true;
    });
    formData.alternativeQuestions.forEach((altQuestion, index) => {
      if (!altQuestion) fieldErrors[`alternative${index}`] = true;
    });
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async (type) => {
    if (!validateFields()) return;

    setIsSubmitting(type);

    const questionData = {
      context: formData.context,
      lectureId,
      question: formData.question,
      answer: formData.answer,
      distractors: formData.distractors,
      alternative_questions: formData.alternativeQuestions
    };

    try {
      const response = await addQuestionService(questionData);
      if (response.success) {
        dispatch(addQuestion(response.data));
        if (type === "submit") onClose();
        else {
          setFormData({
            context: "context not available",
            question: "",
            answer: "",
            distractors: ["", "", ""],
            alternativeQuestions: [""]
          });
        }
      }
    } catch (error) {
      console.error("Error adding question:", error);
    } finally {
      setIsSubmitting(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div className="relative min-w-80 w-1/3 bg-white p-8 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute font-josfin-sans text-red-600 top-2 right-2  hover:text-gray-800 text-lg"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Quiz</h2>

        <ScrollView>
          <div className="mb-4">
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.question ? "border-red-500" : ""}`}
              placeholder="Enter question"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.answer ? "border-red-500" : ""}`}
              placeholder="Enter answer"
            />
          </div>

          <div className="mb-4">
            <p className="font-semibold">Distractors</p>
            {formData.distractors.map((distractor, index) => (
              <input
                key={`distractor${index}`}
                type="text"
                value={distractor}
                onChange={(e) => handleDistractorChange(index, e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg mb-2 ${errors[`distractor${index}`] ? "border-red-500" : ""}`}
                placeholder={`Enter distractor ${index + 1}`}
              />
            ))}
          </div>

          <div className="mb-4">
            <p className="font-semibold">Alternative Questions</p>
            {formData.alternativeQuestions.map((altQuestion, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={altQuestion}
                  onChange={(e) => handleAlternativeChange(index, e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${errors[`alternative${index}`] ? "border-red-500" : ""}`}
                  placeholder={`Enter alternative question ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeAlternative(index)}
                  className="ml-2 px-2 py-2 text-red-600"
                  disabled={formData.alternativeQuestions.length <= 1}
                >
                  X
                </button>
              </div>
            ))}
            <button type="button" onClick={addAlternative} className="text-blue-600 hover:text-blue-800 text-sm">
              + Add Alternative Question
            </button>
          </div>
        </ScrollView>

        <div className="flex mt-2 justify-end space-x-4">
          <button
            onClick={() => handleSubmit("submit")}
            disabled={isSubmitting === "addAnother"}
            className={`bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              isSubmitting === "submit" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting === "submit" ? "Saving..." : "Update and Close"}
          </button>
          <button
            onClick={() => handleSubmit("addAnother")}
            disabled={isSubmitting === "submit"}
            className={`bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              isSubmitting === "addAnother" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting === "addAnother" ? "Saving..." : "Add Another"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualAddQuizPopup;
