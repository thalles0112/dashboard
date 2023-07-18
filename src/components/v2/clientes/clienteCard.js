import { useState } from "react"

export default function ClientCard({cliente, faturamento_total}){
    const [produtosShown, setProdutosShown] = useState(false)
    const intervalos = []
    function sum(arr){
        let total = 0
        for(let i = 0; i < arr.length; i++){
            
           total += arr[i] 
        }
        return total
    }
    
    return(
        <div className="flex flex-col beautiful-border h-auto client-card br-5">
                            
            <div className="flex justify-between">
                <div className="flex flex-col text-left">
                    <span>Nome: {cliente.nome}</span>
                    <span>CPF: {`${cliente.cpf}`.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')}</span>
                </div>
                
                <div className="flex flex-col text-left">
                    <span>Pedidos: {cliente.pedidos}</span>
                    <span>Ticket Médio: R$ {(cliente.valor_total/cliente.pedidos).toFixed(2)}</span>
                    <span>Total: {cliente.valor_total.toFixed(2)}</span>
                    <span>{(cliente.valor_total*100 / faturamento_total).toFixed(2)}% do faturamento</span>
                    
                </div>
                
                
            </div>

            <div>
                Intervalo Médio entre compras: {cliente.datas && cliente.datas.sort().map((data, i)=>{
                    const diff = new Date(cliente.datas[i + 1]).getTime() - new Date(cliente.datas[i]).getTime()
                    if(diff){
                        intervalos.push(diff)
                    }
                    else {
                        intervalos.push(0)
                    }  
                })}
                 {sum(intervalos) / (1000 * 3600 * 24)} dias
            </div>
           
            <div>
                
                <div className={`${produtosShown?'open':'close'}`}>
                    {produtosShown && cliente.produtos.sort((a,b)=>new Date(a.data) - new Date(b.data)).map(pedidos=>{
                       return(
                        <div key={pedidos.sku_ref} className="products pedido">
                            <div>{new Date(pedidos.data).toLocaleDateString()} - R$ {pedidos.valor.toFixed(2)}</div>
                            <div className="flex flex-col">
                                {pedidos.lista_produtos.map(produto=>{
                                    return(
                                        <a key={produto.sku_url} className="product my-5" href={"https://honeybe.com.br"+produto.sku_url} target="_blank">{produto.sku_nome}</a>
                                    )
                                })}
                            </div>
                        
                        </div>
                       )
                        
                    })}
                </div>
                   
            </div>
            <button onClick={()=>{setProdutosShown(!produtosShown)}}>{!produtosShown?'Ver produtos':'Fechar'}</button>
        </div>
    )
}