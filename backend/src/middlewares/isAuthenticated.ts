import {Request, Response, NextFunction} from "express"
import { verify } from "jsonwebtoken";


interface payload{

sub: string;

}

export function isAuthenticated(

req: Request,
res: Response,
next: NextFunction

){

//receber token

const authToken = req.headers.authorization;

if(!authToken){

return res.status(401).end();

}

const [,token] = authToken.split(" ");


try{
//validar token
const { sub } = verify(

token,
process.env.jwt_secrect
) as payload;
//recuperar o id do token e colocar dentro de uma variavel user_id dento do req
req.user_id = sub;

return next();

}catch(err){
    return res.status(401).end();
}

}