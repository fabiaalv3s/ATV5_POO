import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';

const clienteProdutoRoute = Router();
const clienteProduto = require('../models/clienteProdutoTable')



clienteProdutoRoute.get('/clienteProduto', async(req: Request, res: Response, next: NextFunction)=>{
    const clienteProdutoList = await clienteProduto.findAll();
    res.status(StatusCodes.OK).send(clienteProdutoList)
})

clienteProdutoRoute.get('/clienteProduto/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const project = await clienteProduto.findAll({ where: { clienteId: uuid } })
    
    if (project === null) {
        return res.status(StatusCodes.NOT_FOUND).json({
            ok: false,
            message: "Relação não encontrada!"
        })
    } else {
        let arrayFlap:any =  []
        project.forEach(flap => {
            arrayFlap.push(flap.flapId)
        });
        return res.json(arrayFlap)
    }
})

clienteProdutoRoute.post('/clienteProduto/cadastrar', async (req: Request, res: Response, next: NextFunction)=>{
    const newclienteProduto = req.body
    await clienteProduto.create(newclienteProduto)
    .then((test) =>{
        return res.json({
            id: test.id,
            ok: true,
            message: "Relação cadastrada com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            id: -1,
            ok: false,
            message: "Relação não cadastrada!"
        })
    })
})

clienteProdutoRoute.put('/clienteProduto/modificar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const modifiedclienteProduto = req.body;
    modifiedclienteProduto.uuid = uuid
    await clienteProduto.update(modifiedclienteProduto, {
        where: {
            id: uuid
          }
    })
     .then(() =>{
         return res.json({
             ok: true,
             message: "Relação atualizada com sucesso!"
         })
     }).catch(() =>{
         return res.status(StatusCodes.NOT_FOUND).json({
             ok: false,
             message: "Relação não atualizada!"
        })
     })
})


clienteProdutoRoute.delete('/clienteProduto/deletar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    await clienteProduto.destroy({
        where: {
            id: uuid
          }
    })
    .then(() =>{
        return res.json({
            ok: true,
            message: "Relação deletada com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            ok: false,
            message: "Relação não deletada!"
        })
    })
})


export default clienteProdutoRoute;