import { NavLink } from "react-router-dom";

const AnalyticsIcon = () => {
  return (
    <NavLink
      to="/admin-portal/users"
      className={({ isActive }) =>
        `flex flex-col items-center rounded-md p-4 hover:bg-gray-300 ${isActive ? "bg-primary-blue text-white" : ""}`
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 512 512"
        strokeWidth={30.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"
        />
      </svg>
    </NavLink>
  );
};

export default AnalyticsIcon;
