const HorizontalThreeDotIcon = ({ size = 5, color = "currentColor" }) => {
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
      fill={color}
      width={actualSize}
      height={actualSize}
      aria-hidden="true"
    >
      <circle cx="4" cy="12" r="2.5" />
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="20" cy="12" r="2.5" />
    </svg>
  );
};

export default HorizontalThreeDotIcon;
