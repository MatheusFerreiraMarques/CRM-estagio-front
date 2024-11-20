import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Importação do AuthService para controle de autenticação
import AuthService from "./services/auth.service";

// Importação dos componentes das páginas
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Students from "./components/Students"; // Componente da Tabela de Alunos
import StudentRegister from "./components/StudentRegister";
import Companies from "./components/Companies"; // Componente da Tabela de Alunos
import CompanyRegister from "./components/CompanyRegister";

const App = () => {
  const [currentUser, setCurrentUser] = useState(false);

  // useEffect para buscar usuário e gerenciar autenticação
  useEffect(() => {
    const message = localStorage.getItem("message"); // Verifica "message" no localStorage
    if (message) {
      setCurrentUser(true); // Define que o usuário está logado se "message" existir
    }
  }, []);

  // Função de logout
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          <img src="fpm.png" alt="FPM Logo" style={{ height: "40px" }} />
        </Link>

        <div className="navbar-nav mr-auto">
  {/* Exibe o item "Alunos" apenas se "message" estiver presente no localStorage */}
  {currentUser && (
    <>
      <li className="nav-item">
        <Link to={"/students"} className="nav-link">
          Students
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/companies"} className="nav-link">
          Companies
        </Link>
      </li>
    </>
  )}
</div>


        

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/students" element={<Students />} /> {/* Rota para Tabela */}
          <Route path="/studentregister" element={<StudentRegister/>} /> {/* Rota para Tabela */}
          <Route path="/companies" element={<Companies/>} /> {/* Rota para Tabela */}
          <Route path="/companyregister" element={<CompanyRegister/>} /> {/* Rota para Tabela */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
