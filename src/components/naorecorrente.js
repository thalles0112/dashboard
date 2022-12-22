import { useEffect, useState } from "react"


export default function NaoRecorrente(){
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(null)


    useEffect(()=>{
       async function getPedidos(){

            await fetch('https://hnb.pythonanywhere.com/api/nao-recorrente/?limiter=100',{
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
    
    
    if(loading){
        return(
            <div>
                <h1 className="list-title">Clientes Não Recorrentes</h1>
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
                
                <div className="carregando">
                        
                      carregando...
                        
                </div>
            </div>
        )
    }
    
    let valor_medio = 0
    let min_valor = 0
    let max_valor = 0
    try{
        valor_medio = clientes[0].resumo.valor_medio
        min_valor = clientes[0].resumo.valor_menor
        max_valor = clientes[0].resumo.valor_maior
    }
    catch{

    }
    
    if (!loading || loading == null){
        return(
            <div className="main-pedidos">
                
                <div className="pedidos-header">
                    <h1 className="list-title">Clientes Não Recorrentes</h1> 
                    
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
                <div className="clients-list-wrapper">
                <span className="prev nav-button">{'<'}</span>
                <span className="next nav-button">{'>'}</span>
                    <section className="clients-list">
                        {clientes.slice(1,).map(cliente=>{
                            return(
                            <div key={cliente.cliente} className="client-box" >
                                <div className="client-cpf">Cliente: {cliente.cliente}</div>
                                    <div className="scroll-box">
                                        {cliente.pedidos.map(p=>
                                            <div className="pedido-details" key={String(cliente.cliente)+String(p.data)+String(p.valor)}>
                                                <div className="order-date">{p.data.split('-')[2]}/{p.data.split('-')[1]}/{p.data.split('-')[0]}</div>
                                                <div className="order-date">R$ {p.valor}</div>
                                        
                                            </div>
                                        )}
                                    </div>
                            </div>
                            
                            )
                        })} 
                    </section>
                </div>
            </div>
        )
    }
    
}