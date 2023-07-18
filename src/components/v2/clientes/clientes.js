import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../../backend";
import './style.css'
import ReactLoading from 'react-loading'
import { PeriodSelector } from "../ui/datepicker/datepicker";
import {FiExternalLink} from 'react-icons/fi'
import ClientCard from "./clienteCard";
import { useCallback } from "react";
import { useRef } from "react";

const clientes = {
    generic: {
        'quantidade': 2,
        'faturamento_total':0
    },
    clientes:[
        {
            nome: '',
            cpf: 11111111111,
            pedidos: 0,
            valor_total: 40,
            datas: [],
            produtos: [
                [
                    {
                        'data': '0000-00-00',
                        
                        'lista_produtos': [
                            {
                                sku_name: 'short dahora',
                                sku_url: '/dnaoui0daodn-daokwnd-dadnaoi/p',
                                sku_ref: '1234.1.P'
                            },
                        ]
                    }
                
                ],
                [
                    {
                    'data': '0000-00-00',
                    'lista_produtos': [
                        {
                            sku_name: 'short dahora',
                            sku_url: '/dnaoui0daodn-daokwnd-dadnaoi/p',
                            sku_ref: '1234.1.P'
                        },
                        ]
                    }
                
                ]
               
            ]
        },
       
       
        
    ]
}

/* 
new Date().toISOString().split('T')[0]
return(
    <div className="flex justify-between text-left">
    <span>{pedido.sku_name}</span>
    <div className="flex">
        <span>{pedido.sku_ref} </span>
        <span><a href={`https://honeybe.com.br${pedido.sku_url}`} target="_blank">Ver no site</a></span>
    </div>
    
</div>
)
*/

export default function Clientes(){
    const [res,setRes] = useState(clientes)
    const [initialData, setInitialData] = useState(new Date().toISOString().split('T')[0])
    const [finalData, setFinalData] = useState(new Date().toISOString().split('T')[0])
    const [page, setPage] = useState(1)
    const [tipo, setTipo] = useState('recorrentes')
    const [orderBy, setOrderBy]  = useState('valor')
    const scrollRef = useRef()
    const [loading, setLoading] = useState(false)

    function dataSetter(initial, final){
        setInitialData(initial)
        setFinalData(final)
        setPage(1)
    }

    useEffect(()=>{
        async function get(){
            const resp = await axios.get(`${url}/apiv2/clientes/?data_inicial=${initialData}&data_final=${finalData}&tipo=${tipo}&pagina=${page}&orderBy=${orderBy}`)
            if(resp.data){
                setRes(resp.data) 
                setLoading(false)
                scrollRef.current.scrollTop=0
            } 
        }   
        setLoading(true)
        get()
    },[tipo, initialData, finalData, page, orderBy])

    const opcoes = {style: 'decimal', useGrouping: true}

 
    return(
        <section className="clientes-page">
           
            <div className="flex  flex-col align-center beautiful-border">
                <h1 className="font-big">Clientes</h1>
                
                <div className="flex gx-20 align-center justify-around">
                    <div className="beautiful-border flex flex-col h-fit">
                        <span>Ordenar por</span>
                        <div className="tipo-button--wrapper flex">
                            <button className={`tipo-button ${orderBy=='valor'?'active':'innactive'}`} onClick={()=>{setOrderBy('valor')}}><span className="button-text">Valor</span> <div className={`animated-bg ${orderBy}`}></div></button>
                            <button className={`tipo-button ${orderBy=='pedidos'?'active':'innactive'}`} onClick={()=>{setOrderBy('pedidos')}}><span className="button-text">Pedidos</span></button>
                        </div>
                    </div> 
                
                    
                    <div className="beautiful-border flex flex-col h-fit">
                        <span>Tipo de cliente</span>
                        <div className="tipo-button--wrapper flex">
                            <button className={`tipo-button ${tipo=='recorrentes'?'active':'innactive'}`} onClick={()=>{setTipo('recorrentes')}}><span className="button-text">Recorrentes</span> <div className={`animated-bg ${tipo}`}></div></button>
                            <button className={`tipo-button ${tipo=='novos'?'active':'innactive'}`} onClick={()=>{setTipo('novos')}}><span className="button-text">Novos</span></button>
                        </div>
                    </div> 
                    <div className="beautiful-border h-40 flex align-center">
                        <PeriodSelector bucetador={dataSetter}/>   
                        {loading?<ReactLoading height={30} width={30} type="bars"/>:<div className="loading-placeholder"></div>}
                    </div>
                    
                </div>
            </div>
            
            <section className="flex gx-5">
                <div className="flex flex-col">
                    
                    <div ref={scrollRef} className="vertical-scroll px-5">
                        {res.clientes && res.clientes.map(cliente=>{
                            return(
                            <ClientCard key={cliente.cpf} cliente={cliente} faturamento_total={res.generic.faturamento_total}/>
                            )
                        })}
                    </div>

                    <div className="flex flex-col justify-center align-center">
                        <span>Página</span>
                        <div className="flex">
                            <button className={`page-button ${loading?'loading':''}`} onClick={page >=2 && !loading?()=>{setPage(page-1); scrollRef.current.scrollTop=0}:()=>{}}>{'<'}</button>
                            <input value={page} onChange={(e)=>{setPage(parseInt(e.target.value))}} className="font-black text-center" type="text"/>
                            <button className={`page-button ${loading?'loading':''}`} onClick={!loading?()=>{setPage(page+1); scrollRef.current.scrollTop=0}:()=>{}}>{'>'}</button>
                        </div>
                    </div>
                </div>
                
                
                <div>
                    
                    <div className="text-left">
                        <h1 className="font-big text-left">Resumo</h1>
                        <h2 className="font-m-big">Faturamento Total: R$ {res.generic.faturamento_total.toLocaleString('pt-BR', opcoes)} </h2>
                        <h2 className="font-m-big text-left">Total de clientes no período {res.generic.quantidade}</h2>
                    </div>    
                    
                </div>

            </section>
           
            
        </section>
    )
}