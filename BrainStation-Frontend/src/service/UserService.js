import { apiRequest, axiosInstance } from "./core/axios";

// Get all users
export const getAllUsers = async () => {
  return await apiRequest(() => axiosInstance.get("/api/users"));
};

// Get user by ID
export const getUserById = async (id) => {
  return await apiRequest(() => axiosInstance.get(`/api/users/${id}`));
};

export const getOtherUsers = async (moduleId) => {
  return await apiRequest(() => axiosInstance.get(`/api/users/other-users/${moduleId}`));
};

export const getUsersByModule = async (moduleId) => {
  return await apiRequest(() => axiosInstance.get(`/api/users/users-by-module/${moduleId}`));
};

export const enrollUser = async (userId, moduleId) => {
  const data = {
    userId: userId,
    moduleId: moduleId
  };

  return await apiRequest(() => axiosInstance.patch(`/api/users/enroll`, data));
};

export const unenrollUser = async (userId, moduleId) => {
  const data = {
    userId: userId,
    moduleId: moduleId
  };
  return await apiRequest(() => axiosInstance.patch(`/api/users/unenroll`, data));
};
