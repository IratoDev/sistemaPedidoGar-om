import Style from "../Button/Style.module.scss"
import { ButtonHTMLAttributes, ReactNode } from "react";
import {FaSpinner} from "react-icons/fa"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{

loading?:boolean,
children:ReactNode,

}

export function Button({loading, children, ...res}:ButtonProps){

return(

<button className={Style.button} disabled={loading} {...res}>

{loading ?(

<FaSpinner color="#fff" size={16}/>):(

<a className={Style.TextButton} href="">{children}</a>

 )}

</button>

)


}