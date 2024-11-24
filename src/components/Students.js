import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStudents } from "../services/fetch.students"; // Função de busca de alunos
import "../styles/Students.css";

const Students = () => {
  const navigate = useNavigate();
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [pesquisaNome, setPesquisaNome] = useState("");

  // Carregar estudantes ao montar o componente
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await fetchStudents(1); // Passando a página 1 como exemplo
        console.log("Resposta da API:", response.data);

        const students = response.data.students;
        setClientesFiltrados(students); // Atualiza o estado com os estudantes diretamente da API
      } catch (error) {
        console.error("Erro ao carregar os estudantes:", error);
      }
    };

    loadStudents();
  }, []); // O array vazio [] garante que o efeito seja executado uma única vez após a montagem do componente

  const handlePesquisaChange = (event) => {
    setPesquisaNome(event.target.value);
  };

  const handleEditStudent = (registration) => {
    // Exemplo de redirecionamento para uma página de edição com o ID do aluno
    navigate(`/edit-student/${registration}`);
  };

  const handleAddStudent = () => {
    navigate("/studentregister");
  };

  const handleRefresh = async () => {
    try {
      const response = await fetchStudents(1);
      const students = response.data.students;
      console.log("Estudantes atualizados:", students);
      setClientesFiltrados(students); // Atualiza o estado com os dados da API
    } catch (error) {
      console.error("Erro ao atualizar os estudantes:", error);
    }
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
        <div className="d-flex">
          <div className="plus-icon" onClick={handleAddStudent} style={{ marginRight: "10px" }}>
            <i className="fas fa-plus"></i>
          </div>
          <div className="refresh-icon" onClick={handleRefresh} style={{ marginRight: "10px" }}>
            <i className="fas fa-sync-alt"></i>
          </div>
        </div>
      </div>

      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Registro</th>
            <th>Email</th>
            <th>Empresa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados
            .filter((aluno) => aluno.name && aluno.name.toLowerCase().includes(pesquisaNome.toLowerCase()))
            .map((aluno) => (
              <tr key={aluno.registration}>
                <td>{aluno.name}</td>
                <td>{aluno.registration}</td>
                <td>{aluno.email}</td>
                <td>{aluno.companyId || "Não informado"}</td>
                <td>
  <div className="edit-container">
    <div
      className="edit-icon-box"
      onClick={() => handleEditStudent(aluno.registration)}
      title="Editar"
    >
      <i className="fas fa-edit"></i>
    </div>
  </div>
</td>

              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
