import React, {useEffect, useState} from "react"
import "./style.css"
import api from "../../services/api"
import { FiSearch } from "react-icons/fi"

const Home = () => {
    const [prodsRecentes, setProdsRecentes] = useState([])
    const [prodsVendidos, setProdsVendidos] = useState([])
    const [prodsPrecos, setProdsPrecos] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState("null")

    useEffect(() => {
        api.get("products?ordenar=id")
        .then(response => {
            setProdsRecentes(response.data)
        })
        .catch(() => alert("Erro na conexao do servidor"))
    }, [])

    
    useEffect(() => {
        api.get("products?ordenar=vendidos")
        .then(response => {
            setProdsVendidos(response.data)
        })
        .catch(() => alert("Erro na conexao do servidor"))
    }, [])

    
    useEffect(() => {
        api.get("products?ordenar=preco")
        .then(response => {
            setProdsPrecos(response.data)
        })
        .catch(() => alert("Erro na conexao do servidor"))
    }, [])

    
    function ChangeSearch(event){
        setSearch(event.target.value)

    }

    function submitSearch(){
     api.get(`products?pesquisa=${search}`)
     .then(response => setSearchResult(response.data))
    }

    return (
        <main id="home">
            <div className="divSearch">
                    <input type="text" name="search" id="search" onChange={ChangeSearch} placeholder="Faça sua pesquisa" />
                    <FiSearch onClick={submitSearch} id="iconSearch" />
                </div>
            <div id="contentProducts">

                {searchResult.includes("null") ? (
                    <>
                        <section>
                        <h1>Mais Recentes</h1>
                            <div className="cards">
                               {prodsRecentes.map(prod => (
                                   <div id={prod.id} className="product">
                                       <div className="imagem"></div>
                                        <div className="preco">
                                        <p>{prod.preco}</p> 
                                        </div>
                                   </div>
                               ))}
                               </div>
                               </section>
            
                               <section>
                        <h1>Mais Vendidos</h1>
                            <div className="cards">
                               {prodsVendidos.map(prod => (
                                   <div id={prod.id} className="product">
                                       <div className="imagem"></div>
                                        <div className="preco">
                                        <p>{prod.preco}</p> 
                                        </div>
                                   </div>
                               ))}
                               </div>
                               </section>
            
                                <section>
                        <h1>Mais Baratos</h1>
                            <div className="cards">
                               {prodsPrecos.map(prod => (
                                   <div id={prod.id} className="product">
                                       <div className="imagem"></div>
                                        <div className="preco">
                                        <p>{prod.preco}</p> 
                                        </div>
                                   </div>
                               ))}
                               </div>
                               </section>
                               </>
                ) : (
                    <>
                         <section>
                                <div className="cards">
                               {searchResult.map(prod => (
                                   <div id={prod.id} className="product">
                                       <div className="imagem"></div>
                                        <div className="preco">
                                        <p>{prod.preco}</p> 
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