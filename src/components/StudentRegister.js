import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";

const API_URL = "http://localhost:3333";

const StudentRegister = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState("");
  const [companyId, setCompanyId] = useState(""); // ID da empresa para registrar o estudante
  const [course, setCourse] = useState("");
  const [professionalId, setProfessionalId] = useState("");
  const [cpf, setCpf] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [contractType, setContractType] = useState("");
  const [workDays, setWorkDays] = useState("");
  const [schedule, setSchedule] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [insurancePolicy, setInsurancePolicy] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [companies, setCompanies] = useState([]); // Lista de empresas
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca da empresa

  // Função para buscar empresas específicas com base no termo de busca
  const searchCompany = async () => {
    try {
      const response = await axios.post(
        API_URL + "/search-company",
        {
          name: searchTerm, // Envia o nome ou CNPJ
        },
        {
          withCredentials: true,
        }
      );
      setCompanies(response.data.companys.comapnyWithName || []); // Atualiza a lista de empresas
    } catch (error) {
      console.error("Erro ao buscar empresa:", error);
    }
  };

  // Função para manipular a seleção da empresa
  const handleCompanySelect = (company) => {
    setCompanyId(company.id); // Armazena o ID retornado no response
    setSearchTerm(company.corporateName); // Preenche o campo com o nome da empresa
    setCompanies([]); // Limpa a lista de empresas após a seleção
  };

  // Função para remover a empresa selecionada
  const handleRemoveCompany = () => {
    setCompanyId(""); // Limpa o ID da empresa selecionada
    setSearchTerm(""); // Limpa o nome da empresa do campo de busca
  };

  // Função para registrar o aluno
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      // Converte os valores vazios de weeklyHours e totalHours para 0 antes de enviar para o back-end
      const weeklyHoursValue = weeklyHours ? parseFloat(weeklyHours) : 0;
      const totalHoursValue = totalHours ? parseFloat(totalHours) : 0;

      try {
        // Envia os dados para o backend
        const response = await axios.post(API_URL + "/register-student", {
          name,
          email,
          registration,
          companyId, // Usa o ID armazenado
          course,
          professionalId,
          cpf,
          position,
          phone,
          contractType,
          workDays,
          schedule,
          weeklyHours: weeklyHoursValue,
          totalHours: totalHoursValue,
          insurancePolicy,
        }, {
          withCredentials: true
        });
        setMessage("Aluno registrado com sucesso!");
        setSuccessful(true);
      } catch (error) {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      }
    }
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      searchCompany(); // Busca as empresas dinamicamente
    } else {
      setCompanies([]); // Limpa a lista de empresas se o termo de busca estiver vazio
    }
  }, [searchTerm]);

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2 className="section-title">Registro Alunos</h2>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Matrícula"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                  required
                />
              </div>

              {/* Campo de Busca para Empresas */}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar Empresa"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
                />
              </div>

              {/* Exibição das empresas encontradas */}
              <div className="form-group">
                {companies.length > 0 && (
                  <ul className="list-unstyled mt-2">
                    {companies.map((company) => (
                      <li
                        key={company.id}
                        style={{
                          cursor: "pointer",
                          padding: "5px 0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onClick={() => handleCompanySelect(company)}
                      >
                        {company.corporateName}
                        <button
                          type="button"
                          onClick={() => handleRemoveCompany()}
                          style={{
                            background: "none",
                            border: "none",
                            color: "red",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                        >
                          &#10005; {/* Ícone de "X" */}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Confirmação da Empresa Selecionada */}
              {companyId && (
                <div className="form-group">
                  <span>Empresa Selecionada: {searchTerm}</span>
                </div>
              )}

              {/* Outros campos do formulário */}
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Curso"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="ID Profissional"
                  value={professionalId}
                  onChange={(e) => setProfessionalId(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Cargo"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Tipo de Contrato"
                  value={contractType}
                  onChange={(e) => setContractType(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Dias de Trabalho"
                  value={workDays}
                  onChange={(e) => setWorkDays(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Horário"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Horas Semanais"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Total de Horas"
                  value={totalHours}
                  onChange={(e) => setTotalHours(e.target.value)}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Apólice de Seguro"
                  value={insurancePolicy}
                  onChange={(e) => setInsurancePolicy(e.target.value)}
                />
              </div>

              <div className="form-group">
                <CheckButton
                  style={{
                    backgroundColor: "#4CAF50",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}
                  ref={checkBtn}
                >
                  Registrar
                </CheckButton>
              </div>
            </div>
          )}

          {message && (
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default StudentRegister;
