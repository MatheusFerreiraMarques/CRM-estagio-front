import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCompanies } from "../services/fetch.companies"; // Função de busca de empresas
import '../styles/Companies.css';

const Companies = () => {
  const navigate = useNavigate();
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [pesquisaNome, setPesquisaNome] = useState("");

  // Carregar empresas ao montar o componente
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const response = await fetchCompanies(1); // Passando a página 1 como exemplo
        console.log("Resposta da API:", response.data);

        const companies = response.data.companys || [];
        setClientesFiltrados(companies); // Atualiza o estado com as empresas diretamente da API
      } catch (error) {
        console.error("Erro ao carregar as empresas:", error);
      }
    };

    loadCompanies();
  }, []);

  const handlePesquisaChange = (event) => {
    setPesquisaNome(event.target.value);
  };

  const handleAddCompany = () => {
    navigate("/companyregister");
  };

  const handleRefresh = async () => {
    try {
      const response = await fetchCompanies(1);
      const companies = response.data.companies || [];
      console.log("Empresas atualizadas:", companies);
      setClientesFiltrados(companies);
    } catch (error) {
      console.error("Erro ao atualizar as empresas:", error);
    }
  };

  const handleEditCompany = (cnpj) => {
    // Exemplo de redirecionamento para uma página de edição com o nome corporativo
    navigate(`/editcompany/${cnpj}`);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <input
          type="text"
          value={pesquisaNome}
          onChange={handlePesquisaChange}
          className="form-control"
          placeholder="Buscar empresa pelo nome..."
        />
        <div className="d-flex">
          <div className="plus-icon" onClick={handleAddCompany} style={{ marginRight: "10px" }}>
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
            <th>Nome Corporativo</th>
            <th>Nome Fantasia</th>
            <th>CNPJ</th>
            <th>Segmento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados
            .filter(company => company.corporateName && company.corporateName.toLowerCase().includes(pesquisaNome.toLowerCase()))
            .map(company => (
              <tr key={company.corporateName}>
                <td>{company.corporateName}</td>
                <td>{company.tradeName}</td>
                <td>{company.cnpj}</td>
                <td>{company.segment}</td>
                <td>
                  <div className="edit-container">
                    <div
                      className="edit-icon-box"
                      onClick={() => handleEditCompany(company.cnpj)}
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Companies;
