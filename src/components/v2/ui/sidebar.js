import { useCallback, useEffect, useState } from 'react'
import { searchPedidos } from '../../services/requests'
import url from '../../../backend'
import './style.css'
import {SlArrowLeft} from 'react-icons/sl'
import { useSelector } from 'react-redux'

export function SideBar(){
    const [selected, setSelected] = useState('cliente')
    const [type, setType] = useState('text')
    const [value, setValue] = useState('')
    const [orders, setOrders] = useState([])
    const [appear, setAppear] = useState(false)
    const {token} = useSelector(state=>state.auth)

    const search =useCallback(async()=>{
        const resp = await searchPedidos(selected, value, token)
        
        
        
        setOrders(resp.data)
        
        
        
        
    },[value, selected])
  
    
    useEffect(()=>{
        
        function changeType(){
            
                if(selected === 'cliente'){
                    setType('text')
                }
                    
                else if (selected === 'valor'){
                    setType('number')
                }
                
                else if (selected === 'pedido'){
                    setType('text')
                }
                else if (selected === 'data') {
                    setType('date')
                }                
        }
        changeType()
        
        
    },[selected, type])

   
    

    return(
        <div className={`side-bar ${appear?'appear': 'disappear'}`}>
            <h1>Filtrar</h1>
            <p>Tipo de dado:</p>
            <select onChange={(e)=>{setSelected(e.target.value)}}>
                <option value={'cliente'}>CPF/CNPJ</option>
                <option value={'valor'}>Valor do pedido</option>
                <option value={'pedido'}>N do pedido</option>
                <option value={'data'}>Data do pedido</option>
            </select>
            <p>{selected}:</p>
            <input onChange={e=>setValue(e.target.value)} type={type}/>
            <br/>
            <button onClick={search}>Pesquisar</button>

            <section className='orders'>
                {orders && orders.length == 0
                    ?'Nenhum pedido :('
                    :orders && orders.map(order=>{
                        return(
                            <div className='order' key={order.pedido}>
                                
                                <div>
                                    <p className='order-cpf'>Cliente: {order.cliente}</p>
                                    <div>
                                        <span>{order.data.split('-')[2]}/{order.data.split('-')[1]}/{order.data.split('-')[0]}</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <p>Pedido Nº: {order.pedido} </p>
                                    <p>Valor: R$ {order.valor.toFixed(2)}</p>
                                </div>
                                
                            </div>
                        )
                    })
                }
            </section>

            <div className='open-sidebar' onClick={()=>{setAppear(!appear)}}>
                <SlArrowLeft className='side-bar-button' size={25}/>
                <p className='busca-pedidos'>Pedidos</p>
            </div>
        </div>
    )
}