import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(name, password).then(
        (response) => {
          // Armazena a mensagem de autenticação no localStorage
          localStorage.setItem("message", "authenticated");

          // Navega para /alunos e recarrega a página
          navigate("/students");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2 className="section-title">Login</h2>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <Input
              type="text"
              className="form-control"
              placeholder="E-mail"
              name="name"
              value={name}
              onChange={onChangeName}
              validations={[required]}
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
              validations={[required]}
            />
          </div>

          <div className="form-group text-right">
            <Link to="#" className="forgot-password" onClick={() => {/* Função para recuperar senha */}}>
              Esqueceu a senha?
            </Link>
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

        <div className="text-center mt-3">
          <p>
            Não possui uma conta? <Link to="/register">Clique aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
