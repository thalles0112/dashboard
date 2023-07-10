import { useEffect, useState } from "react";
import NewChart from "./test-chart";
import {BsArrowDownUp} from 'react-icons/bs'
import axios from "axios";
import url from "../../backend";
import './test.css'

/*
const [classification, setClassification] = useState('ocorrencias')
const [ordering, setOrdering] = useState('big2small')
const [bars, setBars] = useState(20)
return(
    <div>
        <div>
            <label>Classification: <strong>{classification}</strong></label>
            <label> Ordering: <strong>{ordering==='small2big'?'Menor para o maior':'Maior para o menor'}</strong></label>
        </div>
        <button onClick={()=>{ordering=='big2small'?setOrdering('small2big'):setOrdering('big2small')}}><BsArrowDownUp/></button>
        <button onClick={()=>{classification=='ocorrencias'?setClassification('intervalo'):setClassification('ocorrencias')}}>Classification</button>
        <input onChange={(e)=>{setBars(e.target.value)}} defaultValue={bars} type="number"/>
       <NewChart ordering={ordering} classification={classification} bars={bars}/>
    </div>
)
*/

export default function Test(){
    const [res,setRes] = useState([])
    useEffect(()=>{
        async function get(){
            const resp = await axios.get(`${url}/apiv2/produtos-recorrentes/?data_inicial=2022-11-01&data_final=2022-11-30`)
            if(resp.data){

                setRes(resp.data.sort(function(a, b){
                    return b[1].count - a[1].count
                }))
            }
        }
        get()
    },[])

   

    return(
        <div>
            <h1>Buceta, {res.length} produtos</h1>
            <section className="vertical-scroll">
                {res.map(r=>{
                    return(
                        <div className="wrapper">
                            <div>{r[1].sku_nome}</div>
                            <div>{r[1].sku_ref}</div>
                            <div><a href={`https://honeybe.com.br${r[1].sku_url}`} target="_blank">ver no site</a></div>
                            <div>Compras: {r[1].count}</div>
                        </div>
                    )
                })}
            </section>
        </div>
    )

    
}