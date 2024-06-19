import { Request, Response } from "express";
import { FinishPedidoService } from "../../services/pedidos/FinishPedidoService";

class FinishPedidoController{

async handle(req: Request, res:Response){

const {pedido_id} = req.body;

const finishPedidoService = new FinishPedidoService();

const pedido = await finishPedidoService.execute({
    pedido_id
})

return res.json(pedido)
}

}

export{FinishPedidoController}