import {  } from 'mysql2';
const Sequelize = require('sequelize');

const database = require('./connect')

 
const produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

produto.sync({ alter: true });

module.exports = produto;
