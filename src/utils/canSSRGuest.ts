import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {parseCookies} from 'nookies'

//função para paginas que só podem ser acessadas por visitantes

export function canSSRGuest<P>(fn:GetServerSideProps<P>){

return async(ctx:GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{

//se o cara tentat acessar a pagina porem tendo um login já salvo redirecione ele

const cookies= parseCookies(ctx);

if(cookies['@nextauth']){

return {

redirect:{

destination: '/deshborad',
permanent:false,

}

}

}

return await fn(ctx);

}

}