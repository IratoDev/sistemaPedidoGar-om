
import React, {useState} from "react"
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native"

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import {StackPramsList} from "../../routes/app.routes"

import{api} from '../../services/api'

export default function Dashboard(){

const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

const [number, setNumber] = useState('')

async function openOrder(){
    
if(number === ""){
return;
}

//precisa fazer a requisição http para abrir a proxima tela 

const response = await api.post("/pedido", { table: Number(number)});

//console.log(response.data);
navigation.navigate("Order", {number: number, order_id: response.data.id})

setNumber('');

}

return(


<SafeAreaView style={Styles.conteiner}>

<Text style={Styles.title}>Novo Pedido</Text>

<TextInput 
placeholder="Numero da mesa"
placeholderTextColor="#F0F0F0"
keyboardType="numeric"
value={number}
onChangeText={setNumber}
style={Styles.input}/>

<TouchableOpacity style={Styles.button} onPress={openOrder}>
<Text style={Styles.buttonText}>Abrir mesa</Text>
</TouchableOpacity>

</SafeAreaView>


)

}

const Styles = StyleSheet.create({

conteiner:{
flex:1,
justifyContent:'center',
alignItems:'center',
paddingVertical:15,
backgroundColor:"#01183E"

},
title:{

fontSize:30,
fontWeight:"bold",
color:'#fff',
marginBottom:24,

},
input:{

width:"90%",
height:60,
backgroundColor:"#0E2A56",
borderRadius:4,
paddingHorizontal:8,
textAlign:"center",
fontSize:22,
color:"#fff",

},
button:{

width:"90%",
height:40,
backgroundColor:"#F06C32",
borderRadius:4,
marginVertical:12,
justifyContent:"center",
alignItems:"center"

},
buttonText:{

fontSize:18,
color:"#101026",
fontWeight:"bold",

},

})