const { DataTypes } = require('sequelize');
const { Sequelize, sequelize } = require('./db');


const Veterinario = sequelize.define('Veterinario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especialidade: {
    type: DataTypes.STRING,
  },
  telefone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  data_contratacao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Veterinario;
