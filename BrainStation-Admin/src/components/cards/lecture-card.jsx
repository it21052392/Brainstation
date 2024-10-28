import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLecture } from "@/service/lecture";
import DialogBox from "../common/dialogBox";

const LectureCard = ({ lecture, slidesTot, lectureId }) => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const handleViewQuizzes = () => {
    navigate(`/admin-portal/quizzes/${lectureId}`);
  };

  const handleOkay = () => {
    handleDeleteLec();
    setShowDialog(false);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleDeleteLec = async () => {
    await deleteLecture(lectureId);
    window.location.reload();
  };

  return (
    <>
      <div
        className={`flex justify-between items-center rounded-xl py-6 px-10 mx-1.5 my-4`}
        style={{ boxShadow: "0px 0px 4.4px rgba(0, 0, 0, 0.3)" }}
      >
        <div>
          <h2 className="text-lg font-semibold">{lecture}</h2>
          <p className="text-sm">{`${slidesTot} slides`}</p>
        </div>
        <div>
          <button
            className="text-white bg-blue-900 hover:bg-blue-700 px-5 py-1 border rounded-lg mx-2"
            onClick={handleViewQuizzes}
          >
            View Quizzes
          </button>
          <button
            className="text-white bg-red-700 hover:bg-red-800 px-5 py-1 border rounded-lg mx-2"
            onClick={() => setShowDialog(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <DialogBox
        isVisible={showDialog}
        message="Remove this lecture?"
        onOkay={handleOkay}
        onCancel={handleCancel}
        okayLabel="Yes"
        cancelLabel="No"
      />
    </>
  );
};

export default LectureCard;
