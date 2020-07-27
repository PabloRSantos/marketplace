import React, {useState} from "react"
import "./style.css"
import { FiSearch } from "react-icons/fi"
import Header from "../../components/header"
import Products from "../../components/Products"

const Categoria = (props) => {
    const [search, setSearch] = useState("")

    function ChangeSearch(event){
        setSearch(event.target.value)
    }

    return (
        <main id="categoria">
            <Header />
            <div className="divSearch">
                    <input type="text" name="search" id="search" onChange={ChangeSearch} placeholder="Faça sua pesquisa" />
                    <FiSearch id="iconSearch" />
                </div>
            <div id="contentProducts">
            {search.length < 1 ? (
           <Products
           titulo={""}
           query={`categoria=${props.match.params.id}`}
           /> 
            ) : (
                <Products
                titulo={`"${search}"`}
                query={`pesquisa=${search}&categoria=${props.match.params.id}`}
                />
            )}
            </div>
        </main>
    )
}

export default Categoria