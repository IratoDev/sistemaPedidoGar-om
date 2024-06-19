
import  prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{

name:string;
email:string;
password:string;

}


class CreateUserService {

async execute({name, email, password}:UserRequest){

//verifica se ele enviou um email
if(!email){
    throw new Error("email incorreto")
}

//verifica se esse email já esta cadastrado
const userAlreadyExists = await prismaClient.user.findFirst({

    where:{

    email:email

    }

})

if(userAlreadyExists){

throw new Error("email já cadastrado")

}

const passwordHash = await hash(password, 8)

const user = await prismaClient.user.create({

data:{

name:name,
email:email,
password: passwordHash,

},

//responsavel por esconder a senha e outras informaçoes, aqui voce define os elementos que voce quer que apareça na requisição 

select:{

id:true,
email:true,
name:true,

}

})

return user;

}

}

export{CreateUserService}