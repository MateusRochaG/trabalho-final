const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Animal = sequelize.define('Animal', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  raca: {
    type: DataTypes.STRING,
  },
  idade: {
    type: DataTypes.INTEGER,
  },
  data_cadastro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'animais',
  freezeTableName: true,
  timestamps: true,
});

module.exports = Animal;
