import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importando js-cookie

const Alunos = () => {
  const navigate = useNavigate();
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [pesquisaNome, setPesquisaNome] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    numero: "",
    empresa: "",
    trabalhando: "Nenhum",
    registration: "",
  });
  const [isEmpresaDisabled, setIsEmpresaDisabled] = useState(false);

  // Verificação de login ao carregar o componente
  useEffect(() => {
    const token = Cookies.get("authToken"); // Agora buscando o token nos cookies
    if (!token) {
      navigate("/login"); // Redireciona para a página de login caso não tenha o token
    }
  }, [navigate]);
  
  // Funções de manipulação de estado e de modal
  const handlePesquisaChange = (event) => {
    setPesquisaNome(event.target.value);
  };

  const handleModalInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = () => {
    // Lógica para salvar os dados
    setIsModalOpen(false);
  };

  const handleAddStudent = () => {
    setIsModalOpen(true);
  };

  // Aqui você pode implementar a função handleEdit, que estava faltando no seu código
  const handleEdit = (cliente) => {
    // Lógica para editar o aluno, por exemplo, abrir o modal com os dados do aluno
    setFormData({
      nome: cliente.nome,
      numero: cliente.numero,
      empresa: cliente.empresa,
      trabalhando: cliente.trabalhando,
      registration: cliente.registration,
    });
    setIsModalOpen(true);
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
        <button className="btn btn-primary my-2" onClick={handleAddStudent}>Adicionar Estudante</button>
      </div>

      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Trabalhando</th>
            <th>Empresa</th>
            <th>Registro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.trabalhando}</td>
              <td>{cliente.empresa || 'N/A'}</td>
              <td>{cliente.registration}</td>
              <td>
                <button onClick={() => handleEdit(cliente)} className="btn btn-sm btn-primary">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para adicionar aluno */}
      {isModalOpen && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Novo Estudante</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" id="nome" name="nome" className="form-control" value={formData.nome} onChange={handleModalInputChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="numero" className="form-label">Número</label>
                    <input type="text" id="numero" name="numero" className="form-control" value={formData.numero} onChange={handleModalInputChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="empresa" className="form-label">Empresa</label>
                    <input type="text" id="empresa" name="empresa" className="form-control" value={formData.empresa} onChange={handleModalInputChange} disabled={isEmpresaDisabled} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="trabalhando" className="form-label">Trabalhando</label>
                    <select id="trabalhando" name="trabalhando" className="form-control" value={formData.trabalhando} onChange={handleModalInputChange}>
                      <option value="Nenhum">Nenhum</option>
                      <option value="CLT">CLT</option>
                      <option value="PJ">PJ</option>
                      <option value="Estágio">Estágio</option>
                      <option value="Estágio FPM">Estágio FPM</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registration" className="form-label">Registro</label>
                    <input type="text" id="registration" name="registration" className="form-control" value={formData.registration} onChange={handleModalInputChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Fechar</button>
                <button type="button" className="btn btn-primary" onClick={handleModalSave}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alunos;
