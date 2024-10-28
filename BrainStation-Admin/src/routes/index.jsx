import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { DefaultLayout } from "@/components";
import NotFound from "@/pages/404";
import AddLecture from "@/pages/add-lecture";
import AllModules from "@/pages/all-modules";
import AllQuiz from "@/pages/all-quiz";
import Dashboard from "@/pages/dashboard";
import SlideEditor from "@/pages/edit-lectures";
import FlaggedQuiz from "@/pages/flagged-quiz";
import Lecture from "@/pages/lecture";
import Login from "@/pages/login";
import MetricsPage from "@/pages/metrics";
import ModuleUsers from "@/pages/module-students";
import Profile from "@/pages/profiles";
import Signup from "@/pages/signup";
import Users from "@/pages/users";

const coreRoutes = [
  {
    path: "",
    title: "dashboard",
    component: Dashboard
  },
  {
    path: "dashboard",
    title: "dashboard",
    component: Dashboard
  },
  {
    path: "quizzes/:lectureId",
    title: "all-quiz",
    component: AllQuiz
  },
  {
    path: "flagged-quiz",
    title: "flagged-quiz",
    component: FlaggedQuiz
  },
  {
    path: "all-module",
    title: "all-module",
    component: AllModules
  },
  {
    path: "users",
    title: "users",
    component: Users
  },
  {
    path: "profile/:userId",
    title: "profile",
    component: Profile
  },
  {
    path: "metrics",
    title: "metrics",
    component: MetricsPage
  },
  {
    path: "module/:moduleId",
    title: "lecture",
    component: Lecture
  },
  {
    path: "add-lecture/:moduleId",
    title: "add-lecture",
    component: AddLecture
  },
  {
    path: "edit-lecture/:lectureId",
    title: "edit-lecture",
    component: SlideEditor
  },
  {
    path: "module-students/:moduleId",
    title: "module-students",
    component: ModuleUsers
  }
];

const CustomRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Navigate to="/admin-portal" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/admin-portal" element={<DefaultLayout />}>
        {coreRoutes.map((route, index) => {
          const { path, component: Component } = route;

          return <Route key={index} path={path} element={<Component />} />;
        })}
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CustomRoutes;
