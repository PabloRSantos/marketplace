import React, {useState} from "react"
import "./style.css"
import {useHistory} from "react-router-dom"
import Header from "../../components/header"
import {useAuth} from "../../contexts/auth"

const Login = () => {
    const [formData, setFormData] = useState([])
    const history = useHistory()
    const {SignIn} = useAuth()

    function handleChange(event){
        const { name, value } = event.target

        setFormData({...formData, [name]: value})
    }

    async function handleSubmit(event){
        event.preventDefault()

        const error = await SignIn(formData)
        console.log(error)

         if(error) {
            return alert(error)
         }   
        
            
            history.push("/")         

        }

    return (
        <main id="login">
            <Header />
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