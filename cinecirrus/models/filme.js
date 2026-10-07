// Importa os tipos de dados disponíveis no Sequelize.
const { DataTypes } = require('sequelize');
// Importa a conexão com o banco SQLite.
const sequelize = require('./database');

// Cria o modelo Filme, que representa uma tabela no banco.
module.exports = sequelize.define('Filme', {
  // Campo obrigatório para armazenar o título.
  titulo: { type: DataTypes.STRING, allowNull: false },
  // Campo obrigatório para armazenar o ano como número inteiro.
  ano: { type: DataTypes.INTEGER, allowNull: false },
  // Campo obrigatório para armazenar o gênero.
  genero: { type: DataTypes.STRING, allowNull: false },
  // Campo obrigatório para armazenar uma sinopse maior.
  sinopse: { type: DataTypes.TEXT, allowNull: false }
});
