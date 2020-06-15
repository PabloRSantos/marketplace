import React, {useState} from "react"
import "./style.css"
import {useHistory} from "react-router-dom"
import api from "../../services/api"

const Login = () => {
    const [formData, setFormData] = useState([])
    const history = useHistory()

    function handleChange(event){
        const { name, value } = event.target

        setFormData({...formData, [name]: value})
    }

    function handleSubmit(event){
        event.preventDefault()

        api.post("/login", formData)
        .then(response => { 
         if(response.data.error) {
            alert(response.data.error)
         }   
         else {
             localStorage.setItem("LojaVirtual", `Bearer ${response.data.token}`)
             
             localStorage.setItem("LojaVirtualId", response.data.id)
            history.push("/")
         }
        })
         

        }

    return (
        <main id="login">
            <div id="form">
                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label htmlFor="email">Email:</label><br/>
                        <input onChange={handleChange} onBlur={handleChange} required  type="text" name="email" id="email"/>
                    </div>

                    <div className="campo">
                        <label htmlFor="senha">Senha:</label><br/>
                        <input onChange={handleChange} onBlur={handleChange} required  type="password" name="senha" id="senha"/>
                    </div>

                    <button>Login</button>
                </form>
            </div>
        </main>
    )
}

export default Login