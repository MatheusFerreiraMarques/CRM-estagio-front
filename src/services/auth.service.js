import axios from "axios";
import Cookies from "js-cookie"; 

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
      { withCredentials: true }
    )
    .then((response) => {
      if (response.data.message) {
        localStorage.setItem("message", response.data.message);
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Erro ao tentar login:", error);
      throw error;
    });
};

const logout = async () => {
  localStorage.removeItem("message");
  localStorage.removeItem("students");

  // Remover o token do cookie, assumindo que o token esteja em um cookie chamado 'authToken'
  Cookies.remove("token");  // Substitua 'authToken' pelo nome correto do seu cookie, se for diferente.

  try {
    const response = await axios.post(API_URL + "signout", {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erro ao tentar logout:", error);
    throw error;
  }
};

const getCurrentUser = () => {
  return localStorage.getItem("message");
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
