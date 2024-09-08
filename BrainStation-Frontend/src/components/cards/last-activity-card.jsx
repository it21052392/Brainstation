import HorizontalThreeDotIcon from "../icons/three-dot-icon";

const LastActivityCard = () => {
  return (
    <div
      className="mt-4 relative bg-horizontal-gradient p-6 mx-[0.4rem] rounded-xl text-white hover:opacity-80
    "
    >
      <div className="absolute top-1 right-2 cursor-pointer">
        <HorizontalThreeDotIcon size={5} color="white" />
      </div>
      <p className="font-josfin-sans text-xl mb-2">Where you left</p>
      <p className="text-xs font-inter">Lecturer 01 Comprehensive Guide to Data Structures and Algorithms</p>
    </div>
  );
};

export default LastActivityCard;
