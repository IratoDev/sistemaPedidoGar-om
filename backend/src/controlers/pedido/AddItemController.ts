import { Request, Response } from "express";
import { AddItemService } from "../../services/pedidos/AddItemService";

class AddItemController{

async handle(req:Request, res:Response){

const{pedido_id, product_id, amount} = req.body;

const additem = new AddItemService();

const pedido = await additem.execute({


pedido_id,
product_id,
amount

})

return res.json(pedido);

}

}

export {AddItemController}