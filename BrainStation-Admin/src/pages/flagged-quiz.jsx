import QuizCard from "@/components/cards/all-quiz-card";

const quizes = [
  {
    _id: "66db3a63d493144594ce0695",
    context: "In computer science and IT, individuals interact with machines and other computers to perform tasks.",
    question: "What is the primary outcome of user interaction with computer systems?",
    answer: "Performing tasks and exchanging information",
    distractors: ["Increasing software security", "Improving hardware performance", "Reducing user errors"],
    isFlagged: false,
    lectureId: "66db2d41a41cf4a7abfe84f5",
    createdAt: "2024-09-06T17:22:43.673Z",
    updatedAt: "2024-09-06T17:22:43.673Z"
  },
  {
    _id: "66db3a63d493144594ce0696",
    context: "The CPU, memory, and I/O devices are essential computer components.",
    question: "Which component directly executes instructions in a computer system?",
    answer: "CPU",
    distractors: ["RAM", "I/O devices", "Motherboard"],
    isFlagged: false,
    lectureId: "66db2d41a41cf4a7abfe84f5",
    createdAt: "2024-09-06T17:22:43.673Z",
    updatedAt: "2024-09-06T17:22:43.673Z"
  }
];

const FlaggedQuiz = () => {
  return (
    <div className="p-4 px-6">
      <div className="mb-8">
        <p className="font-semibold	text-lg">
          Foundations of Computing: Data Structures, Algorithms, and Operating Systems
        </p>
        <h2 className="font-semibold text-4xl">Flagged Quizzes</h2>
      </div>
      <div>
        {quizes.map((quiz) => (
          <QuizCard
            key={quiz._id}
            questionId={quiz._id}
            question={quiz.question}
            answer={quiz.answer}
            distractors={quiz.distractors}
          />
        ))}
      </div>
    </div>
  );
};

export default FlaggedQuiz;
