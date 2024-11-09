import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Importação do AuthService para controle de autenticação
import AuthService from "./services/auth.service";

// Importação dos componentes das páginas
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Alunos from "./components/Alunos"; // Componente da Tabela de Alunos

// Importando js-cookie para acessar os cookies
import Cookies from "js-cookie";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  // useEffect para buscar usuário e gerenciar autenticação
  useEffect(() => {
    const token = Cookies.get("token");  // Pegando diretamente do js-cookie
    if (token) {
      setCurrentUser({ username: 'User', token: token });  // Defina o usuário como quiser
      // Simulando roles (substitua com o que é retornado pela sua API se aplicável)
      setShowModeratorBoard(true); // Ou lógica para determinar o papel
      setShowAdminBoard(true);     // Ou lógica para determinar o papel
    }
  }, []);
  
  // Função de logout
  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          <img src="fpm.png" alt="FPM Logo" style={{ height: '40px' }} />
        </Link>

        <div className="navbar-nav mr-auto">
          {/* Exibe o item "Alunos" apenas se o token estiver presente */}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/alunos"} className="nav-link">
                Alunos
              </Link>
            </li>
          )}

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          // Só exibe o botão de login se não houver currentUser
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
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/alunos" element={<Alunos />} /> {/* Rota para Tabela */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
