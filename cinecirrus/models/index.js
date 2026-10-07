// Importa os tipos de dados do Sequelize.
const { DataTypes } = require('sequelize');
// Importa a conexão criada no arquivo database.js.
const sequelize = require('./database');

// Define a tabela de artistas.
const Artista = sequelize.define('Artista', {
  // Guarda o nome do artista.
  nome: { type: DataTypes.STRING, allowNull: false },
  // Guarda o ano de nascimento.
  nascimento: { type: DataTypes.INTEGER, allowNull: false },
  // Guarda o país do artista.
  pais: { type: DataTypes.STRING, allowNull: false },
  // Guarda a biografia.
  biografia: { type: DataTypes.TEXT, allowNull: false }
});

// Define a tabela de fichas técnicas.
const FichaTecnica = sequelize.define('FichaTecnica', {
  // Guarda o nome do filme relacionado.
  filme: { type: DataTypes.STRING, allowNull: false },
  // Guarda a duração do filme.
  duracao: { type: DataTypes.STRING, allowNull: false },
  // Guarda o responsável pela fotografia.
  fotografia: { type: DataTypes.STRING, allowNull: false },
  // Guarda o responsável pela trilha sonora.
  trilhaSonora: { type: DataTypes.STRING, allowNull: false }
});

// Define a tabela de diretores.
const Diretor = sequelize.define('Diretor', {
  // Guarda o nome do diretor.
  nome: { type: DataTypes.STRING, allowNull: false },
  // Guarda o país do diretor.
  pais: { type: DataTypes.STRING, allowNull: false },
  // Guarda uma obra principal.
  obraPrincipal: { type: DataTypes.STRING, allowNull: false },
  // Guarda uma descrição do estilo.
  estilo: { type: DataTypes.TEXT, allowNull: false }
});

// Exporta a conexão e os três modelos para o server.js.
module.exports = { sequelize, Artista, FichaTecnica, Diretor };
