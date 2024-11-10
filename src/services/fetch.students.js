import axios from "axios";

const API_URL = "http://localhost:3333/";

export const fetchStudents = (page) => {
  return axios.post(API_URL + "view-student", { page }, {
    withCredentials: true
  });
};

export default { fetchStudents };
