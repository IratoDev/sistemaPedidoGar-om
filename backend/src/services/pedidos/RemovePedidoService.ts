
import prismaClient from "../../prisma";

interface PedisoRequest{

pedido_id:string;

}


class RemovePedidoServce{

async execute({pedido_id}:PedisoRequest){

const pedido = await prismaClient.pedido.delete({

where:{

id: pedido_id,

}

})

return pedido;

}

}

export {RemovePedidoServce}