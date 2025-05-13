import { Request, Response } from "express";
import { CreatePedidoService } from "../../services/pedidos/CreatePedidoService";

class CreatePedidoController{

async handle(req:Request, res:Response ){

const{table,name}=req.body;

const createPedidoService = new CreatePedidoService();

const pedido = await createPedidoService.execute({

table,
name,

});

return res.json(pedido)

}

}

export { CreatePedidoController }