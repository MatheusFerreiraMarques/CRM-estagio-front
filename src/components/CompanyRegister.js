import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import registerCompany from "../services/register.company";

const CompanyRegister = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [corporateName, setCorporateName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [segment, setSegment] = useState("");
  const [representative, setRepresentative] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const numericPostalCode = Number(postalCode);

      // Verifica se o postalCode é um número válido e tem 8 dígitos
      if (isNaN(numericPostalCode) || numericPostalCode.toString().length !== 8) {
        setMessage("CEP deve ser um número válido com exatamente 8 dígitos.");
        setSuccessful(false);
        return;
      }

      try {
        const response = await registerCompany({
          corporateName,
          tradeName,
          address,
          neighborhood,
          postalCode: numericPostalCode, // Envia como número
          cnpj,
          segment,
          representative,
        });
        setMessage("Empresa registrada com sucesso!");
        setSuccessful(true);
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
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
        <h2 className="section-title">Registro Empresas</h2>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Nome Corporativo"
                  value={corporateName}
                  onChange={(e) => setCorporateName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Nome Fantasia"
                  value={tradeName}
                  onChange={(e) => setTradeName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Endereço"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Bairro"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="CEP"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="CNPJ"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Segmento"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Representante"
                  value={representative}
                  onChange={(e) => setRepresentative(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Registrar</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default CompanyRegister;
