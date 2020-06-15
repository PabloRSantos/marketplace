import React, { useEffect, useState } from "react"
import "./style.css"
import { Link } from "react-router-dom"
import api from "../../services/api"

const Header = (props) => {
    const [categorias, setCategorias] = useState([])
    const [token, setToken] = useState("null")
 
    useEffect(() => {
        if(localStorage.getItem("LojaVirtual")){
        setToken(localStorage.getItem("LojaVirtual"))
        }
        return
    }, [token])

    useEffect(() => {
        api.get("categorias")
            .then(response => {
                setCategorias(response.data)
            })
    }, [])

    return (
        <main>
            <header>
                <Link className="linkHeader" to="/"><h2>Logo</h2></Link>
                <ul id="nav">

                    {token.includes("null") ? (
                        <>
                            <Link className="linkHeader" to="/cadastro"><li>Crie sua conta</li></Link>
                            <Link className="linkHeader" to="/login"><li>Login</li></Link>
                        </>
                    ) : (
                            <>
                                <Link className="linkHeader" to="/user/perfil"><li>Meu Perfil</li></Link>

                                <Link className="linkHeader" to="chat"><li>Chat</li></Link>

                                <Link className="linkHeader" to="carrinho"><li>Carrinho</li></Link>

                            </>
                        )}

                </ul>
            </header>
            <section id="categorias">
                <ul>
                    {categorias.map(categoria => (
                        <Link key={categoria.id} className="linkHeader" to={{pathname: `/categoria/${categoria.nome}`, id: categoria.id}} >
                            <li>{categoria.nome}</li>
                        </Link>
                    ))}
                </ul>

            </section>
        </main>
    )
}

export default Header