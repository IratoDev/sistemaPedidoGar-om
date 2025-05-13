import { Request, Response } from "express";
import { ListPedidoService } from "../../services/pedidos/ListPedidoService";

class ListPedidoController{

async handle(req:Request, res:Response){

const listPedidoService = new ListPedidoService();

const pedido = await listPedidoService.execute();

return res.json(pedido)

}

}

export{ListPedidoController}