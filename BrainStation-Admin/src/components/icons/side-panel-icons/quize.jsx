import { NavLink, useLocation, useNavigate } from "react-router-dom";

const QuizzIcon = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    // Check if '/admin-portal' is anywhere in the current path
    if (location.pathname.includes("/admin-portal")) {
      e.preventDefault(); // Prevent the default navigation
      navigate("/admin-portal/all-quiz"); // Redirect to '/all-quiz' instead
    }
  };

  return (
    <NavLink
      to="/admin-portal/all-quiz"
      className={({ isActive }) =>
        `flex flex-col items-center rounded-md p-4 hover:bg-gray-300 ${isActive ? "bg-primary-blue text-white" : ""}`
      }
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    </NavLink>
  );
};

export default QuizzIcon;
