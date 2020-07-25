import React, { useEffect, useState } from "react"
import {Cabecalho, Categorias} from "./style"


import { Link } from "react-router-dom"
import api from "../../services/api"
import {FaShoppingCart} from "react-icons/fa"
import {FiMenu, FiChevronDown} from "react-icons/fi"

const Header = () => {
    const [categorias, setCategorias] = useState([])
    const [menuResponsivo, setMenuResponsivo] = useState("none")
    const [responsiveCategoria, setResponsiveCategoria] = useState("none")

    useEffect(() => {
        api.get("categorias")
            .then(response => {
                setCategorias(response.data)
            })
    }, [])


    function responsiveMenu(){
        menuResponsivo.includes("none") ? setMenuResponsivo("flex") : setMenuResponsivo("none")
    }

    function CategoriaResponsivo(){
        responsiveCategoria.includes("none") ? setResponsiveCategoria("flex") : setResponsiveCategoria("none")
    }

    return (
        <main>
            <Cabecalho Display={menuResponsivo}>
                <Link className="linkHeader" to="/"><h2>Logo</h2></Link>
                
                <FiMenu className="linkHeader hamburguer"
                onClick={responsiveMenu}
                />

                    {!localStorage.getItem("LojaVirtual") ? (
                        <ul>
                            <Link className="linkHeader" to="/cadastro"><li>Crie sua conta</li></Link>
                            <Link className="linkHeader" to="/login"><li>Login</li></Link>
                        </ul>
                    ) : (
                            <ul>
                                <Link className="linkHeader" to="/user/perfil"><li>Meu Perfil</li></Link>

                                <Link className="linkHeader" to="chat"><li>Chat</li></Link>

                                <Link className="linkHeader" to="/carrinho"><li><FaShoppingCart/></li></Link>

                            </ul>
                        )}
            </Cabecalho>
            <Categorias categoriaResponsive={responsiveCategoria}>

                <nav onClick={CategoriaResponsivo}>Categorias
                    <FiChevronDown />
                </nav>
                <ul>
                    {categorias.map(categoria => (
                        <Link key={categoria.id} className="linkHeader" to={`/categoria/${categoria.id}`}>
                            <li>{categoria.nome}</li>
                        </Link>
                    ))}
                </ul>

            </Categorias>
        </main>
    )
}

export default Header