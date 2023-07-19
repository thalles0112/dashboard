import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import url from "../../../backend";
import './style.css'
import ReactLoading from 'react-loading'
import { PeriodSelector } from "../ui/datepicker/datepicker";
import ClientCard from "./clienteCard";
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
                        'n_pedido': '',
                        
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
    const [tipo, setTipo] = useState('recorrentes')
    const [orderBy, setOrderBy]  = useState('valor')
    const scrollRef = useRef()
    const [loading, setLoading] = useState(false)

    function dataSetter(initial, final){
        setInitialData(initial)
        setFinalData(final)
        
    }

    useEffect(()=>{
        async function get(){
            const resp = await axios.get(`${url}/apiv2/clientes/?data_inicial=${initialData}&data_final=${finalData}&tipo=${tipo}&orderBy=${orderBy}`)
            if(resp.data){
                setRes(resp.data) 
                setLoading(false)
                scrollRef.current.scrollTop=0
            } 
        }   
        setLoading(true)
        get()
    },[tipo, initialData, finalData, orderBy])

    const export_excel = useCallback(()=>{
        async function get(){
            const resp = await axios.get(`${url}/apiv2/exportar/?data_inicial=${initialData}&data_final=${finalData}&tipo=${tipo}&orderBy=${orderBy}`)
            if(resp.data){
                setRes(resp.data) 
                console.log(resp.data)
                setLoading(false)
                scrollRef.current.scrollTop=0
            } 
        }   
        setLoading(true)
        get()
    },[tipo, initialData, finalData, orderBy])

    const opcoes = {style: 'decimal', useGrouping: true}

 
    return(
        <section className="clientes-page">
           <div className={`loading-screen ${loading?'loading':''}`}> {loading?<ReactLoading height={30} width={60} type="bars"/> :<></>}Carregando...</div>
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
                    <div className="beautiful-border h-76 flex align-center">
                        <div className="flex flex-col align-center">
                            <span>Ordenar por</span>
                            <PeriodSelector bucetador={dataSetter}/>   
                        </div>
                        
                       
                    </div>
                    
                </div>
            </div>
            
            <section className="flex gx-5">
                <div className="flex flex-col">
                    
                    <div ref={scrollRef} className="vertical-scroll px-5">
                        {res.clientes && res.clientes.map(cliente=>{
                            return(
                            <ClientCard tipo={tipo} key={cliente.cpf} cliente={cliente} faturamento_total={res.generic.faturamento_total}/>
                            )
                        })}
                    </div>

                   
                </div>
                
                
                <div>
                    
                    <div className="text-left">
                        <h1 className="font-big text-left">Resumo</h1>
                        <h2 className="font-medium">Faturamento Total: R$ <span>{res.generic.faturamento_total.toLocaleString('pt-BR', opcoes)} </span></h2>
                        <h2 className="font-medium text-left">Total de Clientes no Período:<span> {res.generic.quantidade}</span></h2>
                    </div>    
                
                </div>

            </section>
           
            
        </section>
    )
}