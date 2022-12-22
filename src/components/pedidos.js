import { useEffect, useState } from "react"
import Recorrentes from "./recorrentes"
import NaoRecorrente from "./naorecorrente"

import './pedidos.css'

export default function Pedidos(){
    
    
    
        return(
            <div>
                <Recorrentes/>
                <NaoRecorrente/>
            </div>
        )
    
    
}