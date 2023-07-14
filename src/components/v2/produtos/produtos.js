import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../../backend";
import './style.css'
import ReactLoading from 'react-loading'
import { PeriodSelector } from "../ui/datepicker/datepicker";
import {FiExternalLink} from 'react-icons/fi'

export default function Produtos(){
    const [res,setRes] = useState([])
    const [initialData, setInitialData] = useState(new Date().toISOString().split('T')[0])
    const [finalData, setFinalData] = useState(new Date().toISOString().split('T')[0])
    const [tipo, setTipo] = useState('recorrentes')
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        async function get(){
            const resp = await axios.get(`${url}/apiv2/produtos-${tipo}/?data_inicial=${initialData}&data_final=${finalData}`)
            if(resp.data){

                setRes(resp.data.sort(function(a, b){
                    return b[1].count - a[1].count
                }))
                setLoading(false)
            }
        }
        setLoading(true)
        get()
    },[initialData, finalData, tipo])

   function dataSetter(initial, final){
    setInitialData(initial)
    setFinalData(final)
   }

    return(
        <div className="flex flex-col justify-around  produtos-page">
             <div className="flex  flex-col align-center beautiful-border">
                <h1 className="font-big">Produtos</h1>
                
                <div className="flex space-around gx-5 align-center">
                
                    
                    <div className="beautiful-border flex flex-col h-fit">
                    <span>Tipo de cliente</span>
                        <div className="tipo-button--wrapper flex">
                            <button className={`tipo-button ${tipo=='recorrentes'?'active':'innactive'}`} onClick={()=>{setTipo('recorrentes')}}><span className="button-text">Recorrentes</span> <div className={`animated-bg ${tipo}`}></div></button>
                            <button className={`tipo-button ${tipo=='novos'?'active':'innactive'}`} onClick={()=>{setTipo('novos')}}><span className="button-text">Novos</span></button>
                        </div>
                    </div> 
                    <div className="beautiful-border h-40 flex align-center">
                        <PeriodSelector bucetador={dataSetter}/>   
                        {loading?<ReactLoading height={30} width={30} type="bars"/>:<></>}
                    </div>
                    
                </div>
            </div>
            
           
            
            
            <section className="vertical-scroll">
                {!loading
                
                ?<h1>{res.length} produtos</h1>
                
                :<div className="w-full"> 
                   
                    <h2>Buscando produtos...</h2>
                </div>
                
                }
                    {res.map(r=>{
                        return(
                            <div className="product-wrapper">
                                <h1 className="font-medium">{r[1].sku_nome}</h1>
                                <div className="flex justify-around align-center">
                                    <div className="w-20">
                                        <div className="font-medium">ref.: {r[1].sku_ref}</div>
                                        <div><a href={`https://honeybe.com.br${r[1].sku_url}`} target="_blank"><span className="flex align-center font-medium"><FiExternalLink width={26}/>ver no site</span></a></div>
                                    </div>
                                    
                                    <div>
                                        <span className="font-big" >{r[1].count} Pedidos</span>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    })}
            </section>
        </div>
    )

    
}