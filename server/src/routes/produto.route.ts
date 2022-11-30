import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';

const produtoRoute = Router();
const produto = require('../models/produtoTable')


produtoRoute.get('/produto', async(req: Request, res: Response, next: NextFunction)=>{
    const produtoList = await produto.findAll();
    res.status(StatusCodes.OK).send(produtoList)
})

produtoRoute.get('/produto/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const project = await produto.findOne({ where: { id: uuid } })
    
    if (project === null) {
        return res.status(StatusCodes.NOT_FOUND).json({
            ok: false,
            message: "Usuario não cadastrado!"
        })
    } else {
        return res.json(project)
    }
})

produtoRoute.post('/produto/cadastrar', async (req: Request, res: Response, next: NextFunction)=>{
    const newUser = req.body
    await produto.create(newUser)
    .then(() =>{
        return res.json({
            ok: true,
            message: "Usuario cadastrado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            ok: false,
            message: "Usuario não cadastrado!"
        })
    })
})

produtoRoute.put('/produto/modificar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid
    await produto.update(modifiedUser, {
        where: {
            id: uuid
          }
    })
     .then(() =>{
         return res.json({
             ok: true,
             message: "Usuario atualizado com sucesso!"
         })
     }).catch(() =>{
         return res.status(StatusCodes.NOT_FOUND).json({
             ok: false,
             message: "Usuario não atualizado!"
        })
     })
})


produtoRoute.delete('/produto/deletar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    await produto.destroy({
        where: {
            id: uuid
          }
    })
    .then(() =>{
        return res.json({
            ok: true,
            message: "Usuario deletado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            ok: true,
            message: "Usuario não deletado!"
        })
    })
})


export default produtoRoute;