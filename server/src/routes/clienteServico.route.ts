import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';

const clienteServicoRoute = Router();
const clienteServico = require('../models/clienteServico')



clienteServicoRoute.get('/clienteServico', async(req: Request, res: Response, next: NextFunction)=>{
    const clienteServicoList = await clienteServico.findAll();
    res.status(StatusCodes.OK).send(clienteServicoList)
})

clienteServicoRoute.get('/clienteServico/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const project = await clienteServico.findAll({ where: { clienteId: uuid } })
    
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

clienteServicoRoute.post('/clienteServico/cadastrar', async (req: Request, res: Response, next: NextFunction)=>{
    const newclienteServico = req.body
    await clienteServico.create(newclienteServico)
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

clienteServicoRoute.put('/clienteServico/modificar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const modifiedclienteServico = req.body;
    modifiedclienteServico.uuid = uuid
    await clienteServico.update(modifiedclienteServico, {
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


clienteServicoRoute.delete('/clienteServico/deletar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    await clienteServico.destroy({
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


export default clienteServicoRoute;