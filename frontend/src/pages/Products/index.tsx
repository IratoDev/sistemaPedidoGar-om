import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import Style from "./style.module.scss"

//componentes
import { Header } from "../../components/Header";
//verificação se o usuario esta logado
import { canSSRAuth } from "../../utils/canSSRAuth";

//icones
import {FiUpload} from "react-icons/fi"
import { url } from "inspector";

import { setupApiClient } from "../../service/api";
import { toast } from "react-toastify";

type ItemProps={

id:string;
name:string;

}

interface categoryProps{

categoryList: ItemProps[];

}

export default function Product({categoryList}){

const[name, setName] = useState('');
const[price, setPrice] = useState('');
const[description, setDescription] = useState('');

//armazena imagem
const [avatarUrl, setAvatarUrl] = useState('');
const [imageAvatar, setImageAvatar] = useState(null);

//armazenamento de seleção
const [categories, setCategories] = useState(categoryList||[])
const [categorySelected, setcategorySelected] = useState(0)

function handleFile(e: ChangeEvent<HTMLInputElement> ){

if(!e.target.files){

return;

}

const image = e.target.files[0];

if(!image){

return;

}

if(image.type === 'image/jpeg'|| image.type === 'image/jpg' || image.type === 'image/png'){

setImageAvatar(image);
setAvatarUrl(URL.createObjectURL(e.target.files[0]))

}


}

//quando voce seleciona uma nova categoria na lista 
function handleChangeCategory(){

setcategorySelected(event.target.value);

}

async function handleRegister(event: FormEvent) {
    
event.preventDefault();

try {
    
const data = new FormData();

if(name === "" || price === "" || description === "" || imageAvatar === null){

toast.error("preencha todos os campos");
return;

}

data.append('name', name);
data.append('price', price);
data.append('description', description);
data.append('category_id', categories[categorySelected].id);
data.append('file', imageAvatar);

const apiClient = setupApiClient();

await apiClient.post('/product',data);
toast.success('cadastrado com sucesso!!')


}catch(err) {
 
toast.error("Ops Erro ao cadastrar")
    
}

setName('');
setPrice('');
setDescription('');
setAvatarUrl('');
setImageAvatar(null);


}

return(

<>
<Head>

<title>Novo produto - Irato.Dev</title>

</Head>

<div>

<Header/>

<main className={Style.conteiner}>

<div>
<form onSubmit={handleRegister}>

<label >
<span>

<FiUpload size={30} color="#fff"/>

</span>

<input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFile} />

{avatarUrl && (

<img className={Style.previw} src={avatarUrl} alt="foto do produto" width={250} height={250}/>

)}

</label>

<select value={categorySelected} onChange={handleChangeCategory}>
{categories.map((item, index)=>{

return(

<option key={item.id} value={index}>

{item.name}

</option>

)

})}
</select>

<input className={Style.input} type="text" placeholder="Digite o nome do produto" value={name} onChange={(e)=> setName(e.target.value)} />

<input className={Style.input} type="number" placeholder="Preço do produto" value={price} onChange={(e)=> setPrice(e.target.value)} />

<textarea className={Style.input} placeholder="Descreva seu produto..." value={description} onChange={(e)=> setDescription(e.target.value)}/>

<button className={Style.buttonAdd} type="submit">
    Cadastrar
</button>

</form>

</div>

</main>

</div>

</>


)

}

export const getServerSideProps = canSSRAuth(async(ctx)=>{

const apiClient = setupApiClient(ctx)

const response = await apiClient.get('/category')

return{
props:{

categoryList: response.data

}
}
    
})