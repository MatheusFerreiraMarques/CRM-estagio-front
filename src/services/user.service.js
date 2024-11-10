import axios from "axios";

const API_URL = "http://localhost:3333/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};
const registerStudent = (name, email, registration) => {
  return axios.post(API_URL + "register-student", {
    name,
    email,
    registration
  });
};
const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  registerStudent,
}

export default UserService;
