import { useState, FormEvent } from "react";
import { Header } from "../../components/Header";
import Head from "next/head";
import Style from "./style.module.scss"

import { setupApiClient } from "../../service/api";
import { toast } from "react-toastify";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category(){
const [name, setName] = useState('')

async function handleRegister(event:FormEvent) {

event.preventDefault();

if(name === ''){

return ;

}

const apiClient = setupApiClient();
await apiClient.post('/category', {

name: name

});

toast.success('categoria cadastrada com sucesso')

setName('');

}

return(

<>

<Head>
<title> nova categoria - Irato.Dev</title>
</Head>

<div>
<Header/>

<main className={Style.conteiner}>

<h1>Cadastrar Categoria</h1>

<form onSubmit={handleRegister}>

<input type="text" placeholder="digite o nome da categoria"
className={Style.Ipunt} value={name} onChange={(e)=> setName(e.target.value)}/>



<button className={Style.buttonAdd} type="submit">
Cadastrar
</button>

</form>

</main>

</div>

</>

)

}

export const getServerSideProps = canSSRAuth(async(ctx)=>{

return{
props:{}
}

})