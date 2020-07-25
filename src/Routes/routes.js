import React from "react"
import {Route, BrowserRouter, Switch} from "react-router-dom"

import PrivateRoute from "./PrivateRoute"


import Home from "../pages/Home"
import Categoria from '../pages/Categoria'
import Cadastro from "../pages/Cadastro"
import Login from "../pages/Login"
import Perfil from "../pages/PerfilUser"
import UserDados from "../pages/RotasUser/Dados"
import UserProdutos from "../pages/RotasUser/Produtos"
import UserAddProduto from "../pages/RotasUser/AddProduto"
import ProductShow from "../pages/Product"
import Carrinho from "../pages/Carrinho"
import Chat from '../pages/Chat'





const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact/>
                <Route component={Categoria} path="/categoria/:id" exact />
                <Route component={Cadastro} path="/cadastro" exact/>
                <Route component={Login} path="/login" exact/>
                <PrivateRoute component={Perfil} path="/user/perfil" exact/>
                <PrivateRoute component={UserDados} path="/user/dados" exact/>
                <PrivateRoute component={UserProdutos} path="/user/produtos" exact/>
                <PrivateRoute exact component={UserAddProduto} path="/user/addProduto"/> 
                <Route component={ProductShow} path="/product/:id" exact/> 
                <Route component={Carrinho} path="/carrinho" exact/> 
                <Route component={Chat} path="/chat" exact/> 
             </Switch>
         </BrowserRouter>
    )
}

export default Routes
