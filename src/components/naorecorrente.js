import { useCallback, useEffect, useState } from "react"
import url from "../backend"
import arrow from './ui/img/right-arrow.png'

export default function NaoRecorrente(){
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(null)
    const [pagina, setPagina] = useState(1)


    useEffect(()=>{
       async function getPedidos(){

            await fetch(url+'/api/nao-recorrente/?page=1',{
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

    setTimeout(()=>{
        const productContainers = [...document.querySelectorAll('.clients-list')];
        const nxtBtn = [...document.querySelectorAll('.next')];
        const preBtn = [...document.querySelectorAll('.prev')];
        productContainers.forEach((item, i) => {
            let containerDimensions = item.getBoundingClientRect();
            let containerWidth = containerDimensions.width;
            
            if (nxtBtn[i]){
                nxtBtn[i].addEventListener('click', () => {
                item.scrollLeft += containerWidth + 40 ;
                
                })}
            
            if (preBtn[i]){
                preBtn[i].addEventListener('click', () => {
                item.scrollLeft -= containerWidth;
                
                })}
            })
       
    }, 2)

    const nextPagina =useCallback(()=>{
        async function getPedidos(){
            let caralho_de_pagina = parseInt(pagina) +1
            setPagina(caralho_de_pagina)
            
            await fetch(`${url}/api/nao-recorrente/?page=${caralho_de_pagina}`,{
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
            
          
            await fetch(`${url}/api/nao-recorrente/?page=${caralho_de_pagina}`,{
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
        await fetch(`${url}/api/nao-recorrente/?page=${search}`).then(
            resp=>{resp.json().then(resp=>setClientes(resp))}
        )
    setLoading(false)
    },[]
    
    )

    if(loading){
        return(
            <div>
              
                {pagina>1?<span className="prev-page-nav">{'<'}</span>:''}
                <span>pagina {pagina}/...</span>
                <span className="next-page-nav">{'>'}</span>
                <div className="medias-wrapper">
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
    
    let valor_medio = 0
    let min_valor = 0
    let max_valor = 0
    let total_lenght = 0
    try{
        valor_medio = clientes[0].resumo.valor_medio
        min_valor = clientes[0].resumo.valor_menor
        max_valor = clientes[0].resumo.valor_maior
        total_lenght = clientes[0].resumo.total_lenght
    }
    catch{

    }
    
    if (!loading || loading == null){
        return(
            <div className="main-pedidos">
                
               
                {pagina>1?
                    <span onClick={prevPagina} className="prev-page-nav">{'<'}</span>
                    :
                    ''
                }
                <span>pagina <input className="input-page" onChange={typeSearch} value={pagina}/>/{total_lenght}</span>
                <span onClick={nextPagina} className="next-page-nav">{'>'}</span>
                <div className="medias-wrapper">
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
                        {clientes && clientes.slice(1,).map(cliente=>{
                            
                            try{
                                return(
                                    <div key={String(cliente.cliente)+String(Math.random)} className="client-box" >
                                        <div className="client-cpf">Cliente: {cliente.cliente}</div>
                                            <div className="scroll-box">
                                                {cliente && cliente.pedidos.map(p=>
                                                   <div className="pedido-details" key={String(cliente.cliente)+String(p.data)+String(p.valor)+String(Math.random())}>
                                                   <div>
                                                       <div className="order-date">{p.data.split('-')[2]}/{p.data.split('-')[1]}/{p.data.split('-')[0]}</div>
                                                       <div className="order-date">R$ {p.valor}</div>
                                                   </div>
                                                   <div className="order-date pedido">Pedido Nº <span className="n_pedido">{p.n_pedido}</span></div>
                                           
                                               </div>
                                                )}
                                            </div>
                                    </div>
                                    
                                    )
                            }
                            catch(e){
                                return(
                                    <div>{String(e)}</div>
                                )
                            }
                            
                        })} 
                    </section>
                </div>
            </div>
        )
    }
    
    }