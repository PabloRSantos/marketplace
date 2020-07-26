import React, {useState} from "react"
import "./style.css"
import {useHistory} from "react-router-dom"
import Header from "../../components/header"
import {useAuth} from "../../contexts/auth"


const Cadastro = () => {
    const [formData, setFormData] = useState({
        user: "",
        email: "",
        senha: "",
    })

    const {SignUp} = useAuth()

    const history = useHistory()

    function handleChange(event){
        const { name, value } = event.target

        setFormData({...formData, [name]: value})
    }

    async function handleSubmit(event){
        event.preventDefault()


        const error = await SignUp(formData)
 
         if (error) return alert(error)

         history.push("/")
    
    }
    
    return (
        <main id="cadastro">
            <Header />
            <div id="form">
                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label htmlFor="user">Nome:</label><br/>
                        <input onChange={handleChange} 
                        onBlur={handleChange} required type="text" name="user" id="nome"/>
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