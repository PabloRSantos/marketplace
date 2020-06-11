import React from "react"
import "./style.css"
import { useLocation } from "react-router-dom";
import Header from "../../components/header"

const Home = () => {
const location = useLocation()

    return (
        <main id="home">
            <Header token={location.token}/>
            <content>
                    Olá
            </content>
        </main>
    )
}

export default Home