import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import "../App.css"; // Estilos personalizados

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="home-container">
      {/* Imagem no topo */}
      <div className="image-header">
        <img src="../Teste.png" alt="Imagem de introdução" />
      </div>

      <header className="hero-section">
        <h1>Prepare-se para o Futuro!</h1>
        <p>
          Encontre a experiência que você precisa para alavancar sua carreira:
          seja como CLT, PJ, ou estágio remunerado ou não. A jornada para o
          sucesso começa com o primeiro passo!
        </p>
      </header>

      <section className="benefits-section">
  <h2>Por que adquirir experiência na área?</h2>
  <div className="benefits-grid">
    <div className="benefit-item">
      <h3>Desenvolvimento Profissional</h3>
      <p>
        Trabalhar ou estagiar na área permite que você desenvolva
        habilidades essenciais, além de construir uma rede de contatos
        valiosa para sua carreira.
      </p>
    </div>
    <div className="benefit-item">
      <h3>Conhecimento Prático</h3>
      <p>
        A teoria aprendida na faculdade é fundamental, mas a prática
        proporciona uma visão realista do mercado e de suas demandas.
      </p>
    </div>
    <div className="benefit-item">
      <h3>Competitividade no Mercado</h3>
      <p>
        Experiência prática torna seu perfil mais atrativo para
        empregadores e aumenta suas chances de conquistar melhores
        oportunidades.
      </p>
    </div>
    <div className="benefit-item">
      <h3>Aprendizado Contínuo</h3>
      <p>
        Estágios e empregos na área proporcionam aprendizados que vão
        além das salas de aula, ajudando você a crescer continuamente.
      </p>
    </div>

    {/* Novos benefícios */}
    <div className="benefit-item">
      <h3>Autonomia no Trabalho</h3>
      <p>
        Ao conquistar experiência prática, você ganha confiança para
        trabalhar de forma mais autônoma, contribuindo com ideias e
        soluções inovadoras para a empresa.
      </p>
    </div>
    <div className="benefit-item">
      <h3>Visibilidade no Mercado</h3>
      <p>
        Trabalhar em empresas reconhecidas e em projetos relevantes
        aumenta a visibilidade do seu perfil, o que pode atrair mais
        oportunidades e propostas de trabalho.
      </p>
    </div>
  </div>
</section>

      
      <footer className="footer">
        <p>Quer saber mais? Explore nossas vagas e dê o próximo passo na sua carreira!</p>
      </footer>
    </div>
  );
};

export default Home;
