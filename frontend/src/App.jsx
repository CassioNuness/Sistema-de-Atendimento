import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    descricao: "",
  });

  const [showModal, setShowModal] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
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

        <p>
          Plataforma para abertura e gerenciamento de solicitações.
        </p>

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

          <button type="submit">
            Enviar Solicitação
          </button>
        </form>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Solicitação enviada!</h2>

            <p>
              Sua solicitação foi registrada com sucesso.
            </p>

            <button
              type="button"
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;