import prismaClient from "../../prisma";

interface PedidoRequest{

pedido_id:string

}

class SendPedidoService{

async execute({pedido_id}:PedidoRequest){

const pedido = await prismaClient.pedido.update({

where:{

id:pedido_id

},
data:{

draft:false

}

})

return pedido;

}

}

export{SendPedidoService}