import React from "react"
import {Route} from "react-router-dom"
import Home from "./pages/Home"
import Categoria from './pages/Categoria'
import Cadastro from "./pages/Cadastro"
import Login from "./pages/Login"
import Perfil from "./pages/PerfilUser"
import UserDados from "./pages/RotasUser/Dados"
import UserProdutos from "./pages/RotasUser/Produtos"
import UserAddProduto from "./pages/RotasUser/AddProduto"
import ProductShow from "./pages/Product"


const Routes = () => {
    return (
        <>
         <Route component={Home} path="/" exact/>
         <Route component={Categoria} path="/categoria/:nome" />
         <Route component={Cadastro} path="/cadastro"/>
         <Route component={Login} path="/login"/>
         <Route component={Perfil} path="/user/perfil"/>
         <Route component={UserDados} path="/user/dados"/>
         <Route component={UserProdutos} path="/user/produtos"/>
         <Route component={UserAddProduto} path="/user/addProduto"/> 
         <Route component={ProductShow} path="/product/:id"/> 
         </>
    )
}

export default Routes
