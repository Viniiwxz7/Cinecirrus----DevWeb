const { Sequelize } = require('sequelize');

// O SQLite salva os dados em um arquivo local, sem precisar instalar outro banco.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/cinecirrus.sqlite',
  logging: false
});

module.exports = sequelize;
