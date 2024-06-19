import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal,FlatList } from "react-native";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {StackPramsList} from '../../routes/app.routes'

import ModalPicker from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";

import {Feather} from '@expo/vector-icons'

import { api } from "../../services/api";


type RouteDetailParams = {

Order:{
number: string | number;
order_id:string | number;

}

}

export type CategoryProps = {

id:string;
name:string;

}

type ProductsProps = {

id:string;
name:string;

}

type ItemProps = {

id:string;
product_id:string;
name:string;
amout:string | number;

}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;


export default function Order(){

const route = useRoute<OrderRouteProps>();
const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();


const[category, setCategory] = useState<CategoryProps[] | []>([]);
const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()

const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

const [products, setProducts] = useState<ProductsProps[] | []>([]);
const[productsSelected, setProductsSelected] = useState<ProductsProps | undefined>();
const [modalProductVisible, setModalProductVisible] = useState(false);


const [amout, setAmout] = useState("1");

const [items, setItems] = useState<ItemProps[]>([]);

useEffect(()=>{

async function loadInfo() {
    
const response = await api.get('/category')

setCategory(response.data);
setCategorySelected(response.data[0])

}

loadInfo();

},[])

useEffect(()=>{

async function loadProducts(){

const response = await api.get('/category/product',{ params:{

category_id:categorySelected?.id

}

})


setProducts(response.data);
setProductsSelected(response.data[0]);

}

loadProducts();

},[categorySelected])

async function handleCloseOrder() {
    
try {
    
await api.delete('/pedido', { params:{pedido_id: route.params?.order_id}} )
navigation.goBack();

} catch(err) {
    
console.log(err)


    console.log('id' + route.params.order_id)

}

}

function handleChangeCategory(item: CategoryProps){

setCategorySelected(item);

}

function handleChangeProduct(item:ProductsProps){

setProductsSelected(item);

}

//adicionar produto na mesa
async function handleAdd () {
 
const response = await api.post('/pedido/add',{

pedido_id: route.params?.order_id,
product_id:productsSelected?.id,
amount:Number(amout)

})

let data = {

    id:response.data.id,
    product_id: productsSelected?.id as string,
    name: productsSelected?.name as string,
    amout:amout

}

setItems(oldArray => [...oldArray,data])

}

//excluido item da lista

async function handleDeleteItem(item_id:string){
    
await api.delete('/pedido/remove', {

params:{
item_id: item_id
}

})

//apos remover os dados do banco removemos o item da lista de items
let removeItem = items.filter(item=>{ return (item.id !== item_id)})

setItems(removeItem)

}

//finalizando pedido
function handleFinishOrder(){

navigation.navigate("FinishOrder",{number:route.params?.number, order_id:route.params?.order_id})

}

return(

<View style={Style.conteiner}>

<View style={Style.header}>

<Text style={Style.title}>mesa { route.params.number}</Text>
{items.length === 0 &&(

<TouchableOpacity onPress={handleCloseOrder}>
    <Feather  name="trash-2" size={28} color="#FF3F4b"/>
</TouchableOpacity>

)}

</View>

{category.length !== 0 && (<TouchableOpacity style={Style.input} onPress={()=>{setModalCategoryVisible(true)}}>
<Text style={{color:"#fff"}}> {categorySelected?.name} </Text>
</TouchableOpacity>)}

{products.length !== 0 &&(

<TouchableOpacity style={Style.input} onPress={()=>{ setModalProductVisible(true)}}>
<Text style={{color:"#fff"}}> {productsSelected?.name} </Text>
</TouchableOpacity>

)}

<View style={Style.qtdConteiner}>
<Text style={Style.qtdText}>Quantidade</Text>

<TextInput

style={[Style.input, {width: "60%", textAlign:"center"}]}
placeholderTextColor="#F0F0F0"
keyboardType="numeric"
value={amout}
onChangeText={setAmout}

/>

</View>

<View style={Style.actions}>

<TouchableOpacity style={Style.buttonAdd} onPress={handleAdd}>
<Text style={Style.buttonText}>+</Text>
</TouchableOpacity>

<TouchableOpacity onPress={handleFinishOrder} style={[Style.button, {opacity:items.length === 0 ? 0.3 : 1}]} 
disabled = {items.length === 0}>
<Text style={Style.buttonText}>Avançar</Text>
</TouchableOpacity>

</View>

<FlatList 
showsVerticalScrollIndicator={false}
style={{flex: 1, marginTop:24}} 
data={items}
keyExtractor={(item)=> item.id}
renderItem={({item})=> <ListItem data={item} deleteItem={handleDeleteItem}/> }
/>


<Modal transparent={true} visible={modalCategoryVisible} animationType="fade">

<ModalPicker handleCloseModal={()=>{ setModalCategoryVisible(false)}}
options = {category}
selectedItem={handleChangeCategory}

/>

</Modal>

<Modal transparent={true} visible={modalProductVisible} animationType="fade">

<ModalPicker handleCloseModal={()=>{ setModalProductVisible(false)}}
options = {products}
selectedItem={handleChangeProduct}

/>

</Modal>

</View>

)

}

const Style = StyleSheet.create({

conteiner:{
flex:1,
backgroundColor:"#01183E",
paddingVertical:"5%",
paddingEnd:"4%",
paddingStart:"4%",
},
header:{

flexDirection:'row',
marginBottom:12,
alignItems:"center",
marginTop:24,
},
title:{

fontSize:30,
fontWeight:"bold",
color:"#fff",
marginRight:14

}, 

input:{
backgroundColor:"#0E2A56",
borderRadius:4,
width:"100%",
height:40,
marginBottom:12,
justifyContent:"center",
paddingHorizontal:8,
color:"#fff",
fontSize:22

},

qtdConteiner:{

flexDirection:"row",
alignItems:"center",
justifyContent:"space-between"

},

qtdText:{

fontSize:20,
fontWeight: "bold",
color:"#fff"

}, 

actions:{
flexDirection:"row",
width:'100%',
justifyContent:"space-between"

},

buttonAdd:{
width:"20%",
backgroundColor:"#3fd1ff",
borderRadius:4,
height:40,
justifyContent:"center",
alignItems:"center"
},

buttonText:{

color:'#101026',
fontSize:18,
fontWeight:'bold'

},

button:{
backgroundColor:'#3fffa3',
height:40,
borderRadius:4,
width:'75%',
alignItems:"center",
justifyContent:"center"
}

})