import url from "../backend";
import { useState } from "react";
import './busca-cpf.css'
import search from './ui/img/search-black.png'

export default function BuscaCpf(props){
    const [cliente, setCliente] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const handleInput=(e)=>{
        setSearchText(e.target.value)
    }

    const makeSearch=async()=>{
        setLoading(true)
        await fetch(`${url}/api/busca-cpf/?cpf=${searchText}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(resp=>resp.json().then(resp=>setCliente(resp)))
        
        setLoading(false)
    }

    if (props.visible){
        if (loading){
            return(
<div className={`busca-cpf-popup ${props.visible?'active':''}`}>
                    
                    <div className="client-box" >
                        <div className="client-cpf">Cliente: {cliente!=null?cliente[1].cliente:''}</div>
                        <div className="client-cpf">Intervalo: {cliente!=null?cliente[1].intervalo.toFixed(1):''} Dias</div>
                            <div className="scroll-box">
                               <div className="loading-circle">
                                <span className="loading-dot"></span>
                            </div>
                                    
                                
                            </div>
                    </div>
                    
                    <div className="input-wrapper">
                        <input onChange={handleInput} className="busca-cpf-input"/>
                        <img onClick={makeSearch} className="search-image" src={search}/>
                    </div>
                    <div onClick={()=>props.setter()} className="close-popup-button">FECHAR</div>           
                </div>
            )
        }
        else{
            return(
                <div className={`busca-cpf-popup ${props.visible?'active':''}`}>
                    
                    <div className="client-box" >
                        <div className="client-cpf">Cliente: {cliente!=null?cliente[1].cliente:''}</div>
                        <div className="client-cpf">Intervalo: {cliente!=null?cliente[1].intervalo.toFixed(1):''} Dias</div>
                            <div className="scroll-box">
                                {cliente!=null?cliente[1].pedidos.map(p=>{
                                    return(
                                        <div className="pedido-details">
                                            <div className="order-date">{p.data.split('-')[2]}/{p.data.split('-')[1]}/{p.data.split('-')[0]}</div>
                                            <div className="order-date">R$ {p.valor}</div>
                                        </div>
                                    )
                                }):<div className="centered-text">Busca por CPF</div>}
                                    
                                
                            </div>
                    </div>
                    
                    <div className="input-wrapper">
                        <input onChange={handleInput} className="busca-cpf-input"/>
                        <img onClick={makeSearch} className="search-image" src={search}/>
                    </div>
                    <div onClick={()=>props.setter()} className="close-popup-button">FECHAR</div>           
                </div>
            )
        }
        
    }
        
    
    
}