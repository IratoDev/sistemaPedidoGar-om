import { Request, Response } from "express";
import { RemovePedidoServce } from "../../services/pedidos/RemovePedidoService";

class RemovePedidoController{

async handle(req: Request, res:Response){

const pedido_id = req.query.pedido_id as string;

const removePedido = new RemovePedidoServce();

const pedido = await removePedido.execute({

    pedido_id

});

return res.json(pedido);

}

}

export {RemovePedidoController}