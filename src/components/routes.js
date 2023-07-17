import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HeaderV2 from "./v2/header";
import V2Home from "./v2/v2home";
import Clientes from "./v2/clientes/clientes";
import Test from "./v-test/test";
import Login from "./login/login";
import Produtos from './v2/produtos/produtos'

export const authrouter = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={[<HeaderV2 key={1}/>, <V2Home key={2}/>]}/>,
        <Route path="/test" element={[<HeaderV2 key={1}/>, <Test key={2}/>]}/>,
        <Route path="/produtos" element={[<HeaderV2 key={1}/>, <Produtos key={2}/>]}/>,
        <Route path="/clientes" element={[<HeaderV2 key={1}/>, <Clientes key={2}/>]}/>,
    ])
)


export const noauthrouter = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={ <Login />}/>,
    ])
)


