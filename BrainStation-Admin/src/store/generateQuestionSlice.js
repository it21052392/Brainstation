import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generatedQuestions: {}
};

const generateQuestionSlice = createSlice({
  name: "generateQuestion",
  initialState,
  reducers: {
    setGeneratedQuestions: (state, action) => {
      const { lectureId, questions } = action.payload;
      state.generatedQuestions[lectureId] = questions;
    },
    updateGeneratedQuestion: (state, action) => {
      const { lectureId, index, updatedQuestion } = action.payload;
      if (!state.generatedQuestions[lectureId]) return;

      // Update the question at the specific index
      state.generatedQuestions[lectureId][index] = updatedQuestion;
    },
    clearGeneratedQuestions: (state, action) => {
      const { lectureId } = action.payload;
      delete state.generatedQuestions[lectureId];
    }
  }
});

export const { setGeneratedQuestions, updateGeneratedQuestion, clearGeneratedQuestions } =
  generateQuestionSlice.actions;
export default generateQuestionSlice.reducer;
