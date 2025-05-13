import prismaClient from "../../prisma";


interface ItemRequest{

item_id:string;

}


class RemoveItemService{

async execute({item_id}:ItemRequest){

const pedido = await prismaClient.pedidoItem.delete({

where:{

id: item_id

}

})

return pedido;

}

}

export {RemoveItemService}