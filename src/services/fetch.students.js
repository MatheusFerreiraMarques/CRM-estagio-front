import axios from "axios";

const API_URL = "http://localhost:3333/";

// Função para buscar todos os estudantes (já existente)
export const fetchStudents = async (page) => {
  try {
    const result = await axios.post(
      API_URL + "view-student",
      { page },
      { withCredentials: true }
    );
    return result;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      return error.response.status;
    }
  }
};



export default { fetchStudents };