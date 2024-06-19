import prismaClient from "../../prisma";

interface DetailRequest{

pedido_id:string;

}

class DetailPedidoService{

async execute({pedido_id}:DetailRequest){

const pedidos = await prismaClient.pedidoItem.findMany({

where:{

pedido_id: pedido_id

},
include:{

product:true,
pedido:true,

}

})

return pedidos;

}

}


export {DetailPedidoService}