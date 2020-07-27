import React, { useEffect, useState } from "react"
import {Cabecalho, Categorias, Items, LinkHeader} from "./style"


import api from "../../services/api"
import {FaShoppingCart} from "react-icons/fa"
import {FiMenu, FiChevronDown} from "react-icons/fi"
import {useAuth} from "../../contexts/auth"
import logo from "../../assets/logo.png"

const Header = () => {
    const [categorias, setCategorias] = useState([])
    const [menuResponsivo, setMenuResponsivo] = useState("none")
    const [responsiveCategoria, setResponsiveCategoria] = useState("none")
    const {SignOut} = useAuth()

    useEffect(() => {
        api.get("categorias")
            .then(response => {
                setCategorias(response.data)
            })
    }, [])

    function Logout(){
        SignOut()
    }

    function responsiveMenu(){
        menuResponsivo.includes("none") ? setMenuResponsivo("flex") : setMenuResponsivo("none")
    }

    function CategoriaResponsivo(){
        responsiveCategoria.includes("none") ? setResponsiveCategoria("flex") : setResponsiveCategoria("none")
    }

    return (
        <main>
            <Cabecalho Display={menuResponsivo}>
                <LinkHeader to="/">
                    <img src={logo}/>
                </LinkHeader>
                
                <FiMenu className="hamburguer"
                onClick={responsiveMenu}
                />

                    {!localStorage.getItem("LojaVirtualId") ? (
                        <ul>
                            <Items to="/cadastro"><li>Crie sua conta</li></Items>
                            <Items to="/login"><li>Login</li></Items>
                        </ul>
                    ) : (
                            <ul>
                                <Items to="/user/perfil"><li>Meu Perfil</li></Items>

                                <Items to="/user/chat"><li>Chat</li></Items>

                                <Items onClick={Logout}>Sair</Items>

                                <Items to="/carrinho"><li><FaShoppingCart/></li></Items>

                            </ul>
                        )}
            </Cabecalho>
            <Categorias categoriaResponsive={responsiveCategoria}>

                <nav onClick={CategoriaResponsivo}>Categorias
                    <FiChevronDown />
                </nav>
                <ul>
                    {categorias.map(categoria => (
                        <Items key={categoria.id} to={`/categoria/${categoria.id}`}>
                            <li>{categoria.nome}</li>
                        </Items>
                    ))}
                </ul>

            </Categorias>
        </main>
    )
}

export default Header