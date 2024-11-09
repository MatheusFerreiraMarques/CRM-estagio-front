import axios from "axios";

const API_URL = "http://localhost:3333/";

const register = (name, email, password) => {
  return axios.post(API_URL + "register-user", {
    name,
    email,
    password,
  });
};

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "signin", { email, password });

    if (response.data.token) {
      // Salva o token e os dados do usuário no localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("Usuário logado:", response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao tentar login:", error);
    throw error;
  }
};

const logout = async () => {
  // Remove o token e os dados do usuário do localStorage
  localStorage.removeItem("user");

  try {
    const response = await axios.post(API_URL + "signout");
    return response.data;
  } catch (error) {
    console.error("Erro ao tentar logout:", error);
    throw error;
  }
};

const getCurrentUser = () => {
  // Retorna o objeto do usuário com o token do localStorage ou null
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
