import { useEffect } from "react";
import { getChartData } from "../services/requests";
import { useState } from "react";

export default function NewChart({ordering, classification, bars}){
    const [periodos, setPeriodos] = useState({})
    useEffect(()=>{
        async function get(){
        const resp = await getChartData(ordering, classification, bars)
        setPeriodos(resp)
      
    }
    get()

},[ordering, classification, bars])

    console.log(periodos)

    return(
        <div>
            <table>
                <tr>
                <th>Intervalo</th>
                <th>Ocorrencias</th>
                <th></th>
                </tr>
                {periodos.dados?periodos.dados.map(periodo=>{
                    return(
                        <tr>
                            <td>{(periodo.periodo).replace('i','')} dias</td>
                            <td>{periodo.ocorrencias}</td>
                            <td>{((periodo.ocorrencias*100)/periodos.todos_os_periodos).toFixed(1)}%</td>
                        </tr>
                    )
                }):null}
           
            </table>
        </div>
    )
}