import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import {Feather} from "@expo/vector-icons"

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";


import { api } from "../../services/api"; 

type RouteDetailParams = {

Finishorder:{
number:string | number;
order_id:string;

}

}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'Finishorder'>

export default function Finishorder(){

const route = useRoute<FinishOrderRouteProp>();
const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

async function handleFinish() {

try {
    
await api.put('/pedido/send',{

    pedido_id: route.params?.order_id

})

navigation.popToTop();

} catch (error) {

alert("erro ao finalizar" + error)

}

}

return(

<View style={style.conteiner}>

<Text style={style.alerta}> Você deseja finalizar esse pedido? </Text>
<Text style={style.title}> Mesa {route.params?.number}</Text>

<TouchableOpacity style={style.button} onPress={handleFinish}>
    <Text style={style.textbutton}>Finalizar pedido</Text>
    <Feather name="shopping-cart" size={20} color={"#1d1d2e"}/>
</TouchableOpacity>

</View>

)

}

const style = StyleSheet.create({

conteiner:{
flex:1,
backgroundColor:"#01183E",
paddingHorizontal:"5%",
paddingVertical:"4%",
alignItems:"center",
justifyContent:"center"
},

alerta:{
fontSize:20,
color:"#fff",
fontWeight:"bold",
margin:12,
},
title:{
fontSize:30,
fontWeight:"bold",
color:"#fff",
marginBottom:12,
},
button:{
backgroundColor:"#F06C32",
flexDirection:"row",
width:'65%',
height:40,
alignItems:"center",
justifyContent:'center',
borderRadius:4,
},
textbutton:{
fontSize:18,
marginRight:8,
fontWeight:'bold',
color:'#1d1d2e'
}

})