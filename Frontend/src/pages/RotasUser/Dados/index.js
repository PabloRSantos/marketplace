import React, {useEffect, useState} from "react"
import api from "../../../services/api"
import "./style.css"
import Header from "../../../components/header"
import Sucess from "../../../components/Sucess"

const UserDados = () => {
const [dadosUser, setDadosUser] = useState({})
const [classProfile, setClassProfile] = useState("hidsssden")
const [newFoto, setNewFoto] = useState("")
const [classSucess, setClassSucess] = useState("")
const [messageSucess, setMessageSucess] = useState("")
const [typeSucess, setTypeSucess] = useState("error")


useEffect(() => {
        api.get(`user/profile`)
        .then(response => {

            console.log(response.data.user)
            if(response.data.error){
                setMessageSucess(response.data.error)
                setClassSucess("showSucess")
                return
            }

            setDadosUser(response.data.user)
        })
        .catch(() => {
             setMessageSucess("Erro na conexão, tente novamente")
                setClassSucess("showSucess")
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
          <Sucess
     message={messageSucess}
     classSucess={classSucess}
     type={typeSucess}
     />
         <Header />
            <main id="userDados">
                <div id="imagem"
                onMouseOver={() => setClassProfile("show")}
                onMouseOut={() => setClassProfile("hidden")}>

                    <img src={`https://lojavirtual-backend.herokuapp.com/uploads/user/${dadosUser.foto}`} alt="Foto de Perfil"/>
                    
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