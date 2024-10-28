import { NavLink, useLocation, useNavigate } from "react-router-dom";

const HomeIcon = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    // Check if '/admin-portal' is anywhere in the current path
    if (location.pathname.includes("/admin-portal")) {
      e.preventDefault(); // Prevent the default navigation
      navigate("/admin-portal/dashboard"); // Redirect to '/all-quiz' instead
    }
  };

  return (
    <NavLink
      to="/admin-portal/dashboard"
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
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    </NavLink>
  );
};

// bg-primary-blue text-white rounded-full

export default HomeIcon;
