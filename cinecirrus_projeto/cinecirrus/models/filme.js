const { DataTypes } = require('sequelize');
const sequelize = require('./database');

module.exports = sequelize.define('Filme', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  ano: { type: DataTypes.INTEGER, allowNull: false },
  genero: { type: DataTypes.STRING, allowNull: false },
  sinopse: { type: DataTypes.TEXT, allowNull: false }
});
