import axios, {AxiosError} from "axios";
import { parseCookies } from "nookies";

//erros
import { AuthTokenError } from "./errors/AuthTokenError";

//função loginout

import { signOut } from "../contexts/AuthContext";

export function setupApiClient(ctx = undefined){

let cookies = parseCookies(ctx);//pegar nosso cooke

const api = axios.create({

baseURL:'http://localhost:3333',
headers:{
Authorization: `Bearer ${cookies['@nextauth.token']}`//se tiver algum cooke que tiver o nosso beares loga se não desloga
}

})

api.interceptors.response.use(response =>{

return response;

},(error:AxiosError)=>{

if(error.response.status === 401){
//qualquer erro 401 (não autorizado) devemos deslogar o usuario

if(typeof window !== undefined){

//chamar a função para deslogar o usuario
signOut();

}else{ 
return Promise.reject(new AuthTokenError())

}

}


return Promise.reject(error);


})

return api;

}