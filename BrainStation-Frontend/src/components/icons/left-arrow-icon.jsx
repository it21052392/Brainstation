const LeftArrowIcon = ({ size = 5, color = "black" }) => {
  // Define pixel sizes manually, corresponding to Tailwind's predefined sizes
  const sizeMap = {
    5: "20px", // w-5, h-5
    6: "24px", // w-6, h-6
    7: "28px", // Custom size
    8: "32px" // w-8, h-8
  };

  const actualSize = sizeMap[size] || "20px"; // Fallback to 20px if size is not in map

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      color={color}
      width={actualSize}
      height={actualSize}
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
};

export default LeftArrowIcon;
