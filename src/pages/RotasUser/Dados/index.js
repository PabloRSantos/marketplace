import React, {useEffect, useState} from "react"
import api from "../../../services/api"
import { useHistory } from "react-router-dom"
import "./style.css"

const UserDados = () => {
const token = localStorage.getItem("LojaVirtual")
const [dadosUser, setDadosUser] = useState({})
const history = useHistory()

useEffect(() => {
        api.get(`user/profile`, {headers: {autorizacao: token}})
        .then(response => {
            if(response.data.error){
                alert(response.data.error)
                return history.push('/')
            }

            else 
            setDadosUser(response.data.user[0])
        })
        .catch(() => {
            alert("Erro na conexão, tente novamente")
            history.push("/perfil")
        })

}, [])

    return (
        <>
            <main id="userDados">
                <p>Nome: {dadosUser.nome}</p>
                <p>Email: {dadosUser.email}</p>
                <p>Senha: ******* <button id="changeSenha">Alterar</button></p>
                <p>Compras: 0</p>
                <p>Vendas: 0</p>
            </main>
        </>
    )
}

export default UserDados