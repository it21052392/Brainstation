import { createSlice } from "@reduxjs/toolkit";

// Initial state for the questions slice
const initialState = {
  questions: [],
  lectureId: null,
  lectureName: ""
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setLectureQuestions: (state, action) => {
      state.lectureId = action.payload.lectureId;
      state.lectureName = action.payload.lectureName;
      state.questions = action.payload.questions;
    },
    updateQuestion: (state, action) => {
      const questionIndex = state.questions.findIndex((question) => question._id === action.payload._id);
      if (questionIndex !== -1) {
        state.questions[questionIndex] = action.payload;
      }
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    removeQuestion: (state, action) => {
      state.questions = state.questions.filter((question) => question._id !== action.payload._id);
    }
  }
});

export const { setLectureQuestions, updateQuestion, addQuestion, removeQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
