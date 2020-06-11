import React from "react"
import "./style.css"
import {useLocation} from "react-router-dom"
import Header from "../../components/header"

const Categoria = () => {
    const location = useLocation()
    const token = location.token


    return (
        <main id="categoria">
            <Header token={token}/>
            <content>
                CAtegoria
            </content>
        </main>
    )
}

export default Categoria