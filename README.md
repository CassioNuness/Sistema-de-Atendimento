# Sistema de Atendimento

Sistema desenvolvido para cadastro e gerenciamento de solicitações de atendimento, integrado com PostgreSQL e automação utilizando n8n.

## Tecnologias

- React
- Node.js
- Express
- PostgreSQL
- N8N

## Funcionalidades

- Cadastro de solicitações
- Persistência em banco de dados
- API REST
- Modal de confirmação

## Fluxo da Automação

A cada 1 minuto o n8n executa o seguinte processo:

1. Consulta a tabela solicitacoes no PostgreSQL.
2. Verifica se existem solicitações pendentes.
3. Caso exista uma solicitação:
    * Envia uma notificação por e-mail.
    * Atualiza o status da solicitação para processada.
4. Caso não exista solicitação:
    * O fluxo é encerrado e aguarda a próxima execução.

## Fluxograma

Schedule Trigger (1 minuto)

↓

Consultar PostgreSQL

↓

Existe solicitação?

├── Sim → Enviar E-mail → Atualizar Status → Fim

└── Não → Fim

## Estrutura do Projeto

Frontend:

* React
* Formulário de abertura de solicitações

Backend:

* Node.js + Express
* API REST para cadastro de solicitações

Banco de Dados:

* PostgreSQL
* Tabela solicitacoes

Automação:

* n8n
* Processamento e notificação automática

## Status do Projeto

🚧 Em desenvolvimento

Próximas implementações:

* Envio automático de e-mails
* Controle de status das solicitações
* Dashboard administrativo
* Integração avançada com n8n
* Histórico de atendimentos