const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('vendas', 'postgres', 'ronaldinhoE10', {
  dialect: 'postgres',
  host: 'localhost'
});

module.exports = sequelize;
