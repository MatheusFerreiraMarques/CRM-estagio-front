import axios from "axios";

const API_URL = "http://localhost:3333/";

const registerStudent = ({
  name, 
  email, 
  registration, 
  companyId,     
  course, 
  professionalId,
  cpf,
  position,
  phone,
  contractType,
  workDays,
  schedule,
  weeklyHours,
  totalHours,
  insurancePolicy
}) => {
  return axios.post(API_URL + "register-student", {
    name,
    email,
    registration,
    companyId,
    course,
    professionalId,
    cpf,
    position,
    phone,
    contractType,
    workDays,
    schedule,
    weeklyHours,
    totalHours,
    insurancePolicy
  },{
    withCredentials: true
  });

};

export default registerStudent;