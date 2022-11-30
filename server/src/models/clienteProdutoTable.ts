import {  } from 'mysql2';
const Sequelize = require('sequelize');

const database = require('./connect')
const clienteId = require('./clienteTable')
const produtoId = require('./produtoTable')

 
clienteId.belongsToMany(produtoId, { through: 'clienteProduto' });
produtoId.belongsToMany(clienteId, { through: 'clienteProduto' });

const clienteProduto = database.define('clienteProduto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    clienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: clienteId, 
          key: 'id'
        }
      },
    produtoId: {
        type: Sequelize.INTEGER,
        references: {
          model: produtoId, 
          key: 'id'
        }
      },
    quantidadeVendida: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

//clienteProduto.sync({ alter: true });

module.exports = clienteProduto;