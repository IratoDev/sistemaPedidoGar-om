import React, {useContext, useState} from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity , ActivityIndicator} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn(){

const {signIn, loadingAuth} = useContext(AuthContext)

const [email, setEmail] = useState('')
const [password, setPassWord] = useState('')

 async function handleLogin(){

if(email === '' || password === ''){

return;

}

await signIn({email, password});


}

return(

<View style={styles.conteiner}>

<Image style={styles.logo} source={require("../../assets/logo.png")} />

<View style={styles.InputConteiner}>


<TextInput style={styles.input}
 placeholder="Digite seu email"
placeholderTextColor="#F0F0F0"
value={email}
onChangeText={setEmail}
/>

<TextInput
 style={styles.input}
placeholder="sua senha"
placeholderTextColor="#F0F0F0"
value={password}
onChangeText={setPassWord}

/>

<TouchableOpacity style={styles.button} onPress={handleLogin}>

{loadingAuth ? (

<ActivityIndicator size={25} color="#fff"/>

):(

<Text style={styles.buttonText}>Acessar</Text>

)}

</TouchableOpacity>

</View>

</View>

)

}

const styles = StyleSheet.create({

conteiner:{

flex:1,
justifyContent: 'center',
alignItems:'center',
backgroundColor:"#01183E"

},
logo:{

width:200,
height:100,
marginBottom: 18

},

InputConteiner:{

width: "95%",
alignItems: "center",
justifyContent: "center",
paddingVertical:32,
paddingHorizontal:14,

},
input:{

width: "95%",
height: 40,
backgroundColor:"#0E2A56",
marginBottom:12,
borderRadius:4,
paddingHorizontal:8,
color: '#fff',

},

button:{

width : "95%",
height:40,
backgroundColor:"#F06C32",
borderRadius:4,
justifyContent:'center',
alignItems:"center"

},
buttonText:{

fontSize:18,
fontWeight:"bold",
color:"101026"

}

})