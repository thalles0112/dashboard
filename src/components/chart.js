import { useState, useEffect, useCallback } from "react";
import url from "../backend";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getChartData } from "./services/requests";
import { useSelector } from "react-redux";

export default function RecorrenciaChart({ordering, classification, bars}){
    const test = [1,2,3,4,5,6,7,8,9,10,11]
    const {token} = useSelector(state=>state.auth)
    
    const [chartData, setChartData] = useState({
        labels: ['De 0 a 15', 'De 16 a 30', 'De 31 a 45', 'De 46 a 60', 'De 61 a 90', 'Maior que 90'],
        datasets: [
            {
                label: ' ',
                data: [],
                borderColor: ['rgb(82,134,163)'],
                backgroundColor: ['#bad200'],
                pointBackgroundColor: 'rgb(82,134,163)',
                pointBorderColor: 'rgb(82,134,163)',
                datalabels:{
                    color:' black',
                    anchor: 'end',
                    align: 'top',
                    offset: 0,
                    
                },
                plugins: [ChartDataLabels]
            }
        ]
    }) 
    
    ChartJS.register(ChartDataLabels);
    ChartJS.defaults.font.size = 19
   useEffect(()=>{
    async function getData(){
        const resp = await getChartData(ordering, classification, bars, token)
        
        setChartData({
           
            labels: resp.map((r)=>String(r.periodo).replace('i','')),
            datasets: [{
                label: 'recompras no site depois de X dias',
                data: resp.map(r=>r.intervalo),
                borderColor: ['rgb(82,134,163)'],
                backgroundColor: ['#c4c4c4'],
                pointBackgroundColor: 'rgb(82,134,163)',
                pointBorderColor: 'rgb(82,134,163)',
               
                
            }]
        })
    }
    getData()
   },[bars, ordering, classification])

   const reload = useCallback(async()=>{
    await getChartData(ordering, classification, bars, token).then(resp=>resp.json().then(resp => setChartData({
        labels: resp.map((r)=>String(r.periodo).replace('_',' ').replace('_',' ').replace('_',' ')+' | '+String(((r.intervalo*100)/r.compras_totais).toFixed(2))+'%'),
        datasets: [{
            label: 'recompras no site depois de X dias',
            data: resp.map(r=>r.intervalo),
            borderColor: ['rgb(82,134,163)'],
            backgroundColor: ['#c4c4c4'],
            pointBackgroundColor: 'rgb(82,134,163)',
            pointBorderColor: 'rgb(82,134,163)',
            
            
        }]
    })))
   })

    return (
        <div>
            <Bar
            onClick={reload}
                data={chartData}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    
                }}
            />
        </div>
    )
}