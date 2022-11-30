import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';

const servicoRoute = Router();
const servico = require('../models/servicoTable')



servicoRoute.get('/servico', async(req: Request, res: Response, next: NextFunction)=>{
    const servicoList = await servico.findAll();
    res.status(StatusCodes.OK).send(servicoList)
})

servicoRoute.get('/servico/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const project = await servico.findOne({ where: { id: uuid } })
    
    if (project === null) {
        return res.status(StatusCodes.NOT_FOUND).json({
            ok: false,
            message: "Serviço não cadastrado!"
        })
    } else {
        return res.json(project)
    }
})

servicoRoute.post('/servico/cadastrar', async (req: Request, res: Response, next: NextFunction)=>{
    const newservico = req.body
    await servico.create(newservico)
    .then(() =>{
        return res.json({
            // id: newservico.id,
            ok: true,
            mensagem: "Serviço cadastrado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            ok: false,
            mensagem: "Serviço não cadastrado!"
        })
    })
})

servicoRoute.put('/servico/modificar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const modifiedservico = req.body;
    modifiedservico.uuid = uuid
    await servico.update(modifiedservico, {
        where: {
            id: uuid
          }
    })
     .then(() =>{
         return res.json({
             ok: true,
             message: "Serviço atualizado com sucesso!"
         })
     }).catch(() =>{
         return res.status(StatusCodes.NOT_FOUND).json({
             ok: false,
             message: "Serviço não atualizado!"
        })
     })
})


servicoRoute.delete('/servico/deletar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    await servico.destroy({
        where: {
            id: uuid
          }
    })
    .then(() =>{
        return res.json({
            ok: true,
            message: "Serviço deletado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            ok: false,
            message: "Serviço não deletado!"
        })
    })
})


export default servicoRoute;