import { Request, Response } from "express";
import { DetailPedidoService } from "../../services/pedidos/DetailPedidoService";

class DetailPedidoController{

async handle(req: Request, res:Response){

const pedido_id = req.query.pedido_id as string;

const detailPedidoService = new DetailPedidoService();

const pedido = await detailPedidoService.execute({

pedido_id

})

return res.json(pedido);

}


}

export {DetailPedidoController}