
import { useContext } from "react"
import Style from "./style.module.scss"
import Link from "next/link"
import {FiLogOut} from "react-icons/fi"

import { AuthContext } from "../../contexts/AuthContext"


export function Header(){

const {user} = useContext(AuthContext);
const {signOut} = useContext(AuthContext);

return(

<header className={Style.headerConteiner}>

<div className={Style.headerContemt}>

<Link href="/deshboard">
<img src="/logo.png" width={150} height={60}/>
</Link>

<h1> Usuario:{user?.name}</h1>

<nav className={Style.menuNav}>

<Link  href="/Category">
Categoria
</Link>

<Link  href="/Products">
Cardapio
</Link>

<button onClick={signOut}>
<FiLogOut color="#fff" size={24}/>
</button>

</nav>

</div>

</header>

)

}