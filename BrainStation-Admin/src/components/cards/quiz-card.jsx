const QuizCard = ({ question, answer }) => {
  return (
    <div className="p-2 bg-white border-b mb-2">
      <h5 className="font-bold">{question}</h5>
      <p className="text-xs font-extralight mt-2">{answer}</p>
    </div>
  );
};

export default QuizCard;
