import { useEffect, useRef, useState } from "react";
import './box.css'
import './test.css'

export default function Test(){
    const [active, setActive] = useState('home')
    const videoRef = useRef()
    
   function activeSetter(e){
    setActive(e)
   }

  

    return(
        <div>
           <h1 className="font-big">{'<Pagina de testes/> 🔧'}</h1>
           <nav className="navigation">
                    <ul>
                        <li  onClick={()=>{activeSetter('home')}} className={`list ${active=='home'?'active':''}`}>
                            <a href="#">
                                <span className="icon">🏠</span>
                                <span className="text">Home</span>
                            </a>
                        </li>
                        <li  onClick={()=>{activeSetter('profile')}} className={`list ${active=='profile'?'active':''}`}>
                            <a href="#">
                                <span className="icon">😣</span>
                                <span className="text">Profile</span>
                            </a>
                        </li>
                        <li  onClick={()=>{activeSetter('message')}} className={`list ${active=='message'?'active':''}`}>
                            <a href="#">
                                <span className="icon">🗨</span>
                                <span className="text">Message</span>
                            </a>
                        </li>
                        <li  onClick={()=>{activeSetter('photos')}} className={`list ${active=='photos'?'active':''}`}>
                            <a href="#">
                                <span className="icon">🎞</span>
                                <span className="text">Photos</span>
                            </a>
                        </li>
                        <li  onClick={()=>{activeSetter('settings')}} className={`list ${active=='settings'?'active':''}`}>
                            <a href="#">
                                <span className="icon">⚙</span>
                                <span className="text">Settings</span>
                            </a>
                        </li>
                        <div className="selector"></div>
                    </ul>

                </nav>
        </div>
    )

    
}