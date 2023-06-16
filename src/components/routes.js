import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HeaderV1 from "./v1/header";
import HeaderV2 from "./v2/header";
import V2Home from "./v2/v2home";
import Pedidos from "./v1/pedidos";
import Test from "./v-test/test";
import Login from "./login/login";

export const authrouter = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/v1" element={[<HeaderV1 key={1}/>,<Pedidos key={2}/>]}/>,
        <Route path="/" element={[<HeaderV2 key={1}/>, <V2Home key={2}/>]}/>,
        <Route path="/test" element={[<HeaderV2 key={1}/>, <Test key={2}/>]}/>
    ])
)


export const noauthrouter = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={ <Login />}/>,
    ])
)


