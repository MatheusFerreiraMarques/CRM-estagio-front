import axios from "axios";

const API_URL = "http://localhost:3333/";

export const fetchCompanies = async (page) => {
  try {
    const result = await axios.post(
      API_URL + "view-companies",
      { page },
      { withCredentials: true }
    );
    return result;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      return error.response.status;
    } else {
      console.error("Erro desconhecido:", error);
    }
  }
};

export default { fetchCompanies };
