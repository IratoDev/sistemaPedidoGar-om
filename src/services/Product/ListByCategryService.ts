import prismaClient from "../../prisma";

interface ProducRequest{

category_id:string;

}

class ListByCategoryService{

async execute({category_id}:ProducRequest){

//id-bebidas

const finfByCategory = await prismaClient.product.findMany({

where:{
category_id:category_id

}

})
 
return finfByCategory;

}

}

export { ListByCategoryService}