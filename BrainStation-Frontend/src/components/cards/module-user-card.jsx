import { useState } from "react";
import DialogBox from "../common/dialogBox";

const ModuleUserCard = ({ user, showEnrollButton, onEnroll, onUnenroll, filterEnrolled }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleEnrollClick = () => {
    setShowDialog(true);
  };

  const handleConfirmEnroll = () => {
    if (filterEnrolled) {
      onUnenroll(user._id);
    } else {
      onEnroll(user._id);
    }
    setShowDialog(false);
  };

  const handleCancelEnroll = () => {
    setShowDialog(false);
  };

  return (
    <>
      <div
        className="flex justify-between items-center rounded-xl py-6 px-10 mx-1.5 my-4 bg-white"
        style={{ boxShadow: "0px 0px 4.4px rgba(0, 0, 0, 0.3)" }}
      >
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600">Role: {user.role}</p>
        </div>
        {showEnrollButton ? (
          <button
            className="text-white bg-blue-900 hover:bg-blue-700 px-5 py-1 border rounded-lg mx-2"
            onClick={handleEnrollClick}
          >
            Enroll
          </button>
        ) : (
          <button
            className="text-white bg-red-700 hover:bg-red-800 px-5 py-1 border rounded-lg mx-2"
            onClick={handleEnrollClick}
          >
            Unenroll
          </button>
        )}
      </div>
      <DialogBox
        isVisible={showDialog}
        message={`${filterEnrolled ? "Unenroll" : "Enroll"} ${user.name} in this module?`}
        onOkay={handleConfirmEnroll}
        onCancel={handleCancelEnroll}
        okayLabel="Yes"
        cancelLabel="No"
      />
    </>
  );
};

export default ModuleUserCard;
