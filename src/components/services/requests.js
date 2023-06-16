import url from "../../backend"
import axios from 'axios'
import { status } from "./utils"


export function getPedidosNaoRecorrentes(page, token){

    return fetch(`${url}/api/nao-recorrente/?page=${page}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `token ${token}`
        }
    }).then(resp=>resp.json())
}





export function getPedidosRecorrentes(pagina, minInterval, maxInterval, token){
    return fetch(`${url}/api/recorrente/?page=${pagina}&min-interval=${minInterval}&max-interval=${maxInterval}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `token ${token}`
        }
    }).then(resp=>resp.json())
}










export function getPedidos(token){
    return axios.get(`${url}/apiv2/pedidos`, {
        method: 'GET',
        headers:{
            'Content-Type':'Application/json',
            'Authorization': `token ${token}`
        }
    })
}

export function getPedidosFiltrados(maxInterval, minInterval, token){
    return axios.get(`${url}/apiv2/filtro-intervalo?max-interval=${maxInterval}&min-interval=${minInterval}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'Application/json',
            'Authorization': `token ${token}`
        }
    })
}


export function searchPedidos(selected, value, token){
    return axios.get(`${url}/apiv2/caralho?${selected}=${value}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'Application/json',
            'Authorization': `token ${token}`
        }
    })
}

export function getChartData(ordering, classification, bars, token){
    return fetch(`${url}/apiv2/intervalos-v2?ordering=${ordering}&classification=${classification}&bars=${bars}`,{
        'method':'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
    }).then(resp=>resp.json())}

export function buscaCpf(searchText, token){
    return fetch(`${url}/api/busca-cpf/?cpf=${searchText}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
    }).then(resp=>resp.json())
}
    


export function auth(credentials){

    return fetch(`${url}/api/auth/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(status).catch(() => {})
}



