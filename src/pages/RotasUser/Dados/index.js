import React, {useEffect, useState} from "react"
import api from "../../../services/api"
import { useHistory } from "react-router-dom"
import "./style.css"
import Header from "../../../components/header"

const UserDados = () => {
const token = localStorage.getItem("LojaVirtual")
const [dadosUser, setDadosUser] = useState({})
const [classProfile, setClassProfile] = useState("hidden")

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
         <Header />
            <main id="userDados">
                <div id="imagem"
                onMouseOver={() => setClassProfile("show")}
                onMouseOut={() => setClassProfile("hidden")}>

                    <img src="http://localhost:3333/uploads/a1b7978f2792-_O85_Y3E%20(2).jpg" alt="Foto de Perfil"/>
                    <p className={classProfile}>Alterar</p>

                </div>

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