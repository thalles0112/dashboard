import { useCallback, useState } from "react"
import { getPedidosFiltrados } from "../services/requests"
import InfoCard from "./info-card"
import ReactLoading from 'react-loading'
import { useSelector } from "react-redux"

export default function FiltroIntervalo(){
    const [minInterval, setMinInterval] = useState(0)
    const [maxInterval, setMaxInterval] = useState(0)
    const [pedidos, setPedidos] = useState({})
    const [loading, setLoading] = useState(false)
    const {token} = useSelector(state=>state.auth)
    

    const maxIntervalHandler=(e)=>{
        setMaxInterval(e.target.value)
        }
    
    const minIntervalHandler=(e)=>{
        setMinInterval(e.target.value)
       
        }
    
    const filter = useCallback(async()=>{
        setLoading(true)
        const resp = await getPedidosFiltrados(maxInterval, minInterval, token)
        if (resp.data){
            
            setPedidos(resp)
            setLoading(false)
        }
        else{
            setLoading(false)
            window.alert('ops, aconteceu algum erro. Tente alterar os filtros e tente denovo')
        }
        
        
    },[minInterval, maxInterval])
        

    return(
        <div>

            <section className="filtro-intervalo">
                
                <div>
                    
                    <span>De </span><input type={'number'} defaultValue={0} onChange={minIntervalHandler}/><span>dias</span>
                    <div></div>
                    <span>Até </span><input type={'number'} defaultValue={0} onChange={maxIntervalHandler}/><span>dias</span>
                    <div>
                    {!loading

                    ?<div><button id={`filter-button`} className={`${Number(maxInterval) < Number(minInterval)? 'disabled':'enabled'}`} onClick={Number(maxInterval) < Number(minInterval)?()=>{}:filter}>Filtrar</button></div>
                    :<div id="filter-button"><ReactLoading type="bars" width={'10%'} height={'10%'}/></div>
                    }
                    </div>
                    
                </div>

                <div  className="sub-box-row">
                    <div>
                        <h3>Quantidade de clientes</h3>
                        <span>{pedidos.data?pedidos.data.quantidade_clientes.toFixed(0):'-'}</span>
                        <InfoCard text={'Quantidade de clientes que voltaram a comprar no site após o período de tempo especificado.'}/>
                    </div>    
                </div>

            </section>

            <div  className="sub-box-row">
           
                <div>
                    <h3>Menor valor</h3>
                    <span>R$ {pedidos.data?pedidos.data.valor_menor.toFixed(2):'-'}</span>
                    <InfoCard text={'Menor receita entre os clientes que voltaram a comprar no site após o período de tempo especificado.'}/>
                </div>
                <div>
                    <h3>Ticket medio</h3>
                    <span>R$ {pedidos.data?pedidos.data.valor_medio.toFixed(2):'-'}</span>
                    <InfoCard text={'Receita média entre os clientes que voltaram a comprar no site após o período de tempo especificado.'}/>
                </div>
                <div>
                    <h3>Maior valor</h3>
                    <span>R$ {pedidos.data?pedidos.data.valor_maior.toFixed(2):'-'}</span>
                    <InfoCard text={'Maior receita entre os clientes que voltaram a comprar no site após o período de tempo especificado.'}/>
                </div>
            </div>
        </div>    
    )
}