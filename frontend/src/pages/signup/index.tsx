import { FormEvent, useState, useContext } from "react"
import Style from "../../styles/Home.module.scss"
import Logo from "../../../public/logo.png"
import Image from "next/image"

//componets
import { Ipunt } from "../../components/ui/input"
import { Button } from "../../components/ui/Button"

import Link from "next/link"
import Head from "next/head"

//função de requisiçoes
import { AuthContext } from "../../contexts/AuthContext"

import { toast } from "react-toastify"


export default function Signup() {

const {signUp} = useContext(AuthContext);

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const[loading, setLoading]= useState(false);

async function handleSignUp(event:FormEvent){

event.preventDefault();

if(name ===''|| email ==='' ||password ===''){

toast.error("preencha todos os campos")

return;
}

setLoading(true);

let data ={

name,
email,
password

}

await signUp(data);

setLoading(false);

}



return(

<>
<Head>
<title> sujeito pizzaria-faça seu cadastro</title>
</Head>

<div className={Style.conteinerCenter}>

<Image className={Style.logo} priority={false} src={Logo} alt ="logo sujeito pizzaria"  />

<div className={Style.login}>

<h1>Criando sua conta</h1>

<div className={Style.login}>

<form onSubmit={handleSignUp}>

<Ipunt
placeholder="digite seu Nome"
type="text"
value={name}
onChange={ (e) => setName(e.target.value)}
/>

<Ipunt
placeholder="digite seu email"
type="text"
value={email}
onChange={ (e) => setEmail(e.target.value)}
/>

<Ipunt
placeholder="sua senha"
type="password"
value={password}
onChange={ (e) => setPassword(e.target.value)}
/>

<Button type = "submit" loading ={loading}>
Cadastrar
</Button>

</form>

<Link className={Style.text} href="/">
 Já tem conta ? Faça seu login
</Link>

</div>

</div>


</div>


</>

)

}
