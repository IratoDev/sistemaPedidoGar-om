import prismaClient from "../../prisma";


class ListPedidoService{

async execute(){

const pedidos = await prismaClient.pedido.findMany({

where:{

draft:false,
status:false,

},

orderBy:{

create_at:"desc"

}

})

return pedidos;

}

}

export{ ListPedidoService}