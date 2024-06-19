import prismaClient from "../../prisma";

interface ItemRequest{

pedido_id:string;
product_id:string;
amount:number;

}


class AddItemService{

async execute({ pedido_id, product_id, amount}:ItemRequest){

    const pedido = await prismaClient.pedidoItem.create({

        data:{
        
        pedido_id: pedido_id,
        product_id: product_id,
        amount: amount
        
        }
        
        
        })

return pedido;

}

}

export{AddItemService}