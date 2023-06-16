import './style.css'
import RecorrenciaChart from '../chart'
import { useEffect, useState } from 'react'
import FiltroIntervalo from './filtro-intervalo'
import { AiOutlineInfoCircle, AiOutlineCalendar } from 'react-icons/ai'
import { getPedidos } from '../services/requests'
import InfoCard from './info-card'
import {BsLayoutSplit} from 'react-icons/bs'
import {TbLayoutRows} from 'react-icons/tb'
import { SideBar } from './ui/sidebar'
import { useSelector } from 'react-redux'

export default function V2Home(){
    const [pedidos, setPedidos] = useState({})
    const [loading, setLoading] = useState(false)
    const [horizontal, setHorizontal] = useState(true)
    const [classification, setClassification] = useState('periodo')
    const [ordering, setOrdering] = useState('big2small')
    const [bars, setBars] = useState(10)
    const [lastDate, setLastDate] = useState('-')
    const [barsActive, setBarsActive] = useState(false)
    const [totalClients,setTotalClients] = useState(0)
    const {token} = useSelector(state=>state.auth)
    
    useEffect(()=>{
        async function retrievePedidos(){
 
             const resp = await getPedidos(token)
             setPedidos(resp)
             


             if (resp.data){
                setTotalClients(resp.data.nao_recorrentes.quantidade_clientes + resp.data.recorrentes.quantidade_clientes)

                try{
                    const last_order_r = new Date(resp.data.recorrentes.data_ultimo_pedido)
                    const last_order_nr =  new Date(resp.data.nao_recorrentes.data_ultimo_pedido)
       
                    console.log(last_order_nr)
                    
                    if (last_order_nr > last_order_r){
                       setLastDate(last_order_nr.toLocaleString().split(',')[0])
                    }
                    else if (last_order_nr < last_order_r){
                       setLastDate(last_order_r.toLocaleString().split(',')[0])
                    }
                    else{
                       setLastDate(last_order_nr.toLocaleString().split(',')[0])
                    }
                   }catch (e){
                       console.log(e)
                   }
             }
             
              
            
         
 
            setLoading(false)
         }
         
         
         setLoading(true)
         retrievePedidos()

     },[])


 
    let delayTimer = 1000 
    async function setValueWithDelay(e){
        clearTimeout(delayTimer)
        delayTimer = setTimeout(()=>{
            setBars(e.target.value)
        }, 1000)
    }


    

    return(
        <div id='v2home' style={{flexDirection:horizontal?'row':'column', justifyContent: horizontal?'space-evenly':'flex-start'}}>
            
            <section style={{ height:horizontal?'unset':'100vh'}}>
                <SideBar/>
                <div id='last-order-date'>último pedido registrado em: {pedidos.data?lastDate:'-'}</div>
                <div onClick={()=>{setHorizontal(!horizontal)}} className='organization-control'>
                    {horizontal
                        ?<span><BsLayoutSplit  size={25}/> {horizontal?'horizontal':'vertical'}</span>
                        :<span><BsLayoutSplit id='rotate90' size={25}/>{horizontal?' horizontal':' vertical'}</span>
                    }
                </div>
                
                <div className='black-box first'>
                    <h2>Pedidos Não recorrentes</h2>
                
                        <div className='sub-box-row'>
                            <div>
                                <h3>Quantidade</h3>
                            <span>{pedidos.data?pedidos.data.nao_recorrentes.quantidade_clientes:'-'}</span> 
                            <InfoCard text={'Quantidade de clientes não recorrentes.'}/>
                            </div>

                            <div>
                                <h3>Menor valor</h3>
                            <span>R$ {pedidos.data?pedidos.data.nao_recorrentes.valor_menor.toFixed(2):'-'}</span> 
                            <InfoCard text={'Menor valor registrado que um cliente não recorrente já comprou no site.'}/>
                            </div>

                            <div>
                                <h3>Ticket medio</h3>
                            <span>{pedidos.data?pedidos.data.nao_recorrentes.valor_medio.toFixed(2):'-'}</span> 
                            <InfoCard text={'Ticket Médio dos clientes que não voltaram a comprar no site.'}/>
                            </div>

                            <div>
                                <h3>Maior valor</h3>
                            <span>{pedidos.data?pedidos.data.nao_recorrentes.valor_maior.toFixed(2):'-'}</span> 
                            <InfoCard text={'Maior valor registrado que um cliente não recorrente já comprou no site.'}/>
                            </div>
                            
                           

                        </div>
                </div>

                    <div className='black-box second'>
                        <h2>Pedidos Recorrentes</h2>
                        <div className='sub-box-row'>
                            
                                
                                <div>
                                    <h3>Quantidade</h3>
                                    <span>{pedidos.data?pedidos.data.recorrentes.quantidade_clientes:'-'}</span>
                                    <InfoCard text={'Quantidade de clientes recorrentes.'}/>
                                </div>
                                <div>
                                    <h3>Menor valor</h3>
                                    <span>R$ {pedidos.data?pedidos.data.recorrentes.valor_menor.toFixed(2):'-'}</span>
                                    <InfoCard text={'Menor valor registrado que um cliente recorrente já comprou no site.'}/>
                                </div>
                                <div>
                                    <h3>Ticket medio</h3>
                                    <span>R$ {pedidos.data?pedidos.data.recorrentes.valor_medio.toFixed(2):'-'}</span>
                                    <InfoCard text={'Ticket Médio dos clientes recorrentes'}/>
                                </div>
                                <div>
                                    <h3>Maior valor</h3>
                                    <span>R$ {pedidos.data?pedidos.data.recorrentes.valor_maior.toFixed(2):'-'}</span>
                                    <InfoCard text={'Maior valor registrado que um cliente recorrente já comprou no site.'}/>
                                </div>
                        </div>


                        <div className='sub-box-row'>
                            
                                
                                <div>
                                    <h3><AiOutlineCalendar/>Menor intervalo</h3>
                                    <span>{pedidos.data?pedidos.data.recorrentes.intervalo_menor.toFixed(0):'-'} Dias</span>
                                    <InfoCard text={'Menor intervalo de tempo entre uma compra e outra.'}/>
                                </div>
                                <div>
                                    <h3><AiOutlineCalendar/>Intervalo médio</h3>
                                    <span>{pedidos.data?pedidos.data.recorrentes.intervalo_medio.toFixed(0):'-'} Dias</span>
                                    <InfoCard text={'Tempo médio que um cliente leva para voltar a comprar no site. Este intervalo foi calculado com média aritimética, então pode haver intervalos muito pequenos e muito grandes e é como se fosse um borrão de todos os intervalos, ou seja, não é muito preciso.'}/>
                                </div>
                                <div>
                                    
                                    <h3><AiOutlineCalendar/>Maior intervalo</h3>
                                    <span>{pedidos.data?pedidos.data.recorrentes.intervalo_maior.toFixed(0):'-'} Dias</span>
                                    <InfoCard text={'Maior tempo que um cliente já levou para voltar a comprar no site.'}/>
                                </div>
                        </div>
                    

                    <div>
                        <h2>Filtro por intervalo</h2>
                        <FiltroIntervalo/>
                      
                    </div>
                    
                </div>
            </section>
          
            
            {barsActive

            ? <section className='chart' style={{width:horizontal?'50%':'100%', height:horizontal?'unset':'100vh', marginTop: horizontal?'0px':'120px', marginBottom: horizontal?'0px':'120px'}}>
                <div>
                <p>Classificar por</p>
                    
                    <button onClick={()=>setClassification('periodo')} className={classification==='periodo'?'pressed':'not-pressed'}>Periodo</button>
                    <button onClick={()=>setClassification('intervalo')} className={classification==='periodo'?'not-pressed':'pressed'}>Quantidade</button>
                </div>
                <div>
                <p>Ordenar por</p> 
                    <button onClick={()=>setOrdering('big2small')} className={ordering==='big2small'?'pressed':'not-pressed'}>Maior para menor</button>
                    <button onClick={()=>setOrdering('small2big')} className={ordering==='big2small'?'not-pressed':'pressed'}>Menor para maior</button>
                </div>
                <div>
                    <p>Barras</p>
                    <input onChange={setValueWithDelay} defaultValue={bars} type={'number'}/>
                </div>
                <RecorrenciaChart ordering={ordering} classification={classification} bars={bars}/>
                <p className='info'><AiOutlineInfoCircle/> "i10" é a abreviação de intervalo de 10 dias.</p>
                
            </section>
            :<section className='resumo '>
            
                <section className='reincidencia-counter black-box'>
                    <h2>Reincidencia</h2><span>Aqui são contabilizados os clientes que compraram X vezes no site</span>
                    <div className='sub-box-row'>
                            <div className='reincidencia-item'>
                                <h3>Quantidade total de clientes</h3>
                                <span>{pedidos.data? totalClients:'-'}</span>
                            </div>
                            <div className='reincidencia-item'>
                                <h3>Recorrentes</h3>
                                <span>{pedidos.data?(pedidos.data.recorrentes.quantidade_clientes*100/totalClients).toFixed():'-'}%</span>
                            </div>
                            <div className='reincidencia-item'>
                                <h3>Não recorrentes</h3>
                                <span>{pedidos.data?(pedidos.data.nao_recorrentes.quantidade_clientes*100/totalClients).toFixed():''}%</span>
                            </div>
                        </div>

                    <h2>Dos {pedidos.data?(pedidos.data.recorrentes.quantidade_clientes*100/totalClients).toFixed():'-'}% Recorrentes:</h2>
                    <div className='sub-box-row'>
                    
                    {pedidos.data
                    ? pedidos.data.reincidencia.slice(0, 10).map(rein=>{
                        return(
                            <div className='reincidencia-item'>
                                <h3>{rein.quantidade_de_clientes}</h3>
                                <span>{(rein.quantidade_de_compras*100/pedidos.data.recorrentes.quantidade_clientes).toFixed(1)}%</span>
                                
                                
                            </div>
                        )
                    })
                    :<></>
                    
                }
                </div>
                </section>
            </section>
            
        
            }
           
            
        </div>
    )
}