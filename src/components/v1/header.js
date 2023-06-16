import './header.css'
import BuscaCpf from '../busca-cpf'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import logo from '../img/honeybe.svg'
import { Link } from 'react-router-dom'
import { deleteAllCookies } from '../services/utils'
import { useDispatch } from 'react-redux'
import { setUserData } from '../services/auth-context'

export default function HeaderV1(){
    const [CPFvisible, CPFsetVisible] = useState(false)
    const dispatch = useDispatch()

    
    const CPFvisibleSetter =()=>{
        if(CPFvisible){
            CPFsetVisible(false)
        }
        else{
            CPFsetVisible(true)
            
        }
    }

    function logout(){

        dispatch(setUserData({
            token: null,
            username: null,
            id: null,
            isLogged: false,
            userPicture: null,
            premium: null,
            
            
        }))  
       deleteAllCookies()
    }


    return(
        <div className='top-header'>
            <BuscaCpf setter={CPFvisibleSetter} visible={CPFvisible}/>
          
            <div>
                <img src={logo} style={{filter: 'invert(1)', width:'150px'}}/>
                <h3>LTV - v1 | <Link to={'/'}>LTV - v2</Link></h3>
                
                
            </div>
            <div className='display-flex-row'>
            <button id='logout-button' onClick={logout}>Logout</button>
                <div onClick={CPFvisibleSetter} className='search-button'>
                
                    <AiOutlineSearch size={24}/>
                    
                    Busca por CPF
                    

                </div>
            
            </div>
        </div>
    )
}