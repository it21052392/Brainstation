import { createSlice } from "@reduxjs/toolkit";
import quizzes from "../../public/assets/data/quizes";

const initialState = {
  currentLectureId: null,
  quizzes: []
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzesForLecture: (state, action) => {
      const lectureId = action.payload;
      state.currentLectureId = lectureId;
      state.quizzes = quizzes[lectureId] || [];
    }
  }
});

export const { setQuizzesForLecture } = quizzesSlice.actions;

export default quizzesSlice.reducer;
