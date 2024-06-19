
import Modal from 'react-modal'
import Style from './style.module.scss'

import { FiX } from 'react-icons/fi'
import { OrderItemProps } from '../../pages/deshboard'

interface ModelOrderProps{

isOpen: boolean;
onRequestClose:() => void;
order:OrderItemProps[];
handleFinishOrder:(id: string)=>void;

}

export function ModalOrder({isOpen, onRequestClose, order, handleFinishOrder}:ModelOrderProps){


const customStyles = {
content: {
top: '50%',
left: '50%',
right: 'auto',
bottom: 'auto',
marginRight: '-50%',
transform: 'translate(-50%, -50%)',
backgroundColor:'#1d1d2e',
}
}

return(

<Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>

<button type='button' onClick={onRequestClose} className="react-modal-close" style={{background: 'transparent', border:0}} >

<FiX size={45} color='#f34748' />

</button>

<div className={Style.conteiner}>

<h2>Detalhes do pedido</h2>



<span className={Style.table}>

mesa : <strong>{order[0].pedido.table}</strong>

</span>

{order.map(item =>(

<section key={item.id} className={Style.containerItem}>

<span>{item.amount} - <strong>{item.product.name}</strong></span>
<span className={Style.description}>{item.product.description}</span>

</section>

))}

<button className={Style.buttonOrder} onClick={()=> handleFinishOrder(order[0].pedido_id)}>
concluir pedido  
</button>

</div>

</Modal>
)

}