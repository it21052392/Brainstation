import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { default as CustomRoutes } from "@/routes";

const App = () => {
  return (
    <>
      <CustomRoutes />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        draggable={false}
        theme="light"
      />
    </>
  );
};

export default App;
