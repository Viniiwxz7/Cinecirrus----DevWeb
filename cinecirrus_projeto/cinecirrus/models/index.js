const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Artista = sequelize.define('Artista', {
  nome: { type: DataTypes.STRING, allowNull: false },
  nascimento: { type: DataTypes.INTEGER, allowNull: false },
  pais: { type: DataTypes.STRING, allowNull: false },
  biografia: { type: DataTypes.TEXT, allowNull: false }
});

const FichaTecnica = sequelize.define('FichaTecnica', {
  filme: { type: DataTypes.STRING, allowNull: false },
  duracao: { type: DataTypes.STRING, allowNull: false },
  fotografia: { type: DataTypes.STRING, allowNull: false },
  trilhaSonora: { type: DataTypes.STRING, allowNull: false }
});

const Diretor = sequelize.define('Diretor', {
  nome: { type: DataTypes.STRING, allowNull: false },
  pais: { type: DataTypes.STRING, allowNull: false },
  obraPrincipal: { type: DataTypes.STRING, allowNull: false },
  estilo: { type: DataTypes.TEXT, allowNull: false }
});

module.exports = { sequelize, Artista, FichaTecnica, Diretor };
