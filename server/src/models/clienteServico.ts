import {  } from 'mysql2';
const Sequelize = require('sequelize');

const database = require('./connect')
const clienteId = require('./clienteTable')
const servicoId = require('./servicoTable')

 
clienteId.belongsToMany(servicoId, { through: 'clienteServico' });
servicoId.belongsToMany(clienteId, { through: 'clienteServico' });

const clienteServico = database.define('clienteServico', {
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
    servicoId: {
        type: Sequelize.INTEGER,
        references: {
          model: servicoId, 
          key: 'id'
        }
      },
    quantidadeVendida: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

//clienteServico.sync({ alter: true });

module.exports = clienteServico;