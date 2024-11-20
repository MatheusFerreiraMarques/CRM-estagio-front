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

        const companies = response.data.companies || [];
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
            <th>#</th>
            <th>Nome Corporativo</th>
            <th>Nome Fantasia</th>
            <th>Endereço</th>
            <th>Bairro</th>
            <th>CEP</th>
            <th>CNPJ</th>
            <th>Segmento</th>
            <th>Representante</th>
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
                <td>{company.address}</td>
                <td>{company.Neighborhood}</td>
                <td>{company.postalCode}</td>
                <td>{company.cnpj}</td>
                <td>{company.segment}</td>
                <td>{company.representative}</td>
                <td>
                  {/* Adicionar botões de ação, se necessário */}
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
