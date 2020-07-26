import React, {useState, useEffect} from "react"
import "./style.css"
import { FiSearch} from "react-icons/fi"
import Header from "../../components/header"
import Product from "../../components/Products"

const Home = () => {
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState(8)
    
    function ChangeSearch(event){
        setSearch(event.target.value)
    }

    useEffect(() => {
        if(window.screen.width > 1550) {
            setLimit(10)
        }

        if(window.screen.width > 1900) {
            setLimit(12)
        }

        if(window.screen.width > 2200) {
            setLimit(16)
        }
    }, [])

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
                        query={`tipo=preco&ordenar=asc&limit=${limit}`}
                        />                        


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

/*
   <Product 
                        titulo={"Mais Recentes"}
                        query={`tipo=id&ordenar=desc`}/>
*/