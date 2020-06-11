import React, { useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"
import "./style.css"
import { Link } from "react-router-dom"
import api from "../../services/api"

const Header = () => {
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
                <div className="divSearch">
                    <input type="text" name="search" id="search" placeholder="Faça sua pesquisa" />
                    <FiSearch id="iconSearch" />
                </div>
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
                        <Link key={categoria.id} className="linkHeader" to={`/categoria/${categoria.nome}`}>
                            <li>{categoria.nome}</li>
                        </Link>
                    ))}
                </ul>

            </section>
        </main>
    )
}

export default Header