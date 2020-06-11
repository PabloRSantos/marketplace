import React, {useState} from "react"
import "./style.css"
import api from "../../services/api"
import {useHistory} from "react-router-dom"
import Header from "../../components/header"

const Cadastro = () => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
    })

    const history = useHistory()

    function handleChange(event){
        const { name, value } = event.target

        setFormData({...formData, [name]: value})
    }

    function handleSubmit(event){
        event.preventDefault()

        api.post("/cadastro", formData)
        .then(response => { 

         if(response.data.sucess) {
            localStorage.setItem("LojaVirtual", `Bearer ${response.data.token}`)
            localStorage.setItem("LojaVirtualId", response.data.id)
            history.push("/")
         }   
         else if (response.data.error){
             alert(response.data.error)
         }
        })
    }
    
    return (
        <main id="cadastro">
            <Header />
            <div id="form">
                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label htmlFor="nome">Nome:</label><br/>
                        <input onChange={handleChange} 
                        onBlur={handleChange} required type="text" name="nome" id="nome"/>
                    </div>

                    <div className="campo">
                        <label htmlFor="email">Email:</label><br/>
                        <input onChange={handleChange} 
                        onBlur={handleChange} required type="text" name="email" id="email"/>
                    </div>

                    <div className="campo">
                        <label htmlFor="senha">Sua melhor senha:</label><br/>
                        <input onChange={handleChange} onBlur={handleChange} required type="password" name="senha" id="senha"/>
                    </div>

                    <div className="campo">
                        <label htmlFor="senha2">Sua senha novamente:</label><br/>
                        <input onChange={handleChange} onBlur={handleChange} required type="password" name="senha2" id="senha2"/>
                    </div>
                    <button>Cadastrar</button>
                </form>
            </div>
        </main>
    )
}

export default Cadastro