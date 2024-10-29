import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@/components";
import QuizCard from "@/components/cards/all-quiz-card";
import AddQuizPopup from "@/components/popups/add-quizzes";
import QuizeGenerationPopup from "@/components/popups/generate-quiz";
import ManualAddQuizPopup from "@/components/popups/mannual-add-quiz";
import useFetchData from "@/hooks/fetch-data";
import { getQuestions } from "@/service/question";
import { setLectureQuestions } from "@/store/questionSlice";

const AllQuiz = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showManualAddPopup, setShowManualAddPopup] = useState(false);
  const [showEmptyPopup, setShowEmptyPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { lectureId } = useParams();
  const dispatch = useDispatch();

  const { questions } = useSelector((state) => state.questions);

  const questionsData = useFetchData(getQuestions, { "filter[lectureId]": lectureId });

  useEffect(() => {
    if (questionsData) {
      dispatch(
        setLectureQuestions({
          lectureId,
          questions: questionsData.data.docs
        })
      );
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [questionsData, dispatch, lectureId]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFlaggedQuizzesClick = () => {
    navigate("/admin-portal/flagged-quiz");
  };

  return (
    <div className="p-4 px-6">
      <div className="flex justify-between mb-8">
        <div>
          <p className="font-semibold text-lg">
            Foundations of Computing: Data Structures, Algorithms, and Operating Systems
          </p>
          <h2 className="font-semibold text-4xl">All Questions</h2>
        </div>
        <div className="flex items-center">
          <button
            className="bg-red-700 hover:bg-red-600 text-white uppercase font-bold py-2 px-4 rounded mx-2"
            onClick={handleFlaggedQuizzesClick}
          >
            Flagged Quizzes
          </button>
          <button
            className="bg-blue-700 hover:bg-blue-600 text-white uppercase font-bold py-2 px-4 rounded mx-2"
            onClick={togglePopup}
          >
            Add Quizzes
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax={"calc(100vh - 220px)"}
          thumbMinSize={30}
          universal={true}
          className="rounded-lg"
        >
          {questions.length > 0 ? (
            questions.map((quiz, index) => (
              <QuizCard
                key={index}
                questionId={quiz?._id}
                questionNumber={index + 1}
                question={quiz.question}
                alternativeQuestions={quiz.alternative_questions}
                answer={quiz.answer}
                distractors={quiz.distractors}
                context={quiz.context}
                lectureId={lectureId}
              />
            ))
          ) : (
            <div className="text-center text-lg font-bold mt-6">No questions available for this lecture.</div>
          )}
        </Scrollbars>
      )}

      {showPopup && (
        <AddQuizPopup
          onClose={togglePopup}
          onManualAddQuiz={() => {
            setShowManualAddPopup(true);
            setShowPopup(false);
          }}
          onGenerateQuiz={() => {
            setShowEmptyPopup(true);
            setShowPopup(false);
          }}
        />
      )}

      {showManualAddPopup && <ManualAddQuizPopup onClose={() => setShowManualAddPopup(false)} />}

      {showEmptyPopup && <QuizeGenerationPopup onClose={() => setShowEmptyPopup(false)} />}
    </div>
  );
};

export default AllQuiz;
