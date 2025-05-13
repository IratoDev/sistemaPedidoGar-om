import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import  Router from "next/router";
import { api } from "../service/apiClient";

import { toast } from "react-toastify";


type AuthContextData = {

user:UserProps;
isAuthenticated:boolean;
signIn:(credential: SingInProps) => Promise<void>;
signOut:() => void;
signUp:(credential:SingUpProps) => Promise<void>;

}

type UserProps={ //declarado o que vamos receber

id:string;
name:string;
email:string;

}

type SingInProps = {

email:string;
password:string;

}

type SingUpProps = {

name:string;
email:string;
password:string;
    
}

type AuthProviderProps = {

children:ReactNode;

}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){//função para deslogar

try{

destroyCookie(undefined, '@nextauth.token')
Router.push('/')

}catch{

console.log('erro ao deslogar')

}

}


export function AuthProvider({children}:AuthProviderProps){
const[ user, setUser] = useState<UserProps>()
const isAuthenticated = !!user;

useEffect(()=>{

//tentat pegar algo no cookie

const{'@nextauth.token':token} = parseCookies();

if(token){

api.get('/me').then(response =>{

const { id, name, email} = response.data;


setUser({

id,
name,
email

})

})

.catch(()=>{

//se der erro deslogue o user 
signOut();
})

}

}, [])


async function signIn({email,password}:SingInProps){//função de cadastro

try {
    
const response = await api.post('/session',{

email,
password

})

console.log(response.data);
const {id, name, token} = response.data;
setCookie(undefined, '@nextauth.token', response.data.token,{

maxAge: 60 * 60 * 24 * 30,
path:"/"//quais caminhos terão acesso ao cooki

})

setUser({
id,
name,
email,
})

//passar para as proximas requisiçoes o nosso token
api.defaults.headers['Authorization'] = `Bearer${token}`

toast.success('Logado com sucesso!')

//redirenciona o user para \deshborad
Router.push('/deshboard')

} catch(err){

    toast.error("Erro ao acessar!")
    console.log('erro ao acessar',err)  
}

}

async function signUp({name,email,password}:SingUpProps) {//função de login
   
try {

const response = await api.post('/users',{

name,
email,
password

})

console.log("cadastrado com sucesso");

toast.success('Logado com sucesso!')

Router.push('/')
    
}catch (err){

toast.error('Erro ao cadastrar')
console.log("erro ao cadastrar")

}

}

return (

<AuthContext.Provider value={{user, isAuthenticated, signIn,signOut,signUp}}>

{children}

</AuthContext.Provider>

)

}