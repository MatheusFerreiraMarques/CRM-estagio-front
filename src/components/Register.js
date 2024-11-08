import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Este campo é obrigatório!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        Este não é um email válido.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 30) {
    return (
      <div className="invalid-feedback d-block">
        O nome deve ter entre 3 e 30 caracteres.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        A senha deve ter entre 6 e 40 caracteres.
      </div>
    );
  }
};

const matchPassword = (value, props) => {
  // Verifique os valores das senhas
  console.log("Password:", props.password);
  console.log("Confirm Password:", value);

  if (value !== props.password) {
    return (
      <div className="invalid-feedback d-block">
        As senhas não coincidem.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Novo estado para confirmar a senha
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
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
        <h2 className="section-title">Registro</h2>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
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
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <Input
                  type="password"
                  className="form-control"
                  placeholder="Senha"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <Input
                  type="password"
                  className="form-control"
                  placeholder="Confirme a Senha"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  validations={[required, matchPassword]} // Adicionando validação para confirmação da senha
                  // Passando a senha para a validação
                  password={password} 
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

        <div className="text-center">
          <p>
            Já possui uma conta?{" "}
            <a href="/login" className="link-primary">
              Clique aqui
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
