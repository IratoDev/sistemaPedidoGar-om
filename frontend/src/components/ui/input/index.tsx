import style from "./style.module.scss"
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLAnchorElement>{}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Ipunt({...rest}:InputProps){

return(

<input className={style.input} {...rest}/>

)

}


export function Textarea({...res}:TextareaProps){

return(
    
<textarea className={style.input} {...res}/>
    
)
    
}