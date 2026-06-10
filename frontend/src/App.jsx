import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    descricao: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function buscarSolicitacoes() {
    try {
      const response = await fetch("http://localhost:3000/solicitacoes");
      const data = await response.json();

      setSolicitacoes(data);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
    }
  }

  useEffect(() => {
    buscarSolicitacoes();
  }, []);

  function formatarData(data) {
    const dataFormatada = new Date(data);

    return (
      dataFormatada.toLocaleDateString("pt-BR") +
      " às " +
      dataFormatada.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/solicitacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro da API:", data);
        return;
      }

      console.log("Resposta da API:", data);

      setShowModal(true);

      setFormData({
        nome: "",
        email: "",
        assunto: "",
        descricao: "",
      });

      buscarSolicitacoes();
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Sistema de Atendimento</h1>

        <p>Plataforma para abertura e gerenciamento de solicitações.</p>

        <form onSubmit={handleSubmit}>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite seu nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <label>E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Assunto</label>
          <input
            type="text"
            name="assunto"
            placeholder="Ex: Suporte técnico"
            value={formData.assunto}
            onChange={handleChange}
            required
          />

          <label>Descrição</label>
          <textarea
            rows="5"
            name="descricao"
            placeholder="Descreva sua solicitação"
            value={formData.descricao}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Enviar Solicitação</button>
        </form>
      </section>

      <section className="card chamados-card">
        <h2>Chamados</h2>

        {solicitacoes.length === 0 ? (
          <p>Nenhuma solicitação cadastrada.</p>
        ) : (
          <div className="chamados-lista">
            {solicitacoes.map((solicitacao) => (
              <div className="chamado-item" key={solicitacao.id}>
                <div className="chamado-topo">
                  <h3>#{solicitacao.id} - {solicitacao.assunto}</h3>
                  <span className="status">{solicitacao.status}</span>
                </div>

                <p>{solicitacao.descricao}</p>

                <div className="chamado-info">
                  <span>Solicitante: {solicitacao.nome}</span>
                  <span>Prioridade: {solicitacao.prioridade}</span>
                  <span>Criado em: {formatarData(solicitacao.data_criacao)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Solicitação enviada!</h2>

            <p>Sua solicitação foi registrada com sucesso.</p>

            <button type="button" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;