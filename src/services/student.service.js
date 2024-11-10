// student.service.js
import axios from "axios";

const API_URL = "http://localhost:3333/";

// Para registrar um aluno (ajuste conforme necessário)
const registerStudent = (name, email, registration) => {
  return axios.post(API_URL + "register-student", {
    name,
    email,
    registration
  }, {
    withCredentials: true
  });
};

// Para adicionar um aluno ao sistema
const addStudent = (nome, email, registration) => {
  return axios.post(API_URL + "add-student", {
    nome,
    email,
    registration
  });
};

export default { registerStudent, addStudent };
