import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentService from "../services/student.service";
import '../styles/Students.css';

const Students = () => {
  const navigate = useNavigate();
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [pesquisaNome, setPesquisaNome] = useState("");

  const handlePesquisaChange = (event) => {
    setPesquisaNome(event.target.value);
  };

  const handleAddStudent = () => {
    // Redireciona para a página de cadastro de aluno
    navigate("/registerstudent");
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <input
          type="text"
          value={pesquisaNome}
          onChange={handlePesquisaChange}
          className="form-control"
          placeholder="Buscar aluno pelo nome..."
        />
        <div className="plus-icon" onClick={handleAddStudent}>
          <i className="fas fa-plus"></i>
        </div>
      </div>

      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Registro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.filter(cliente => 
            cliente.nome.toLowerCase().includes(pesquisaNome.toLowerCase())
          ).map(cliente => (
            <tr key={cliente.registration}>
              <td>{cliente.registration}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.registration}</td>
              <td>
                {/* Remover o botão de editar, já que não há edição no momento */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
