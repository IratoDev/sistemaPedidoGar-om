import { Request, Response } from "express";
import { SendPedidoService } from "../../services/pedidos/SendPedidoService";


class SendPedidoController{

async handle(req:Request, res:Response){

const {pedido_id} = req.body;

const seadPedido = new SendPedidoService();

const pedido = await seadPedido.execute({

pedido_id

});

return res.json(pedido);

}
}

export {SendPedidoController}