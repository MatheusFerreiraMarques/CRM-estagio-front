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
    .post(
      API_URL + "signin",
      { email, password },
      { withCredentials: true } // Garante o envio e recebimento de cookies
    )
    .then((response) => {
      if (response.data.message) {
        // Armazena apenas a mensagem no localStorage
        localStorage.setItem("message", response.data.message);
      }
      console.log( response.data.message);
      return response.data;
    })
    .catch((error) => {
      console.error("Erro ao tentar login:", error);
      throw error;
    });
};

const logout = async () => {
  localStorage.removeItem("message"); // Removendo a mensagem no logout
  try {
    const response = await axios.post(API_URL + "signout", {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erro ao tentar logout:", error);
    throw error;
  }
};

const getCurrentUser = () => {
  // Retorna o valor armazenado
  return localStorage.getItem("message");
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
