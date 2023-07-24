import { useEffect, useRef, useState } from "react";
import './box.css'
import './test.css'
import { getNovosPerPeriod, getRecorrentPerPeriod } from "../services/requests";
import { useSelector } from "react-redux";

export default function Test(){
    const [active, setActive] = useState('home')
    const [res, setRes] = useState('')
    const [novoRes, setNovoRes] = useState('')
    const videoRef = useRef()
    const {token} = useSelector(state=>state.auth)
    
   function activeSetter(e){
    setActive(e)
   }

   useEffect(()=>{
        async function get(){
            const resp = await getRecorrentPerPeriod('2022-12-01', '2022-12-31', token)
            if (resp.data){
                setRes(resp.data)
            }
        }
        get()
   },[active])

   useEffect(()=>{
    async function get(){
        const resp = await getNovosPerPeriod('2022-12-01', '2022-12-31', token)
        if (resp.data){
            setNovoRes(resp.data)
        }
    }
    get()
},[active])

  

    return(
        <div>
           <h1 className="font-big">{'<Pagina de testes/> 🔧'}</h1>
            <button onClick={()=>{setActive(!active)}}>Reload</button>
           <div>
           <h1>Recorrentes</h1>
                {JSON.stringify(res)}
               
                <div className="beautiful-border my-5">
                    <div>
                        <h1>Min Intervalo:</h1>
                        {res.min_intervalo} Dias
                    </div>
                    <div>
                        <h1>Avg Intervalo:</h1>
                        {res.avg_intervalo} Dias
                    </div>
                    <div>
                        <h1>Max Intervalo:</h1>
                        {res.max_intervalo} Dias
                    </div>
                </div>

                <div className="beautiful-border my-5">
                    <div>
                        <h1>Min Valor:</h1>
                        R$ {res.min_vlr}
                    </div>
                    <div>
                        <h1>Avg Valor:</h1>
                        R$ {res.avg_vlr}
                    </div>
                    <div>
                        <h1>Max Valor:</h1>
                        R$ {res.max_vlr}
                    </div>
                    <div>
                        <h1>Total Valor:</h1>
                        R$ {res.ttl_vlr}
                    </div>
                </div>
                <h1>Novos</h1>
                {JSON.stringify(novoRes)}
                <div className="beautiful-border my-5">
                    <div>
                        <h1>Min Valor:</h1>
                        R$ {novoRes.min_vlr}
                    </div>
                    <div>
                        <h1>Avg Valor:</h1>
                        R$ {novoRes.avg_vlr}
                    </div>
                    <div>
                        <h1>Max Valor:</h1>
                        R$ {novoRes.max_vlr}
                    </div>
                    <div>
                        <h1>Total Valor:</h1>
                        R$ {novoRes.ttl_vlr}
                    </div>
                </div>
                </div>
        </div>
    )

    
}