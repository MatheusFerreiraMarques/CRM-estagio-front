import axios from "axios";

const API_URL = "http://localhost:3333/";

export const fetchStudents = async (page) => {
  try {
    // Tenta fazer a requisição
    const result = await axios.post(
      API_URL + "view-student",
      { page },
      { withCredentials: true }
    );
    return result;
  } catch (error) {
    // Captura o erro e verifica se é um erro de resposta da API
    if (error.response) {
      // Erros que ocorrem na resposta da API (status codes como 404, 500, etc.)
      console.log(error.response.status)
      return error.response.status
    } 
  }
};

export default { fetchStudents };
