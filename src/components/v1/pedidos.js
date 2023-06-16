import { useEffect, useState } from "react"
import Recorrentes from "../recorrencia/recorrentes"
import NaoRecorrente from "../recorrencia/naorecorrente"
import RecorrenciaChart from "../chart"
import './busca-intervalo.css'


import './pedidos.css'

export default function Pedidos(){
        const [selected, setSelected] = useState(true)
        const [interval, setInterval] = useState(false)
        const [minInterval, setMinInterval] = useState('')
        const [maxInterval, setMaxInterval] = useState('')
        
        const filterByInterval = (e)=>{
            setInterval(e.target.checked)
            }
        
        const maxIntervalHandler=(e)=>{
            setMaxInterval(e.target.value)
            }
        
        const minIntervalHandler=(e)=>{
            setMinInterval(e.target.value)
            }
            
          
        
            const caralhada =()=>{

            }
        
        
        return(
            <main>
                <div className="pedidos-header">
                    <h1 onClick={()=>setSelected(false)} className={!selected?"list-title selected":"list-title"}>Clientes Não Recorrentes</h1> 
                    <h1 onClick={()=>setSelected(true)} className={selected?"list-title selected":"list-title"}>Clientes Recorrentes</h1> 
                </div>
                
                {selected?
                    <div>
                        <section>
                            <h1>Filtrar por intervalo?</h1>
                            <li className='search-filter-item uncensored-option search-filter-nav'> 
                                <label>
                                    <input defaultChecked={interval} onChange={filterByInterval} className='uncensored-button' type='checkbox'/>
                                    <span className='check'>
                                        <span className='check-ball'/>
                                    </span>
                                </label>
                            </li>
                        </section>
                        
                       

                        {interval?
                            <div>
                              
                                <section className="display-flex-row busca-intervalo">
                                    De 
                                    <input type={'number'} onChange={minIntervalHandler}/>
                                    Até
                                    <input type={'number'} onChange={maxIntervalHandler}/>
                                    Dias 
                                </section>
                                
                                <Recorrentes 
                                url={'/api/filtro-intervalo/'} 
                                maxInterval={maxInterval} 
                                minInterval={minInterval}
                                caralhada={caralhada} 
                                clientes={[]}/>
                            </div>
                            :
                            
                            <div>
                                <Recorrentes url={'/api/recorrente/'} />
                            </div>}
                   
                    </div>
                        
                       :
                       <NaoRecorrente/>
                       }
                
            </main>
        )   
}

