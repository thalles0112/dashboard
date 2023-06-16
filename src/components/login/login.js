import { useState } from "react"
import './login.css'
import { useCallback } from "react"
import { auth } from "../services/requests"
import { setUserData } from "../services/auth-context"
import { useDispatch } from "react-redux"

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const loginHandler = useCallback(async() =>{
        const resp = await auth({'username': username, 'password':password}) 
        if (resp){
            dispatch(
                setUserData({
                    token: resp.token,
                    username: resp.user.username,
                    id: resp.user.id,
                    isLogged: true
                })
            )
        }
    },[username, password])

    return(
        <section id="login-page">
            <div className="login-form">
                <label>Honey Usuário</label>
                <input defaultValue={username} type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
                <label>Senha</label>
                <input defaultValue={password} type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <button onClick={loginHandler}>Entrar</button>
            </div>
        </section>
    )
}