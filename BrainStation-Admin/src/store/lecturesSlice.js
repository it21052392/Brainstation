import { createSlice } from "@reduxjs/toolkit";

// Initial state for the lectures slice
const initialState = {
  moduleId: null,
  moduleName: "",
  lectures: []
};

const lecturesSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {
    setModuleLectures: (state, action) => {
      state.moduleId = action.payload._id;
      state.moduleName = action.payload.name;
      state.lectures = action.payload.lectures;
    },
    updateLecture: (state, action) => {
      const lectureIndex = state.lectures.findIndex((lecture) => lecture._id === action.payload._id);
      if (lectureIndex !== -1) {
        state.lectures[lectureIndex] = action.payload;
      }
    },
    addLecture: (state, action) => {
      state.lectures.push(action.payload);
    },
    removeLecture: (state, action) => {
      state.lectures = state.lectures.filter((lecture) => lecture._id !== action.payload._id);
    }
  }
});

export const { setModuleLectures, updateLecture, addLecture, removeLecture } = lecturesSlice.actions;

export default lecturesSlice.reducer;
