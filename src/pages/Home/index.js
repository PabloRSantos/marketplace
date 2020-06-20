import React, {useEffect, useState} from "react"
import "./style.css"
import api from "../../services/api"
import { FiSearch } from "react-icons/fi"
import Header from "../../components/header"
import Product from "../../components/Products"

const Home = () => {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState("null")

    
    function ChangeSearch(event){
        setSearch(event.target.value)

    }

    function submitSearch(){
     api.get(`products?pesquisa=${search}`)
     .then(response => setSearchResult(response.data))
    }

    return (
        <main id="home">
            <Header />
            <div className="divSearch">
                    <input type="text" name="search" id="search" onChange={ChangeSearch} placeholder="Faça sua pesquisa" />
                    <FiSearch onClick={submitSearch} id="iconSearch" />
                </div>
            <div id="contentProducts">

                {searchResult.includes("null") ? (
                    <>
                        <Product 
                        titulo={"Mais baratos"}
                        query={"ordenar=preco"}/>
                        
                        <Product 
                        titulo={"Mais Recentes"}
                        query={"ordenar=id"}/>
                        
                        <Product 
                        titulo={"Mais vendidos"}
                        query={"ordenar=vendidos"}/>
            
                    </>
                ) : (
                    <>
                         <section>
                            <div className="cards">
                               {searchResult.map(prod => (
                                <div id={prod.id} className="product">
                                <div className="imagem">
                                <img src={`http://localhost:3333/uploads/products/${prod.imagem}`}/>
                                </div>
                                <div className="preco">
                                <p>{`R$${prod.preco}`}</p> 
                                </div>
                                </div>
                               ))}
                               </div>
                               </section>
                    </>
                )}
        

            </div>
        </main>
    )
}

export default Home