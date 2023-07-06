import './header.css'
import BuscaCpf from '../busca-cpf'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import logo from '../img/honeybe.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../services/auth-context'
import { deleteAllCookies } from '../services/utils'

export default function HeaderV2(){
    const [CPFvisible, CPFsetVisible] = useState(false)
    const dispatch = useDispatch()
    const {username} = useSelector(state=>state.auth)
    
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
           
          
            <div>
                <img src={logo} style={{filter: 'invert(1)', width:'150px'}}/>
                <h3><Link to={'/v1'}>LTV - v1</Link> | LTV - v2</h3>
                
            </div>
            <div className='display-flex-row'>
              <span>Olá, {username}</span>
            </div>
            <button id='logout-button' onClick={logout}>Logout</button>
        </div>
    )
}