import { useState, useEffect } from "react"
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import Style from "./style.module.scss"
import { setupApiClient } from "../../service/api"

import {FiRefreshCcw} from 'react-icons/fi'
import Modal from 'react-modal'
import { ModalOrder } from "../../components/ModalOrder"

//components
import { Header } from "../../components/Header";

type OrderProps = {

id:string;
table:string | number;
status:boolean;
draft:boolean;
name:string | null;

}


interface HomeProps{

orders:OrderProps[];

}

export type OrderItemProps = {

id:string;
amount:number;
pedido_id:string;
product_id:string;
product:{
id:string;
name:string;
description:string;
price:string;
banner:string;
}
pedido:{
id:string;
table:string | number;
status:boolean;
name:string | null;

}

}


export default function Dashboard({orders}:HomeProps){

const[ orderList, setorderList] = useState(orders || [])

const[modalItem, setmodalITem] = useState<OrderItemProps[]>()

const[modalVisible, setmodalVisible]= useState(false)

function handleCloseModal(){

setmodalVisible(false);

}

async function handleOpenModalView( id:string){

const apiClient = setupApiClient();

const response = await apiClient.get('/pedidos/detail', {

params:{

pedido_id: id,

}

})
setmodalITem(response.data);
setmodalVisible(true);

}

//função para fechar pedido
async function handleFinishModal(id:string){

const apiClient = setupApiClient();

await apiClient.put('/pedido/finish',{

pedido_id: id,


})

const response = await apiClient.get('/pedidos');

setorderList(response.data)
setmodalVisible(false);

}

//função do Refresh

async function handleRefresh(){

const apiClient = setupApiClient();

const response = await apiClient.get('/pedidos')

setorderList(response.data)

}

Modal.setAppElement('#__next');

return(

<>

<Head>

<title>Painel - Irato.Dev</title>

</Head>

<div>

<Header/>

<main className={Style.conteiner}>

<div className={Style.conteinerHeader}>

<h1>Últimos Pedidos</h1>
<button onClick={handleRefresh}>
<FiRefreshCcw size={25} color="#3fffa3" />
</button>
</div>

{orderList.length === 0 &&(

<span className="style.emptyList">
Nenhum pedido foi encontrado...
</span>

)}

<article className={Style.listOrders}>

{orderList.map(item =>(

<section key={item.id} className={Style.orderItem}>
<button onClick={()=>handleOpenModalView(item.id)}>
<div className={Style.tag}></div>
<span>mesa {item.table}</span>
</button>
</section>

))}

</article>

</main>

{modalVisible &&(

<ModalOrder

isOpen={modalVisible}
onRequestClose={handleCloseModal}
order={modalItem}
handleFinishOrder={handleFinishModal}

/>

)}

</div>


</>

)

}

export const getServerSideProps = canSSRAuth(async(ctx)=>{
const apiClient = setupApiClient(ctx);

const response = await apiClient.get('/pedidos');

return{

props:{

orders:response.data

}

}

})