import express, { Request, Response, NextFunction } from 'express'
import statusRouter from './routes/status.route';
import servicoRoute from './routes/servico.route'
import clienteRoute from './routes/cliente.route';
import produtoRoute from './routes/produto.route';
import clienteProdutoRoute from './routes/clienteProduto.route';
import clienteServicoRoute from './routes/clienteServico.route';
import cors from 'cors';
const connection = require('./models/connect')



const app = express()

app.use(cors())

 // configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuração de rotas
app.use(servicoRoute);
app.use(clienteRoute);
app.use(clienteServicoRoute)
app.use(produtoRoute);
app.use(clienteProdutoRoute)
app.use(statusRouter);


// inicialização do server
app.listen(3001,()=>{
    console.log("Server rodando na porta 3001");
    
})