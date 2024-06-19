import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from "jsonwebtoken"

interface AuthRequest{

email: string;
password: string;

}

class AuthUserService{

async execute({email, password}:AuthRequest){

//verifica se o email existe

const user =  await prismaClient.user.findFirst({

where:{

email:email

}

})

if(!user){

throw new Error("usuario/senha esta incorreta")

}

const passwordMatch = await compare(password, user.password);

if(!passwordMatch){

    throw new Error("usuario/senha esta incorreta")

}

//gerar um token jwt

// se deu tudo certo vamos gerar o token do usuario
const token = sign(

{

name: user.name,
email: user.email

},

process.env.jwt_secrect,{

subject: user.id,
expiresIn:'30d'//token vai espirar em 30 dias

}

)

return {

id: user.id,
name: user.name,
email: user.email,
token: token

}

}

}

export {AuthUserService};