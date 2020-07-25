import React, {useEffect, useState} from "react"
import api from "../../../services/api"
import { useHistory } from "react-router-dom"
import "./style.css"
import Header from "../../../components/header"
import Sucess from "../../../components/Sucess"

const UserDados = () => {
const token = localStorage.getItem("LojaVirtual")
const [dadosUser, setDadosUser] = useState({})
const [classProfile, setClassProfile] = useState("hidsssden")
const [newFoto, setNewFoto] = useState("")


const history = useHistory()



useEffect(() => {
        api.get(`user/profile`, {headers: {Authorization: token}})
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

}, [newFoto])

function changeFile(event){
    event.preventDefault()

    const file = event.target.files[0]

    const data = new FormData()

    data.append("foto", file)
    data.append("id", localStorage.getItem("LojaVirtualId"))
    
    api.put("user/profilePic", data)
    .then(response => setNewFoto(response.data.sucess))
}

    return (
        <>
         <Header />
            <main id="userDados">
                <div id="imagem"
                onMouseOver={() => setClassProfile("show")}
                onMouseOut={() => setClassProfile("hidden")}>

                    <img src={`http://localhost:3333/uploads/user/${dadosUser.foto}`} alt="Foto de Perfil"/>
                    
                    <div>
                    <label htmlFor="file" className={classProfile} id="label">Alterar</label>
                    <input hidden onChange={changeFile} accept="image/*" type="file" name="file" id="file"/>
                    </div>

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