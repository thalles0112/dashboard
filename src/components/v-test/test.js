import { useState } from "react";
import NewChart from "./test-chart";

export default function Test(){


    const [classification, setClassification] = useState('ocorrencias')
    const [ordering, setOrdering] = useState('big2small')
    const [bars, setBars] = useState(20)



    return(
        <div>
            <button onClick={()=>{ordering=='big2small'?setOrdering('small2big'):setOrdering('big2small')}}>Ordering</button>
            <button onClick={()=>{classification=='ocorrencias'?setClassification('intervalo'):setOrdering('ocorrencias')}}>Classification</button>
            <input onChange={(e)=>{setBars(e.target.value)}} defaultValue={bars} type="number"/>
           <NewChart ordering={ordering} classification={classification} bars={bars}/>
        </div>
    )
}