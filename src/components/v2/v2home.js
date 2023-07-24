import './style.css'
import { useEffect, useState } from 'react'
import FiltroIntervalo from './filtro-intervalo'
import { AiOutlineCalendar } from 'react-icons/ai'
import { getNovosPerPeriod, getPedidos, getRecorrentPerPeriod } from '../services/requests'
import InfoCard from './info-card'
import {BsLayoutSplit} from 'react-icons/bs'
import { SideBar } from './ui/sidebar'
import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading'


import { PeriodSelector } from './ui/datepicker/datepicker'
  

export default function V2Home(){
    let i_dt = new Date(); 
    i_dt.setMonth(i_dt.getMonth()-1);
    i_dt.setDate(1)

    let f_dt = new Date(); 
    f_dt.setMonth(f_dt.getMonth()-1);

    const [novos, setNovos] = useState()
    const [recorrentes, setRecorrentes] = useState()
    const [horizontal, setHorizontal] = useState(true)
    const [totalClients,setTotalClients] = useState(0)

    const [data_inicial_rec, setData_inicial_rec] = useState(i_dt.toISOString().split('T')[0])
    const [data_final_rec, setData_final_rec] = useState(f_dt.toISOString().split('T')[0])
    const [data_inicial_novos, setData_inicial_novos] = useState(i_dt.toISOString().split('T')[0])
    const [data_final_novos, setData_final_novos] = useState(f_dt.toISOString().split('T')[0])
    const {token} = useSelector(state=>state.auth)

    const [novosloading, setNovosLoading] = useState(false)
    const [recloading, setRecLoading] = useState(false)
    
    

    useEffect(()=>{
        async function getRecorrents(){
            const resp = await getRecorrentPerPeriod(data_inicial_rec, data_final_rec, token)
            console.log(resp.code)
            if (resp.data){
                setRecorrentes(resp.data)
                setRecLoading(false)
            }
        
           
            setRecLoading(false)
        }
        setRecLoading(true)
        getRecorrents()
     },[data_inicial_rec, data_final_rec, token])

    useEffect(()=>{
        async function getNovos(){
            const resp = await getNovosPerPeriod(data_inicial_novos, data_final_novos, token)
            
            if (resp.data){
                setNovos(resp.data)
                setNovosLoading(false)
            }
   
        }
        setNovosLoading(true)
        getNovos()
     },[data_inicial_novos, data_final_novos, token])


    useEffect(()=>{
        function calculateTotalClients(){
            
            let total = 0
            try{
                total = novos.qtd_clientes + recorrentes.qtd_clientes
            }
            catch{

            }
            setTotalClients(total)
        }
        calculateTotalClients()
     },[recorrentes, novos])
 
    function setRecorrentDatas(initial, final){
        setData_inicial_rec(initial)
        setData_final_rec(final)
    }

    function setNovosDatas(initial, final){
        setData_inicial_novos(initial)
        setData_final_novos(final)
    }


    

    return(
        <div id='v2home' style={{flexDirection:horizontal?'row':'column', justifyContent: horizontal?'space-evenly':'flex-start'}}>
            
            <section style={{ height:horizontal?'unset':'100vh'}}>
                <SideBar/>
               
                <div onClick={()=>{setHorizontal(!horizontal)}} className='organization-control'>
                    {horizontal
                        ?<span><BsLayoutSplit  size={25}/> {horizontal?'horizontal':'vertical'}</span>
                        :<span><BsLayoutSplit id='rotate90' size={25}/>{horizontal?' horizontal':' vertical'}</span>
                    }
                </div>
                
                <div className='black-box first'>
                    <div>
                        <div className='flex justify-between align-center'>
                            <h2 className='flex'>Pedidos Não recorrentes </h2>
                            <span>{novosloading?<ReactLoading type='bars' width={30}/>:''}</span>
                        </div>
                        
                        <PeriodSelector bucetador={setNovosDatas}/>
                    </div>
                    
                
                        <div className='sub-box-row'>
                            <div>
                                <h3>Quantidade de Clientes</h3>
                            <span>{novos?novos.qtd_clientes:'-'}</span> 
                            <InfoCard text={'Quantidade de clientes não recorrentes.'}/>
                            </div>

                            <div>
                                <h3>Menor valor</h3>
                            <span>R$ {novos?novos.min_vlr.toFixed(2):'-'}</span> 
                            <InfoCard text={'Menor valor registrado que um cliente não recorrente já comprou no site.'}/>
                            </div>

                            <div>
                                <h3>Ticket medio</h3>
                            <span>{novos?novos.avg_vlr.toFixed(2):'-'}</span> 
                            <InfoCard text={'Ticket Médio dos clientes que não voltaram a comprar no site.'}/>
                            </div>

                            <div>
                                <h3>Maior valor</h3>
                            <span>{novos?novos.max_vlr.toFixed(2):'-'}</span> 
                            <InfoCard text={'Maior valor registrado que um cliente não recorrente já comprou no site.'}/>
                            </div>

                        </div>
                        <div className='sub-box-row'>
                            <div>
                                <h3>Faturamento Total</h3>
                                <span>R$ {novos?novos.ttl_vlr.toFixed(2):'-'}</span>
                            </div>
                            <div>
                                <h3>Quantidade de pedidos</h3>
                                <span>{novos?novos.qtd_pedidos:'-'}</span>
                            </div>
                        </div>
                </div>

                    <div className='black-box second'>
                        <div>
                        <div className='flex justify-between align-center'>
                            <h2 className='flex'>Pedidos Recorrentes </h2>
                            <span>{recloading?<ReactLoading type='bars' width={30}/>:''}</span>
                        </div>
                            <PeriodSelector bucetador={setRecorrentDatas}/>
                        </div>
                        
                        
                        <div className='sub-box-row'>
                            
                                
                                <div>
                                    <h3>Quantidade de Clientes</h3>
                                    <span>{recorrentes?recorrentes.qtd_clientes:'-'}</span>
                                    <InfoCard text={'Quantidade de clientes recorrentes.'}/>
                                </div>
                                <div>
                                    <h3>Menor valor</h3>
                                    <span>R$ {recorrentes?recorrentes.min_vlr.toFixed(2):'-'}</span>
                                    <InfoCard text={'Menor valor registrado que um cliente recorrente já comprou no site.'}/>
                                </div>
                                <div>
                                    <h3>Ticket medio</h3>
                                    <span>R$ {recorrentes?recorrentes.avg_vlr.toFixed(2):'-'}</span>
                                    <InfoCard text={'Ticket Médio dos clientes recorrentes'}/>
                                </div>
                                <div>
                                    <h3>Maior valor</h3>
                                    <span>R$ {recorrentes?recorrentes.max_vlr.toFixed(2):'-'}</span>
                                    <InfoCard text={'Maior valor registrado que um cliente recorrente já comprou no site.'}/>
                                </div>
                                <div>
                                    <h3>Faturamento Total</h3>
                                    <span>R$ {recorrentes?recorrentes.ttl_vlr.toFixed(2):'-'}</span>
                                </div>
                        </div>


                        <div className='sub-box-row'>
                            <div>
                                <h3>Quantidade de pedidos</h3>
                                <span>{recorrentes?recorrentes.qtd_pedidos:'-'}</span>
                            </div>
                                
                                <div>
                                    <h3><AiOutlineCalendar/>Menor intervalo</h3>
                                    <span>{recorrentes?recorrentes.min_intervalo:'-'} Dias</span>
                                    <InfoCard text={'Menor intervalo de tempo entre uma compra e outra.'}/>
                                </div>
                                <div>
                                    <h3><AiOutlineCalendar/>Intervalo médio</h3>
                                    <span>{recorrentes?recorrentes.avg_intervalo:'-'} Dias</span>
                                    <InfoCard text={'Tempo médio que um cliente leva para voltar a comprar no site. Este intervalo foi calculado com média aritimética, então pode haver intervalos muito pequenos e muito grandes e é como se fosse um borrão de todos os intervalos, ou seja, não é muito preciso.'}/>
                                </div>
                                <div>
                                    
                                    <h3><AiOutlineCalendar/>Maior intervalo</h3>
                                    <span>{recorrentes?recorrentes.max_intervalo:'-'} Dias</span>
                                    <InfoCard text={'Maior tempo que um cliente já levou para voltar a comprar no site.'}/>
                                </div>
                        </div>
               
                    
                </div>
            </section>
          
            
         

            <section className='resumo '>
            
                <section className='reincidencia-counter black-box'>
                    <h2>Reincidência</h2><span>Aqui são contabilizados os clientes que compraram X vezes no site</span>
                    <div className='sub-box-row'>
                            <div className='reincidencia-item'>
                                <h3>Quantidade total de clientes</h3>
                                <span>{recorrentes && novos? totalClients:'-'}</span>
                            </div>
                            <div className='reincidencia-item'>
                                <h3>Recorrentes</h3>
                                <span>{recorrentes && novos?(recorrentes.qtd_clientes*100/totalClients).toFixed(2):'-'}%</span>
                            </div>
                            <div className='reincidencia-item'>
                                <h3>Não recorrentes</h3>
                                <span>{recorrentes && novos?(novos.qtd_clientes*100/totalClients).toFixed(2):''}%</span>
                            </div>
                        </div>

                    <h2>Dos {recorrentes && novos?(recorrentes.qtd_clientes*100/totalClients).toFixed(2):'-'}% Recorrentes:</h2>
                    <div className='sub-box-row'>
                    
                    {recorrentes && novos
                    ? recorrentes.reincidencia.slice(0, 10).map(rein=>{
                        return(
                            <div className='reincidencia-item'>
                                <h3>{rein.intervalo} Compras:</h3>
                                <h3>{rein.quantidade} cliente{rein.quantidade>1?'s':''}</h3>
                                <span>{(rein.quantidade*100/recorrentes.qtd_clientes).toFixed(2)}%</span>
                                
                                
                            </div>
                        )
                    })
                    :<></>
                    
                }
                </div>
                </section>
            </section>
            
        
            
            
            
        </div>
    )
}