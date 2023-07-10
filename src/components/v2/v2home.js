import './style.css'
import { useEffect, useState } from 'react'
import FiltroIntervalo from './filtro-intervalo'
import { AiOutlineCalendar } from 'react-icons/ai'
import { getNovosPerPeriod, getPedidos, getRecorrentPerPeriod } from '../services/requests'
import InfoCard from './info-card'
import {BsLayoutSplit} from 'react-icons/bs'
import { SideBar } from './ui/sidebar'
import { useSelector } from 'react-redux'

import { PeriodSelector } from './ui/datepicker/datepicker'
  

export default function V2Home(){
    const [pedidos, setPedidos] = useState({})
    const [horizontal, setHorizontal] = useState(true)
    const [lastDate, setLastDate] = useState('-')
    const [totalClients,setTotalClients] = useState(0)

    const [data_inicial_rec, setData_inicial_rec] = useState(new Date())
    const [data_final_rec, setData_final_rec] = useState(new Date())

    const [data_inicial_novos, setData_inicial_novos] = useState(new Date().toISOString().split('T')[0])
    const [data_final_novos, setData_final_novos] = useState(new Date().toISOString().split('T')[0])
    const {token} = useSelector(state=>state.auth)
    
    

    useEffect(()=>{
        async function getRecorrents(){
            const resp = await getRecorrentPerPeriod(data_inicial_rec, data_final_rec, token)
            
            if (resp.data){
                setPedidos({...pedidos, 'recorrentes':resp.data})
                
            }
        }
        getRecorrents()
     },[data_inicial_rec, data_final_rec])

    useEffect(()=>{
        async function getNovos(){
            const resp = await getNovosPerPeriod(data_inicial_novos, data_final_novos, token)
            
            if (resp.data){
                setPedidos({...pedidos, 'nao_recorrentes':resp.data})
                
            }
        }
        getNovos()
     },[data_inicial_novos, data_final_novos])


    useEffect(()=>{
        function calculateTotalClients(){
            
            let total = 0
            try{
                total = pedidos.recorrentes.recorrentes.quantidade_clientes + pedidos.nao_recorrentes.quantidade_clientes
            }
            catch{

            }
            setTotalClients(total)
        }
        calculateTotalClients()
     },[pedidos])
 
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
                        <h2>Pedidos Não recorrentes</h2>
                        <PeriodSelector bucetador={setNovosDatas}/>
                    </div>
                    
                
                        <div className='sub-box-row'>
                            <div>
                                <h3>Quantidade</h3>
                            <span>{pedidos.nao_recorrentes?pedidos.nao_recorrentes.quantidade_clientes:'-'}</span> 
                            <InfoCard text={'Quantidade de clientes não recorrentes.'}/>
                            </div>

                            <div>
                                <h3>Menor valor</h3>
                            <span>R$ {pedidos.nao_recorrentes?pedidos.nao_recorrentes.valor_menor.toFixed(2):'-'}</span> 
                            <InfoCard text={'Menor valor registrado que um cliente não recorrente já comprou no site.'}/>
                            </div>

                            <div>
                                <h3>Ticket medio</h3>
                            <span>{pedidos.nao_recorrentes?pedidos.nao_recorrentes.valor_medio.toFixed(2):'-'}</span> 
                            <InfoCard text={'Ticket Médio dos clientes que não voltaram a comprar no site.'}/>
                            </div>

                            <div>
                                <h3>Maior valor</h3>
                            <span>{pedidos.nao_recorrentes?pedidos.nao_recorrentes.valor_maior.toFixed(2):'-'}</span> 
                            <InfoCard text={'Maior valor registrado que um cliente não recorrente já comprou no site.'}/>
                            </div>
                            
                           

                        </div>
                </div>

                    <div className='black-box second'>
                        <div>
                            <h2>Pedidos Recorrentes</h2>
                            <PeriodSelector bucetador={setRecorrentDatas}/>
                        </div>
                        
                        
                        <div className='sub-box-row'>
                            
                                
                                <div>
                                    <h3>Quantidade</h3>
                                    <span>{pedidos.recorrentes?pedidos.recorrentes.recorrentes.quantidade_clientes:'-'}</span>
                                    <InfoCard text={'Quantidade de clientes recorrentes.'}/>
                                </div>
                                <div>
                                    <h3>Menor valor</h3>
                                    <span>R$ {pedidos.recorrentes?pedidos.recorrentes.recorrentes.valor_menor.toFixed(2):'-'}</span>
                                    <InfoCard text={'Menor valor registrado que um cliente recorrente já comprou no site.'}/>
                                </div>
                                <div>
                                    <h3>Ticket medio</h3>
                                    <span>R$ {pedidos.recorrentes?pedidos.recorrentes.recorrentes.valor_medio.toFixed(2):'-'}</span>
                                    <InfoCard text={'Ticket Médio dos clientes recorrentes'}/>
                                </div>
                                <div>
                                    <h3>Maior valor</h3>
                                    <span>R$ {pedidos.recorrentes?pedidos.recorrentes.recorrentes.valor_maior.toFixed(2):'-'}</span>
                                    <InfoCard text={'Maior valor registrado que um cliente recorrente já comprou no site.'}/>
                                </div>
                        </div>


                        <div className='sub-box-row'>
                            
                                
                                <div>
                                    <h3><AiOutlineCalendar/>Menor intervalo</h3>
                                    <span>{pedidos.recorrentes?pedidos.recorrentes.recorrentes.intervalo_menor.toFixed(0):'-'} Dias</span>
                                    <InfoCard text={'Menor intervalo de tempo entre uma compra e outra.'}/>
                                </div>
                                <div>
                                    <h3><AiOutlineCalendar/>Intervalo médio</h3>
                                    <span>{pedidos.recorrentes?pedidos.recorrentes.recorrentes.intervalo_medio.toFixed(0):'-'} Dias</span>
                                    <InfoCard text={'Tempo médio que um cliente leva para voltar a comprar no site. Este intervalo foi calculado com média aritimética, então pode haver intervalos muito pequenos e muito grandes e é como se fosse um borrão de todos os intervalos, ou seja, não é muito preciso.'}/>
                                </div>
                                <div>
                                    
                                    <h3><AiOutlineCalendar/>Maior intervalo</h3>
                                    <span>{pedidos.recorrentes?pedidos.recorrentes.recorrentes.intervalo_maior.toFixed(0):'-'} Dias</span>
                                    <InfoCard text={'Maior tempo que um cliente já levou para voltar a comprar no site.'}/>
                                </div>
                        </div>
                    

                    <div>
                        <h2>Filtro por intervalo</h2>
                        <FiltroIntervalo/>
                      
                    </div>
                    
                </div>
            </section>
          
            
         

            <section className='resumo '>
            
                <section className='reincidencia-counter black-box'>
                    <h2>Reincidência</h2><span>Aqui são contabilizados os clientes que compraram X vezes no site</span>
                    <div className='sub-box-row'>
                            <div className='reincidencia-item'>
                                <h3>Quantidade total de clientes</h3>
                                <span>{pedidos.recorrentes? totalClients:'-'}</span>
                            </div>
                            <div className='reincidencia-item'>
                                <h3>Recorrentes</h3>
                                <span>{pedidos.recorrentes?(pedidos.recorrentes.recorrentes.quantidade_clientes*100/totalClients).toFixed():'-'}%</span>
                            </div>
                            <div className='reincidencia-item'>
                                <h3>Não recorrentes</h3>
                                <span>{pedidos.recorrentes?(pedidos.nao_recorrentes.quantidade_clientes*100/totalClients).toFixed():''}%</span>
                            </div>
                        </div>

                    <h2>Dos {pedidos.recorrentes?(pedidos.recorrentes.recorrentes.quantidade_clientes*100/totalClients).toFixed():'-'}% Recorrentes:</h2>
                    <div className='sub-box-row'>
                    
                    {pedidos.recorrentes
                    ? pedidos.recorrentes.reincidencia.slice(0, 10).map(rein=>{
                        return(
                            <div className='reincidencia-item'>
                                <h3>{rein.quantidade_de_clientes}</h3>
                                <span>{(rein.quantidade_de_compras*100/pedidos.recorrentes.recorrentes.quantidade_clientes).toFixed(1)}%</span>
                                
                                
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