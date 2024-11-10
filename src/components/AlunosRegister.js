import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import registerStudent from "../services/student.service";


const AlunosRegister = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeRegistration = (e) => {
    const registration = e.target.value;
    setRegistration(registration);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        registerStudent(name, email, registration).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

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
                  name="name"
                  value={name}
                  onChange={onChangeName}
                />
              </div>

              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="E-mail"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>

              <div className="form-group">
                <Input
                  type="registration"
                  className="form-control"
                  placeholder="Registration"
                  name="registration"
                  value={registration}
                  onChange={onChangeRegistration}
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

export default AlunosRegister;