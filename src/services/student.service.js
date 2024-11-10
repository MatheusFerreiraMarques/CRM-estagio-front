import axios from "axios";

const API_URL = "http://localhost:3333/";

const registerStudent = (name, email, registration) => {
  return axios.post(API_URL + "register-student", {
    name,
    email,
    registration
  },{
    withCredentials: true
  });
};

export default registerStudent;
