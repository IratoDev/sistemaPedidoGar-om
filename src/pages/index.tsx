import { useContext, FormEvent, useState } from "react"
import Style from "../styles/Home.module.scss"
import Logo from "../../public/logo.png"
import Image from "next/image"
import style from "../styles/Home.module.scss"

//componets
import { Ipunt } from "../components/ui/input"
import { Button } from "../components/ui/Button"

import Link from "next/link"
import Head from "next/head"
import { GetServerSideProps } from "next"
import { canSSRGuest } from "../utils/canSSRGuest"

//função de requisição
import { AuthContext } from "../contexts/AuthContext"

//toast biblioteca de estilização de mensagens
import { toast } from "react-toastify"

export default function Home() {

    const {signIn} = useContext(AuthContext)

    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const[loading, setLoading]= useState(false);

    async function handleLogin(event: FormEvent){
    
    event.preventDefault();
    
if(email === "" || password === ""){

toast.warning("Preencha os dados")

}

setLoading(true);

    let data ={
    
    email,
    password
    
    }
    
    await signIn(data)
    
    setLoading(false);

    }

return(

<>

<Head>
<title> sujeito pizzaria-faça seu login</title>
</Head>

<div className={Style.conteinerCenter}>

<div style={{
  position: 'absolute',
  bottom: '16px',
  right: '16px',
  background: '#ffffffdd',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  zIndex: 1000,
  maxWidth: '300px'
}}>
  <h1>Usuário teste:</h1>
  <h3>Email:teste.email@gmail.com</h3>
  <p>Senha: 1234</p>

  <p>Baixe o app de garçom: </p>
  <a href="https://drive.google.com/file/d/1zvaWv97AFZ_b1suXTRGdXvj-frrmwAPV/view?usp=drive_link"/>
</div>


<Image className={Style.logo} src={Logo} alt ="logo sujeito pizzaria"  />

<div className={style.login}>

<div className={Style.login}>

<form onSubmit={handleLogin}>

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
Login
</Button>

</form>

<Link className={Style.text} href="/signup">
nâo possui uma conta? Cadastre-se
</Link>

</div>

</div>


</div>


</>

)

}

export const getServerSideProps = canSSRGuest( async (ctx) => {



return {

props:{}

}

})