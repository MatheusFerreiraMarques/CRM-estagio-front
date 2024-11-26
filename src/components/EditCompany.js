import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const API_URL = "http://localhost:3333";

const EditCompany = () => {
  const { corporateName } = useParams(); // Nome corporativo vindo da URL
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [tradeName, setTradeName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [segment, setSegment] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  // Carregar os dados da empresa ao montar o componente
  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        const response = await axios.get(`${API_URL}/company/${corporateName}`, {
          withCredentials: true,
        });
        const company = response.data;

        if (company) {
          setTradeName(company.tradeName || "");
          setCnpj(company.cnpj || "");
          setSegment(company.segment || "");
        }
      } catch (error) {
        console.error("Erro ao carregar os dados da empresa:", error);
        setMessage("Não foi possível carregar os dados da empresa.");
      }
    };

    loadCompanyData();
  }, [corporateName]);

  // Função para atualizar os dados da empresa
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      try {
        await axios.put(
          `${API_URL}/company/${corporateName}`,
          {
            tradeName,
            cnpj,
            segment,
          },
          { withCredentials: true }
        );

        setMessage("Empresa atualizada com sucesso!");
        setSuccessful(true);

        // Redirecionar após sucesso
        setTimeout(() => navigate("/companies"), 2000);
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

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2 className="section-title">Editar Empresa</h2>
        <Form onSubmit={handleUpdate} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label>Nome Fantasia</label>
                <Input
                  type="text"
                  className="form-control"
                  value={tradeName}
                  onChange={(e) => setTradeName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>CNPJ</label>
                <Input
                  type="text"
                  className="form-control"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Segmento</label>
                <Input
                  type="text"
                  className="form-control"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  required
                />
              </div>

              <CheckButton className="btn btn-primary btn-block" ref={checkBtn}>
                Atualizar
              </CheckButton>
            </div>
          )}

          {message && (
            <div
              className={successful ? "alert alert-success" : "alert alert-danger"}
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

export default EditCompany;
