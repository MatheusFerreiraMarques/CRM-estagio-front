import axios from "axios";

const API_URL = "http://localhost:3333/";

const registerCompany = (corporateName, tradeName, address, neighborhood, postalCode, cnpj, segment, representative) => {
  return axios.post(API_URL + "register-company", {
    corporateName,
    tradeName,
    address,
    neighborhood,
    postalCode,
    cnpj,
    segment,
    representative,
  },{
    withCredentials: true
  });
};

export default registerCompany;
