import { useState } from "react";
import ScrollView from "../common/scrollable-view";

const EditGeneratedPopup = ({ onClose, onSave, question, answer, distractors, alternativeQuestions }) => {
  const [editedQuestion, setEditedQuestion] = useState(question || "");
  const [editedAnswer, setEditedAnswer] = useState(answer || "");
  const [editedDistractors, setEditedDistractors] = useState(distractors || ["", "", ""]);
  const [editedAlternativeQuestions, setEditedAlternativeQuestions] = useState(alternativeQuestions || [""]);

  const handleSave = () => {
    console.log("Saving edited question:", editedQuestion);

    onSave({
      question: editedQuestion,
      answer: editedAnswer,
      distractors: editedDistractors,
      alternative_questions: editedAlternativeQuestions
    });
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
                onChange={(e) => setEditedQuestion(e.target.value)}
                placeholder="Enter Question"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
              />
            </div>

            {/* Answer Input */}
            <div className="mb-4">
              <input
                type="text"
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
                placeholder="Enter Answer"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
              />
            </div>

            {/* Distractors */}
            <div className="mb-4">
              <p className="font-semibold">Distractors (must have exactly 3)</p>
              {editedDistractors.map((distractor, index) => (
                <input
                  key={index}
                  type="text"
                  value={distractor}
                  onChange={(e) => {
                    const updated = [...editedDistractors];
                    updated[index] = e.target.value;
                    setEditedDistractors(updated);
                  }}
                  placeholder={`Enter Distractor ${index + 1}`}
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
                />
              ))}
            </div>

            {/* Alternative Questions */}
            <div className="mb-4">
              <p className="font-semibold">Alternative Questions</p>
              {editedAlternativeQuestions.map((altQuestion, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={altQuestion}
                    onChange={(e) => {
                      const updated = [...editedAlternativeQuestions];
                      updated[index] = e.target.value;
                      setEditedAlternativeQuestions(updated);
                    }}
                    placeholder={`Enter Alternative Question ${index + 1}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3"
                  />
                  <button
                    type="button"
                    onClick={() => setEditedAlternativeQuestions((prev) => prev.filter((_, i) => i !== index))}
                    className="ml-2 px-2 py-2 text-red-600"
                    disabled={editedAlternativeQuestions.length <= 1} // Disable if only one question left
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setEditedAlternativeQuestions((prev) => [...prev, ""])}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Alternative Question
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button type="button" className="bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </ScrollView>
      </div>
    </div>
  );
};

export default EditGeneratedPopup;
