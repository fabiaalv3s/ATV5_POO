import { Sequelize } from 'sequelize'


 const connection = new Sequelize("atv5", "Rafael", "Root@123", {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
   })

connection.authenticate()
.then(function(){
    console.log("Conexão com banco de dados realizada com sucesso!");
}).catch(function(){
    console.log("Erro: Conexão com banco de dados");
})

module.exports = connection;