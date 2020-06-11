import React, {useEffect, useState} from "react"
import Header from "../../components/header"
import api from "../../services/api"
import {useLocation, Link, useHistory} from "react-router-dom"
import "./style.css"

const Perfil = () => {
    const history = useHistory()
    const location = useLocation()
    const token = location.token
    const [user, setUser] = useState({})

    useEffect(() => {
        api.get(`user/profile`, {headers: {autorizacao: token}})
        .then(response => {
            if(response.data.error){
                alert(response.data.error)
                history.push("/")
            }
            setUser(response.data.user[0])
        }).catch(() => {
            history.push("/")
        })
    })
    
    
    return (
        <>
        <Header token={token}/>
        <main id="PerfilUser">
            <div id="infosPerfil">
                <section id="user"> <h2>Olá, {user.nome}, o que deseja fazer?</h2></section>
               <ul id="navUser">
                    <Link to={{pathname: "/user/dados", token: token}} className="link">Meu dados</Link>
                    <Link to={{pathname: "/user/compras", token: token}}  className="link">Minhas compras</Link>
                    <Link to={{pathname: "/user/vendas", token: token}}  className="link">Minhas vendas</Link>
                    <Link to={{pathname: "/user/chat", token: token}}  className="link">Chat</Link>
                    <Link to="/" className="link">Sair</Link>
                </ul> 
            </div>
        </main>
        </>
    )
}

export default Perfil
