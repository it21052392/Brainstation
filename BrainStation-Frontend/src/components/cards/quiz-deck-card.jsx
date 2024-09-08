const QuizDeckCard = () => {
  return (
    <>
      <div
        className="h-[60px] rounded-xl flex justify-between items-center p-4 mx-1.5 my-4 hover:opacity-70 cursor-pointer"
        style={{ boxShadow: "0px 0px 4.4px rgba(0, 0, 0, 0.15)" }}
      >
        <p className="uppercase font-josfin-sans">Lecturer 01</p>
        <p className="text-xs text-[#C5C5C5]">10 Quizes</p>
      </div>
    </>
  );
};

export default QuizDeckCard;
