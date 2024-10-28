import { apiRequest, axiosInstance } from "./core/axios";

// Service to handle session-related API requests

// Save the session data to the backend
export const saveSession = async (sessionData) => {
  return await apiRequest(() => axiosInstance.post("/api/sessions", sessionData));
};

// Retrieve a session by ID
export const getSessionById = async (sessionId) => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/${sessionId}`));
};

// Retrieve all sessions for the authenticated user
export const getSessionsByUser = async (data) => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/user/${data}`));
};

// Retrieve all sessions by the authenticated user for a specific module
export const getSessionsByUserModule = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/userByModule`));
};

// Retrieve start and end times of sessions per module for the authenticated user
export const getStartEndTimesByUserModule = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/start-end-times`));
};

// Retrieve total focus time per module for the authenticated user
export const getTotalFocusTimeByUserModule = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/total-focus-time`));
};

// Retrieve average focus time per module for the authenticated user
export const getAverageFocusTimeByUserModule = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/average-focus-time`));
};

// Retrieve session data for the authenticated user
export const getSessionDataByUser = async (data) => {
  return await apiRequest(() => axiosInstance.get(`api/sessions/sessionData/${data}`));
};

// Retrieve the average focus time for the authenticated user (without module ID)
export const getAverageFocusTimeByUser = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/average-focus-time-by-user`));
};

// Retrieve the total session duration for the authenticated user
export const getTotalSessionDurationByUser = async () => {
  return await apiRequest(() => axiosInstance.get(`/api/sessions/total-session-duration-by-user`));
};
