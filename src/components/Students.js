import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStudents } from "../services/fetch.students";  // A função de busca de alunos
import '../styles/Students.css';

const Students = () => {
  const navigate = useNavigate();
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [pesquisaNome, setPesquisaNome] = useState("");

  // Carregar estudantes ao montar o componente
  useEffect(() => {
    const loadStudents = async () => {
      const storedStudents = localStorage.getItem("students");

      if (storedStudents) {
        // Se os alunos já estão no localStorage, carrega eles diretamente
        setClientesFiltrados(JSON.parse(storedStudents));
      } else {
        try {
          const response = await fetchStudents(1);  // Passando a página 1 como exemplo
          console.log("Resposta da API:", response.data);  // Verifique o que está sendo retornado
          const students = response.data.students;
          
          // Armazenar os alunos no localStorage
          localStorage.setItem("students", JSON.stringify(students));
          
          setClientesFiltrados(students);  // Atualiza o estado com os estudantes
        } catch (error) {
          console.error("Erro ao carregar os estudantes:", error);
        }
      }
    };

    loadStudents();
  }, []); // O array vazio [] garante que o efeito seja executado uma única vez após a montagem do componente

  const handlePesquisaChange = (event) => {
    setPesquisaNome(event.target.value);
  };

  const handleAddStudent = () => {
    // Redireciona para a página de cadastro de aluno
    navigate("/alunosregister");
  };

  const handleRefresh = () => {
    const storedMessage = localStorage.getItem("message");

    if (storedMessage) {
      // Se houver uma mensagem no localStorage, faça o refresh
      console.log("Mensagem encontrada no localStorage. Realizando o refresh...");

      // Apagar os estudantes do localStorage
      localStorage.removeItem("students");

      // Recarregar os estudantes da API após apagar os dados do localStorage
      fetchStudents(1).then(response => {
        const students = response.data.students;
        setClientesFiltrados(students);
        localStorage.setItem("students", JSON.stringify(students)); // Atualiza o localStorage com novos alunos
      }).catch(error => {
        console.error("Erro ao atualizar os estudantes:", error);
      });
    } else {
      // Caso não exista a mensagem, avisa o usuário que o refresh não será feito
      console.log("Nenhuma mensagem encontrada no localStorage. O refresh não será realizado.");
    }
  };

  const updateLocalStorageAfterAddingStudent = (newStudent) => {
    // Verifica se já existem estudantes no localStorage
    const storedStudents = localStorage.getItem("students");
    let updatedStudents = [];

    if (storedStudents) {
      updatedStudents = JSON.parse(storedStudents);  // Se existirem estudantes no localStorage
    }

    // Adiciona o novo aluno à lista
    updatedStudents.push(newStudent);

    // Atualiza o localStorage com a nova lista de alunos
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    // Atualiza o estado da lista de alunos
    setClientesFiltrados(updatedStudents);
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
            <i className="fas fa-sync-alt"></i> {/* Ícone de refresh */}
          </div>
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
          {clientesFiltrados
            .filter(aluno => aluno.name && aluno.name.toLowerCase().includes(pesquisaNome.toLowerCase()))
            .map(aluno => (
              <tr key={aluno.registration}>
                <td>{aluno.registration}</td>
                <td>{aluno.name}</td>
                <td>{aluno.email}</td>
                <td>{aluno.registration}</td>
                <td>
                  {/* Botão de ação se necessário */}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Students;
