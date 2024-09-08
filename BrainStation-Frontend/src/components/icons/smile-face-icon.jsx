const SmileFaceIcon = ({ size = 5, color = "currentColor" }) => {
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
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default SmileFaceIcon;
