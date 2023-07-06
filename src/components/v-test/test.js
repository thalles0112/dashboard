import { useState } from "react";
import NewChart from "./test-chart";
import {BsArrowDownUp} from 'react-icons/bs'

export default function Test(){


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
}