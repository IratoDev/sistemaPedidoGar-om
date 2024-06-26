import { AppProps } from "next/app";

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss'

import { ToastContainer, toast } from 'react-toastify';
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({Component, pageProps}:AppProps){

return (

<AuthProvider>
<Component {...pageProps}/>
<ToastContainer autoClose={3000}/>
</AuthProvider>

)
}

export default MyApp