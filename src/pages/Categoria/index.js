import React, {useState, useEffect} from "react"
import "./style.css"
import api from "../../services/api"
import { FiSearch } from "react-icons/fi"

const Categoria = (props) => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState("null")
    

    useEffect(() => {
        api.get(`products?categoria=${props.location.id}`)
        .then(response => {
            setProducts(response.data)
            console.log(response.data)
        })

    }, [props.match.params.nome])


    function ChangeSearch(event){
        setSearch(event.target.value)
    }

    function submitSearch(){
     api.get(`products?pesquisa=${search}`)
     .then(response => setSearchResult(response.data))
    }

    return (
        <main id="categoria">
            <div className="divSearch">
                    <input type="text" name="search" id="search" onChange={ChangeSearch} placeholder="Faça sua pesquisa" />
                    <FiSearch onClick={submitSearch} id="iconSearch" />
                </div>
            <div id="contentProducts">
            {searchResult.includes("null") ? (
            <section>
                <div className="cards">
                   {products.map(prod => (
                       <div id={prod.id} className="product">
                           <div className="imagem"></div>
                            <div className="preco">
                            <p>{prod.preco}</p> 
                            </div>
                       </div>
                   ))}
                   </div>
                   </section>
            ) : (
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
            )}
            </div>
        </main>
    )
}

export default Categoria