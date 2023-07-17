import './header.css'
import BuscaCpf from '../busca-cpf'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import logo from '../img/honeybe.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../services/auth-context'
import { deleteAllCookies } from '../services/utils'

function HeaderOptions({active, logoutHandler}){
    

    return(
        <div className={`header-options ${active}`}>
            <ul>
                <li onClick={logoutHandler}>Logout</li>
                <li><a href='https://incandescent-profiterole-73ff15.netlify.app/' target='blank'>Upload Planilha</a></li>
            </ul>
            
        </div>
    )
}

export default function HeaderV2(){
    const [CPFvisible, CPFsetVisible] = useState(false)
    const dispatch = useDispatch()
    const {username} = useSelector(state=>state.auth)
    const [headerOptionsActive, setHeaderOptionsActive] = useState('null')
    
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
        <header className='top-header'>
            <div className='flex flex align-center gx-10'>
                <img src={logo} style={{filter: 'invert(1)', width:'150px'}}/> 
                <Link to={'/'} >Início</Link>
                <Link to={'/produtos'} >Produtos</Link>
                <Link to={'/clientes'} >Clientes</Link>
                
            </div>
            <div className='display-flex-row cursor-pointer'>
              <span onClick={()=>{headerOptionsActive=='active'?setHeaderOptionsActive('innactive'):setHeaderOptionsActive('active')}}>Olá, {username} </span>
              <HeaderOptions logoutHandler={logout} active={headerOptionsActive}/>
            </div>
           
        </header>
    )
}