const LeftArrowLongIcon = ({ size = 5, color = "black" }) => {
  // Define pixel sizes manually, corresponding to Tailwind's predefined sizes
  const sizeMap = {
    3: "14px", // w-3, h-3
    4: "16px", // w-4, h-4
    5: "20px", // w-5, h-5
    6: "24px", // w-6, h-6
    7: "28px", // Custom size
    8: "32px" // w-8, h-8
  };

  const actualSize = sizeMap[size] || "20px"; // Fallback to 20px if size is not in map

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      color={color}
      width={actualSize}
      height={actualSize}
      viewBox="0 0 24 24"
      strokeWidth={2.2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
};

export default LeftArrowLongIcon;
