import './header.css'
import BuscaCpf from '../busca-cpf'
import search from './img/search.png'
import { useState } from 'react'


export default function Header(){
    const [CPFvisible, CPFsetVisible] = useState(false)
    
    const CPFvisibleSetter =()=>{
        if(CPFvisible){
            CPFsetVisible(false)
        }
        else{
            CPFsetVisible(true)
            
        }
    }


    return(
        <div className='top-header'>
            <BuscaCpf setter={CPFvisibleSetter} visible={CPFvisible}/>
          
            <div>
                <h1>HONEY <span className='square'>BE</span></h1>
                <span>Ciclo de vida do cliente</span>
            </div>
            <div className='display-flex-row'>
                <div onClick={CPFvisibleSetter} className='search-button'>
                    <img className='search-image' src={search}/>
                    Busca por CPF
                    
                
                </div>
            
            </div>
        </div>
    )
}