import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditStudent.css"; // Arquivo CSS separado para estilização

const EditStudent = () => {
  const { state: student } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: student.name,
    registration: student.registration,
    email: student.email,
    companyId: student.companyId || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.post(
        "http://localhost:3333/update-student",
        { ...formData },
        { withCredentials: true }
      );
      alert("Estudante atualizado com sucesso!");
      navigate("/students");
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza de que deseja excluir este estudante?")) {
      try {
        await axios.post(
          "http://localhost:3333/delete-student",
          { registration: formData.registration },
          { withCredentials: true }
        );
        alert("Estudante excluído com sucesso!");
        navigate("/students");
      } catch (error) {
        console.error("Erro ao excluir o estudante:", error);
      }
    }
  };

  return (
    <div className="edit-student-container">
      <div className="edit-student-box">
        <h2 className="edit-title">Editar Estudante</h2>
        <form className="edit-form">
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Registro:</label>
            <input
              type="text"
              name="registration"
              value={formData.registration}
              onChange={handleChange}
              className="form-control"
              disabled
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Empresa:</label>
            <input
              type="text"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="button-group">
          <button
            className="btn btn-save"
            title="Salvar"
            onClick={handleSave}
          >
            <i className="fas fa-save"></i>
          </button>
          <button
            className="btn btn-delete"
            title="Deletar"
            onClick={handleDelete}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
