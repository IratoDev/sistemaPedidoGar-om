import prismaClient from "../../prisma";

interface PedidoRequest{

table:number;
name: string;

}

class CreatePedidoService{

async execute({table, name}: PedidoRequest){

const pedido = await prismaClient.pedido.create({

    data:{

        table: table,
        name: name
        
        }

})

return pedido;

}

}

export{ CreatePedidoService}