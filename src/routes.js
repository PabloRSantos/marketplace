import React from "react"
import {Route, BrowserRouter, Redirect, Switch} from "react-router-dom"
import {autenticacao} from "./auth"


import Home from "./pages/Home"
import Categoria from './pages/Categoria'
import Cadastro from "./pages/Cadastro"
import Login from "./pages/Login"
import Perfil from "./pages/PerfilUser"
import UserDados from "./pages/RotasUser/Dados"
import UserProdutos from "./pages/RotasUser/Produtos"
import UserAddProduto from "./pages/RotasUser/AddProduto"
import ProductShow from "./pages/Product"
import Carrinho from "./pages/Carrinho"
import Chat from './pages/Chat'


const PrivateRoute = ({component: Component, ... rest}) => (
    <Route {... rest} render={props => (
        autenticacao() ? (
             <Component {...props} />
        ) : (
            <Redirect to={{pathname: `/`, state: {from: props.location}}} />
        )
    )}/>
)


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact/>
                <Route component={Categoria} path="/categoria/:id" />
                <Route component={Cadastro} path="/cadastro"/>
                <Route component={Login} path="/login"/>
                <PrivateRoute component={Perfil} path="/user/perfil"/>
                <PrivateRoute component={UserDados} path="/user/dados"/>
                <PrivateRoute component={UserProdutos} path="/user/produtos"/>
                <PrivateRoute component={UserAddProduto} path="/user/addProduto"/> 
                <Route component={ProductShow} path="/product/:id"/> 
                <Route component={Carrinho} path="/carrinho"/> 
                <Route component={Chat} path="/chat"/> 
             </Switch>
         </BrowserRouter>
    )
}

export default Routes
