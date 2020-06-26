import React, {useState} from "react"
import "./style.css"
import { FiSearch} from "react-icons/fi"
import Header from "../../components/header"
import Product from "../../components/Products"

const Home = () => {
    const [search, setSearch] = useState("")
    
    function ChangeSearch(event){
        setSearch(event.target.value)
    }

    return (
        <main id="home">
            <Header />
            <div className="divSearch">
                    <input type="text" name="search" id="search" onChange={ChangeSearch} placeholder="Faça sua pesquisa" />
                    <FiSearch id="iconSearch" />
                </div>
            <div id="contentProducts">

                {search.length < 1 ? (
                    <>

                        <Product 
                        titulo={"Mais baratos"}
                        query={`tipo=preco&ordenar=asc`}
                        />                        

                        <Product 
                        titulo={"Mais Recentes"}
                        query={`tipo=id&ordenar=desc`}/>

                        <Product 
                        titulo="Mais vendidos"
                        query={`tipo=vendidos&ordenar=asc`}/>
            
                    </>
                ) : (
                    <>
                          <Product 
                        titulo={`"${search}"`}
                        query={`pesquisa=${search}`}
                        />
                    </>
                )}
        

            </div>
        </main>
    )
}

export default Home