import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetchData from "@/hooks/fetch-data";
import { getLectureById } from "@/service/lecture";
import { addQuestionBulk, generateQuestion } from "@/service/question";
import { clearGeneratedQuestions, setGeneratedQuestions } from "@/store/generateQuestionSlice";
import { setLectureQuestions } from "@/store/questionSlice";
import { Loader } from "..";
import QuizGenerationCard from "../cards/quiz-generation-card";
import ScrollView from "../common/scrollable-view";

const QuizeGenerationPopup = ({ onClose }) => {
  const { lectureId } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [localQuestions, setLocalQuestions] = useState([]);

  const generatedQuestions = useSelector((state) => state.generateQuestion.generatedQuestions[lectureId]);
  const existingQuestions = useSelector((state) =>
    state.questions.lectureId === lectureId ? state.questions.questions : []
  );

  const lecture = useFetchData(getLectureById, lectureId);

  useEffect(() => {
    if (lecture?.data && !generatedQuestions && loading) {
      handleGenerateQuestions();
    } else if (generatedQuestions) {
      setLocalQuestions(generatedQuestions);
      setLoading(false);
    }
  }, [lecture, generatedQuestions, loading]);

  const handleGenerateQuestions = async () => {
    try {
      setLoading(true);
      const response = await generateQuestion(lecture.data);
      const questions = response.data || [];
      dispatch(setGeneratedQuestions({ lectureId, questions }));
      setLocalQuestions(questions);
      setLoading(false);
    } catch (error) {
      console.error("Error generating questions:", error);
      setLoading(false);
    }
  };

  const handleGenerateAgain = () => {
    setLoading(true);
    dispatch(clearGeneratedQuestions({ lectureId }));
    handleGenerateQuestions();
  };

  const handleSaveAndClose = async () => {
    setSaving(true);

    // eslint-disable-next-line no-unused-vars
    const questionsWithLectureId = localQuestions.map(({ index, ...question }) => ({
      ...question,
      lectureId
    }));

    try {
      await addQuestionBulk(questionsWithLectureId);

      const updatedQuestions = [
        ...existingQuestions,
        ...questionsWithLectureId.filter(
          (newQuestion) => !existingQuestions.some((oldQuestion) => oldQuestion._id === newQuestion._id)
        )
      ];

      dispatch(
        setLectureQuestions({
          lectureId,
          lectureName: lecture?.data?.name || "",
          questions: updatedQuestions
        })
      );

      dispatch(setGeneratedQuestions({ lectureId, questions: localQuestions }));
      dispatch(clearGeneratedQuestions({ lectureId }));
      onClose();
    } catch (error) {
      console.error("Error saving questions:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateQuestion = (index, updatedQuestion) => {
    setLocalQuestions((prevQuestions) =>
      prevQuestions.map((question, i) => (i === index ? { ...question, ...updatedQuestion } : question))
    );
  };

  const handleDeleteQuestion = (index) => {
    setLocalQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div className="relative overflow-y-hidden w-[85rem] h-[42rem] bg-white p-8 pt-10 rounded-lg shadow-lg z-[1000] ">
        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <Loader />
            <p className="text-center text-lg font-bold mt-4">
              Generating Questions<span className="dot-1">.</span>
              <span className="dot-2">.</span>
              <span className="dot-3">.</span>
            </p>
          </div>
        ) : (
          <>
            <button className="text-red-600 absolute top-2 right-3 hover:text-gray-700" onClick={onClose}>
              X
            </button>
            <p className="text-xl font-bold mb-4 absolute top-2 left-3">Generated Questions</p>
            <ScrollView initialMaxHeight="12rem">
              {localQuestions.length > 0 ? (
                localQuestions.map((quiz, index) => (
                  <QuizGenerationCard
                    key={index}
                    index={index}
                    questionNumber={index + 1}
                    question={quiz.question}
                    answer={quiz.answer}
                    alternativeQuestions={quiz.alternative_questions}
                    distractors={quiz.distractors}
                    onEdit={(updatedQuiz) => handleUpdateQuestion(index, updatedQuiz)}
                    onDelete={(index) => handleDeleteQuestion(index)}
                  />
                ))
              ) : (
                <p className="text-center text-lg font-bold">No quizzes generated.</p>
              )}
            </ScrollView>

            <div className="flex items-center justify-end border-t mt-4 pt-2 gap-3">
              <button
                className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleGenerateAgain}
              >
                Generate Again
              </button>
              <button
                className="bg-blue-800 w-[9rem] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSaveAndClose}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save & Close"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizeGenerationPopup;
