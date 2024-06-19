import prismaClient from "../../prisma";

interface PedidoRequest{

pedido_id:string;

}

class FinishPedidoService{

async execute({pedido_id}:PedidoRequest){

const pedido = await prismaClient.pedido.update({

where:{

id: pedido_id

},

data:{

status:true,

}

})

return pedido;

}

}

export{FinishPedidoService}