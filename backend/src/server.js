const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do Sistema de Atendimento está rodando!");
});

// Listar solicitações
app.get("/solicitacoes", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM solicitacoes
      ORDER BY data_criacao DESC
    `);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar solicitações:", error);

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

// Cadastrar solicitação
app.post("/solicitacoes", async (req, res) => {
  try {
    const { nome, email, assunto, descricao } = req.body;

    const result = await pool.query(
      `
      INSERT INTO solicitacoes
      (nome, email, assunto, descricao)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [nome, email, assunto, descricao]
    );

    console.log("Nova solicitação registrada:", result.rows[0]);

    return res.status(201).json({
      message: "Solicitação registrada com sucesso!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao registrar solicitação:", error);

    return res.status(500).json({
      error: "Erro ao salvar solicitação",
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});