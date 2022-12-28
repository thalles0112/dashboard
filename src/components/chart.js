import { useState, useEffect } from "react";
import url from "../backend";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, plugins } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default function RecorrenciaChart(){
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
                    offset: 0
                },
                plugins: [ChartDataLabels]
            }
        ]
    }) 
    
    ChartJS.register(ChartDataLabels);
   useEffect(()=>{
    async function getData(){
        await fetch(`${url}/api/intervalos`,{
            'method':'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(resp=>resp.json().then(resp => setChartData({
            labels: resp.map((r)=>String(r.periodo).replace('_',' ').replace('_',' ').replace('_',' ')+' | '+String(((r.intervalo*100)/r.compras_totais).toFixed(2))+'%'),
            datasets: [{
                label: 'Quantidade de clientes que recompraram no período de X dias',
                data: resp.map(r=>r.intervalo),
                borderColor: ['rgb(82,134,163)'],
                backgroundColor: ['#bad200'],
                pointBackgroundColor: 'rgb(82,134,163)',
                pointBorderColor: 'rgb(82,134,163)',
                
            }]
        })))
    }
    getData()
   },[])

    return (
        <div>
            <Bar
                data={chartData}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false
                }}
            />

        </div>
    )
}