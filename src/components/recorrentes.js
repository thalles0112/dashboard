import {  useEffect, useState, useCallback } from "react"
import url from '../backend'
import arrow from './ui/img/right-arrow.png'
import './recorrentes.css'

export default function Recorrentes(props){
    
    const [clientes, setClientes] = useState(props.clientes)
    const [loading, setLoading] = useState(null)
    const [pagina, setPagina] = useState(1)
    const [minInterval, setMinInterval] = useState('')
    const [maxInterval, setMaxInterval] = useState('')
 
    useEffect(()=>{
        async function getPedidos(){
             await fetch(`${url}${props.url}?page=${pagina}&min-interval=${props.minInterval}&max-interval=${props.maxInterval}`,{
                 method:'GET',
                 headers:{
                     'Content-Type':'application/json'
                 }
             }).then(resp=>resp.json().then(e=>setClientes(e)))
 
             setLoading(false)
         }
         setLoading(true)
         getPedidos()
     },[])
     
     const recarregar=useCallback(()=>{
  
        async function getPedidos(){
            
            await fetch(`${url}${props.url}?page=${pagina}&min-interval=${props.minInterval}&max-interval=${props.maxInterval}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(resp=>resp.json().then(e=>setClientes(e)))
            
            setLoading(false)
        }
        
        setLoading(true)
        getPedidos()
        

       
    },[props.minInterval, props.maxInterval, props.url])
     
     const nextPagina =useCallback(()=>{
        async function getPedidos(){
            let caralho_de_pagina = parseInt(pagina) +1
            setPagina(caralho_de_pagina)
            
            await fetch(`${url}${props.url}?page=${caralho_de_pagina}&min-interval=${props.minInterval}&max-interval=${props.maxInterval}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(resp=>resp.json().then(e=>setClientes(e)))
            setLoading(false)
        }
        setLoading(true)
        getPedidos()
       
    },[clientes, pagina])
        
        


    const prevPagina =useCallback(()=>{
        async function getPedidos(){
            let caralho_de_pagina = parseInt(pagina) - 1
            setPagina(caralho_de_pagina)
            
          
            await fetch(`${url}${props.url}?page=${caralho_de_pagina}&min-interval=${props.minInterval}&max-interval=${props.maxInterval}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(resp=>resp.json().then(e=>setClientes(e)))
            setLoading(false)
        }
        setLoading(true)
        getPedidos()
    },[clientes, pagina])

    let delayTimer = 1000 
    
    const typeSearch = async(e)=>{
        setPagina(e.target.value)
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function() {
          
            if(parseInt(e.target.value) >= 1){
                changePagina(e.target.value)
                setPagina(e.target.value)
            }
            else{
                
                setPagina(pagina)
            }
            
           
            
        }, 1000)
        
    }

    const changePagina = useCallback(async(search)=>{
        setLoading(true)
        await fetch(`${url}${props.url}?page=${search}&min-interval=${props.minInterval}&max-interval=${props.maxInterval}`).then(
            resp=>{resp.json().then(resp=>setClientes(resp))}
        )
    setLoading(false)
    },[props.url, props.minInterval, props.maxInterval]
    
    )
        
    

     setTimeout(()=>{
        const productContainers = [...document.querySelectorAll('.clients-list')];
        const nxtBtn = [...document.querySelectorAll('.next')];
        const preBtn = [...document.querySelectorAll('.prev')];
        productContainers.forEach((item, i) => {
            let containerDimensions = item.getBoundingClientRect();
            let containerWidth = containerDimensions.width;
            
            if (nxtBtn[i]){
                nxtBtn[i].addEventListener('click', () => {
                item.scrollLeft += containerWidth +16 ;
                
                })}
            
            if (preBtn[i]){
                preBtn[i].addEventListener('click', () => {
                item.scrollLeft -= containerWidth;
                
                })}
            })
       
    }, 2)
   
    
    
    if(loading){
        return(
            <div className="main-pedidos">
                

                {pagina>1?<span className="prev-page-nav">{'<'}</span>:''}
                <span>pagina {pagina}/...</span>
                <span className="next-page-nav">{'>'}</span>
                <div className="medias-wrapper">
                    <div className="medias">
                        <div>
                            <h2>Menor Intervalo</h2>
                            <h2 className="intervalo-medio">carregando...</h2>
                        </div>

                        <div>
                            <h2>Intervalo Médio</h2>
                            <h2 className="intervalo-medio">carregando...</h2>
                        </div>

                        <div>
                            <h2>Maior Intervalo</h2>
                            <h2 className="intervalo-medio">carregando</h2>
                        </div>
                        
                    </div>

                    <div className="medias">
                        <div>
                            <h2>Menor Valor</h2>
                            <h2 className="intervalo-medio">R$ carregando...</h2>
                        </div>
                        <div>
                            <h2>Valor Médio</h2>
                            <h2 className="intervalo-medio">R$ carregando...</h2>
                        </div>
                        <div>
                            <h2>Maior Valor</h2>
                            <h2 className="intervalo-medio">R$ carregando...</h2>
                        </div>
                    </div>
                </div>
                <div className="carregando">
                        
                      carregando...
                        
                </div>
                
               
            </div>
        )
    }
    let intervalo = 0
    let min_intervalo = 0
    let max_intervalo = 0

    let valor_medio = 0
    let min_valor =0
    let max_valor =0
    let total_lenght = 0
    
    try{
        intervalo = clientes[0].resumo.intervalo_medio
        min_intervalo = clientes[0].resumo.intervalo_menor
        max_intervalo = clientes[0].resumo.intervalo_maior
        total_lenght = clientes[0].resumo.total_lenght

        valor_medio = clientes[0].resumo.valor_medio
        max_valor = clientes[0].resumo.valor_maior
        min_valor = clientes[0].resumo.valor_menor
    }
    catch{

    }
    let i = 1

    
    if (!loading || loading == null){
        return(
            <div className="main-pedidos">

                
                <p onClick={recarregar} className="recarregar-button">Atualizar</p>
                
                {pagina>1?
                    <span onClick={prevPagina} className="prev-page-nav">{'<'}</span>
                    :
                    ''
                }
                <span>pagina <input className="input-page" value={pagina} onChange={typeSearch}/>/{total_lenght}</span>
                <span onClick={nextPagina} className="next-page-nav">{'>'}</span>
                <div className="medias-wrapper">
                    <div className="medias">
                        <div>
                            <h2>Menor Intervalo</h2>
                            <h2 className="intervalo-medio">{min_intervalo.toFixed(1)} {min_intervalo> 1?'Dias':'Dia'}</h2>
                        </div>

                        <div>
                            <h2>Intervalo Médio</h2>
                            <h2 className="intervalo-medio">{intervalo.toFixed(1)} Dias</h2>
                        </div>

                        <div>
                            <h2>Maior Intervalo</h2>
                            <h2 className="intervalo-medio">{max_intervalo.toFixed(1)} Dias</h2>
                        </div>
                        
                    </div>

                    <div className="medias">
                        <div>
                            <h2>Menor Valor</h2>
                            <h2 className="intervalo-medio">R$ {min_valor.toFixed(2)}</h2>
                        </div>
                        <div>
                            <h2>Valor Médio</h2>
                            <h2 className="intervalo-medio">R$ {valor_medio.toFixed(2)}</h2>
                        </div>
                        <div>
                            <h2>Maior Valor</h2>
                            <h2 className="intervalo-medio">R$ {max_valor.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
               
                
                <div className="clients-list-wrapper">
                <span className="prev nav-button"><img className="inverted" src={arrow}/></span>
                <span className="next nav-button"><img src={arrow}/></span>
                
                <section className="clients-list">
                    

                    {clientes.slice(1,).map(cliente=>{
                        if (cliente){

                        
                        return(
                        <div key={cliente.cliente} className="client-box" >
                            <div className="client-cpf">Cliente: {cliente.cliente}</div>
                            <div className="client-cpf">Intervalo: {String(cliente.intervalo).slice(0,4)} Dias</div>
                            <div className="client-cpf">T. Médio: R$ {cliente.ticket_medio.toFixed(2)}</div>
                                <div className="scroll-box">
                                    {cliente.pedidos.map(p=>
                                        <div className="pedido-details" key={String(cliente.cliente)+String(p.data)+String(p.valor)+String(Math.random())}>
                                            <div>
                                                <div className="order-date">{p.data.split('-')[2]}/{p.data.split('-')[1]}/{p.data.split('-')[0]}</div>
                                                <div className="order-date">R$ {p.valor}</div>
                                            </div>
                                            <div className="order-date pedido">Pedido Nº <span className="n_pedido">{p.n_pedido}</span></div>
                                    
                                        </div>
                                    )}
                                </div>
                                <div className="card-index">{i++}</div>
                        </div>
                        
                        )}
                    })} 
                    </section>
                </div>

               
            </div>
        )
    }
    
}