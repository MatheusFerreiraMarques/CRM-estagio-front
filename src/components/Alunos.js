import React, { useState } from 'react';
import '../App.css';

const Tabelas = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'Matheus', numero: '40028922', empresa: 'chatPro', trabalhando: 'Estágio' },
    { id: 2, nome: 'Jhonata', numero: '40028922', empresa: 'chatPro', trabalhando: 'CLT' },
    { id: 3, nome: 'Pablo', numero: '40028922', empresa: 'Empresa A', trabalhando: 'Estágio FPM' },
    { id: 4, nome: 'Fulano', numero: '40028922', empresa: 'Empresa B', trabalhando: 'PJ' },
    { id: 5, nome: 'Ciclano', numero: '40028922', empresa: '', trabalhando: 'Nenhum' },
  ]);

  const [editandoCliente, setEditandoCliente] = useState(null);
  const [formData, setFormData] = useState({ nome: '', numero: '', empresa: '', trabalhando: '' });
  const [filtroTrabalho, setFiltroTrabalho] = useState('');
  const [pesquisaNome, setPesquisaNome] = useState('');
  const [isEmpresaDisabled, setIsEmpresaDisabled] = useState(false);

  const getTrabalhoClass = (status) => {
    return status === 'Nenhum' ? 'text-danger' : 'text-success';
  };

  const handleEdit = (cliente) => {
    setEditandoCliente(cliente.id);
    setFormData(cliente);
    setIsEmpresaDisabled(cliente.trabalhando === 'Nenhum');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Se o campo 'trabalhando' é alterado para 'Nenhum', limpa o campo 'empresa'
    if (name === 'trabalhando' && value === 'Nenhum') {
      setFormData(prev => ({ ...prev, [name]: value, empresa: '' }));
      setIsEmpresaDisabled(true);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      setIsEmpresaDisabled(value === 'Nenhum');
    }
  };  

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));

  // Limpa o campo "empresa" se o cliente não estiver trabalhando
  if (name === 'trabalhando' && value === 'Não') {
    setFormData(prev => ({ ...prev, empresa: '' }));
  }
};


  const handleSave = () => {
    const updatedClientes = clientes.map(cliente =>
      cliente.id === editandoCliente ? { ...cliente, ...formData } : cliente
    );
    setClientes(updatedClientes);
    setEditandoCliente(null);
  };

  const handleCancel = () => {
    setEditandoCliente(null);
  };

  const handleFiltroChange = (e) => {
    setFiltroTrabalho(e.target.value);
  };

  const handlePesquisaChange = (e) => {
    setPesquisaNome(e.target.value);
  };

  const clientesFiltrados = clientes.filter(cliente => {
    const nomeMatch = cliente.nome.toLowerCase().includes(pesquisaNome.toLowerCase());
    const trabalhoMatch = filtroTrabalho ? cliente.trabalhando === filtroTrabalho : true;
    return nomeMatch && trabalhoMatch;
  });

  return (
    <div className="table-responsive my-4">
      {!editandoCliente && (
        <div className="mb-3">
          <div className="d-flex align-items-center">

          <select value={filtroTrabalho} onChange={handleFiltroChange} className="form-control d-inline w-auto me-2">
            <option value="" className="select-todos">Todos</option>
            <option value="Nenhum" className="select-desempregado">Desempregado</option>
            <option value="CLT">CLT</option>
            <option value="PJ">PJ</option>
            <option value="Estágio">Estágio</option>
            <option value="Estágio FPM">Estágio FPM</option>
          </select>

            <input 
              type="text" 
              placeholder="Pesquisar por nome" 
              value={pesquisaNome} 
              onChange={handlePesquisaChange} 
              className="form-control" 
            />
          </div>
        </div>
      )}

      {editandoCliente ? (
        <div className="edit-form">
          <h4>Editar Cliente</h4>
          <div className="mb-3">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Número:</label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Empresa:</label>
            <input
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={handleInputChange}
              className="form-control"
              disabled={isEmpresaDisabled}
            />
          </div>
          <div className="mb-3">
            <label>Trabalhando:</label>
            <select
              name="trabalhando"
              value={formData.trabalhando}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="CLT">CLT</option>
              <option value="PJ">PJ</option>
              <option value="Estágio">Estágio</option>
              <option value="Estágio FPM">Estágio FPM</option>
              <option value="Nenhum">Nenhum</option>
            </select>
          </div>
          <div className="button-group">
            <button className="btn btn-outline-primary me-2" onClick={handleSave}>Salvar</button>
            <button className="btn btn-outline-secondary" onClick={handleCancel}>Voltar</button>
          </div>
        </div>
      ) : (
        <table className="table table-hover table-striped align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Número</th>
              <th scope="col">Empresa</th>
              <th scope="col">Trabalhando</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.numero}</td>
                <td>{cliente.empresa}</td>
                <td className={getTrabalhoClass(cliente.trabalhando)}>{cliente.trabalhando}</td>
                <td>
                  <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(cliente)}>Editar</button>
                  <button className="btn btn-outline-danger btn-sm">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tabelas;
