import url from "../backend";
import { useState } from "react";
import './busca-cpf.css'
import { AiOutlineSearch } from "react-icons/ai";
import { buscaCpf } from "./services/requests";
import { useSelector } from "react-redux";

export default function BuscaCpf(props){
    const [cliente, setCliente] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const {token} = useSelector(state =>state.auth)
    const handleInput=(e)=>{
        setSearchText(e.target.value)
    }

    const makeSearch=async()=>{
        setLoading(true)
       await buscaCpf(searchText, token).then(resp=>{
        setCliente(resp)
       }
        
       )
        
        setLoading(false)
    }

    if (props.visible){
        if (loading){
            try{

            
            return(
<div className={`busca-cpf-popup ${props.visible?'active':''}`}>
                    
                    <div className="client-box" >
                        <div className="client-cpf">Cliente: {cliente!=undefined?cliente[1].cliente:''}</div>
                        <div className="client-cpf">Intervalo: {cliente!=undefined?cliente[1].intervalo.toFixed(1):''} Dias</div>
                            <div className="scroll-box">
                               <div className="loading-circle">
                                <span className="loading-dot"></span>
                            </div>
                                    
                                
                            </div>
                    </div>
                    
                    <div className="input-wrapper">
                        <input onChange={handleInput} className="busca-cpf-input"/>
                        <AiOutlineSearch onClick={makeSearch} className="search-image"/>
                    </div>
                    <div onClick={()=>props.setter()} className="close-popup-button">FECHAR</div>           
                </div>
            )}
            catch{

            }
        }
        else{
            try{
            return(
                <div className={`busca-cpf-popup ${props.visible?'active':''}`}>
                    
                    <div className="client-box" >
                        <div className="client-cpf">Cliente: {cliente!=undefined?cliente[1].cliente:''}</div>
                        <div className="client-cpf">Intervalo: {cliente!=undefined?cliente[1].intervalo.toFixed(1):''} Dias</div>
                            <div className="scroll-box">
                                {cliente!=undefined? cliente[1].pedidos.map(p=>{
                                    try{
                                        return(
                                            <div className="pedido-details">
                                                <div className="order-date">{p.data.split('-')[2]}/{p.data.split('-')[1]}/{p.data.split('-')[0]}</div>
                                                <div className="order-date">R$ {p.valor}</div>
                                            </div>
                                        )
                                    }
                                    catch{
                                        return(

                                            <div>Nao foi possivel encontrar</div>
                                            )
                                        
                                    }
                                    
                                }):<div className="centered-text">Busca por CPF</div>}
                                    
                                
                            </div>
                    </div>
                    
                    <div className="input-wrapper">
                        <input onChange={handleInput} className="busca-cpf-input"/>
                        <AiOutlineSearch onClick={makeSearch} className="search-image"/>
                    </div>
                    <div onClick={()=>props.setter()} className="close-popup-button">FECHAR</div>           
                </div>
            )
        }
        catch{
            return(
                <div className={`busca-cpf-popup ${props.visible?'active':''}`}>
                    
                <div className="client-box" >
                    <div className="client-cpf">Cliente: </div>
                    <div className="client-cpf">Intervalo:</div>
                        <div className="scroll-box">
                            <div>Nenhum cliente com este cpf.</div>
                        </div>
                </div>
                
                <div className="input-wrapper">
                    <input onChange={handleInput} className="busca-cpf-input"/>
                    <AiOutlineSearch onClick={makeSearch} className="search-image" />
                </div>
                <div onClick={()=>props.setter()} className="close-popup-button">FECHAR</div>           
            </div>
            )
        }
        }
        
    }
        
    
    
}