import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import generateQuestionReducer from "./generateQuestionSlice";
import lecturesReducer from "./lecturesSlice";
import moduleReducer from "./moduleSlice";
import questionsReducer from "./questionSlice";

const store = configureStore({
  reducer: {
    lectures: lecturesReducer,
    modules: moduleReducer,
    questions: questionsReducer,
    generateQuestion: generateQuestionReducer,
    auth: authReducer
  }
});

export default store;
