// Importa a classe Sequelize, que faz a comunicação com o banco.
const { Sequelize } = require('sequelize');

// Cria a conexão usando SQLite, um banco que fica em um arquivo local.
const sequelize = new Sequelize({
  // Escolhe o tipo de banco que será usado.
  dialect: 'sqlite',
  // Define o caminho do arquivo que armazenará os dados.
  storage: 'data/cinecirrus.sqlite',
  // Evita mostrar comandos SQL no terminal durante a execução.
  logging: false
});

// Exporta a conexão para os modelos e para o servidor.
module.exports = sequelize;
