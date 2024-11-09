import axios from "axios";
import Cookies from "js-cookie"; // Importando js-cookie

const API_URL = "http://localhost:3333/";

const register = (name, email, password) => {
  return axios.post(API_URL + "register-user", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    }, {
      withCredentials: true // Garante o envio e recebimento de cookies
    })
    .then((response) => {
      if (response.data.email) {
        // Armazenando o token e a mensagem no localStorage
        localStorage.setItem("message", response.data); // Armazenando a mensagem de sucesso
      }
      console.log(response.data);
      return response.data;
    });
};

const logout = async () => {
  // Remove o token e a mensagem do localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("email"); // Caso tenha armazenado mais dados
  localStorage.removeItem("message"); // Removendo a mensagem também

  try {
    const response = await axios.post(API_URL + "signout");
    return response.data;
  } catch (error) {
    console.error("Erro ao tentar logout:", error);
    throw error;
  }
};

const getCurrentUser = () => {
  // Retorna o token armazenado no localStorage
  return localStorage.getItem("token");
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
