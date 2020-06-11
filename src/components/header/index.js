import React, { useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"
import "./style.css"
import { Link } from "react-router-dom"
import api from "../../services/api"

const Header = (props) => {
    const [categorias, setCategorias] = useState([])
    const token = props.token



    useEffect(() => {
        api.get("categorias")
            .then(response => {
                setCategorias(response.data)
            })
    }, [])

    return (
        <main>
            <header>
                <Link className="linkHeader" to={{ pathname: `/`, token: token }}><h2>Logo</h2></Link>
                <div className="divSearch">
                    <input type="text" name="search" id="search" placeholder="Faça sua pesquisa" />
                    <FiSearch id="iconSearch" />
                </div>
                <ul id="nav">

                    {token == undefined ? (
                        <>
                            <Link className="linkHeader" to="/cadastro"><li>Crie sua conta</li></Link>
                            <Link className="linkHeader" to="/login"><li>Login</li></Link>
                        </>
                    ) : (
                            <>
                                <Link className="linkHeader" to={{ pathname: "/perfil", token: token }}><li>Meu Perfil</li></Link>

                                <Link className="linkHeader" to={{ pathname: "/compras", token: token }}><li>Chat</li></Link>

                                <Link className="linkHeader" to={{ pathname: "/carrinho", token: token }}><li>Carrinho</li></Link>

                            </>
                        )}

                </ul>
            </header>
            <section id="categorias">
                <ul>
                    {categorias.map(categoria => (
                        <Link key={categoria.id} className="linkHeader" to={{ pathname: `/categoria/${categoria.nome}`, token: token }}>
                            <li>{categoria.nome}</li>
                        </Link>
                    ))}
                </ul>

            </section>
        </main>
    )
}

export default Header