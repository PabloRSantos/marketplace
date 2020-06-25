import React, {useEffect, useState} from "react"
import "./style.css"
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Header from "../../components/header"
import Product from "../../components/Products"

const Home = () => {
    const [search, setSearch] = useState("")
    const [skip, setSkip] = useState(0)
    
    function ChangeSearch(event){
        setSearch(event.target.value)
    }

    function leftArrow(event){
        if(skip < 8) return

        setSkip(skip - 8)
    }   
    
    function rightArrow (event){
        setSkip(skip + 8)
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

                        <div className="divContentProduct">
                        <FiChevronLeft className="left seta"
                        onClick={leftArrow}/>

                        <Product 
                        titulo={"Mais baratos"}
                        query={`tipo=preco&ordenar=asc&skip=${skip}`}
                        />

                        <FiChevronRight className="right seta"
                        onClick={rightArrow}/>
                        </div>
                        

                        <div className="divContentProduct">
                        <FiChevronLeft className="left seta"
                        onClick={leftArrow}/>

                        <Product 
                        titulo={"Mais Recentes"}
                        query={`tipo=id&ordenar=desc&skip=${skip}`}/>

                        <FiChevronRight className="right seta"
                        onClick={rightArrow}/>
                        </div>

                        <div className="divContentProduct">
                        <FiChevronLeft className="left seta"
                        onClick={leftArrow}/>

                        <Product 
                        titulo="Mais vendidos"
                        query={`tipo=vendidos&ordenar=asc&skip=${skip}`}/>

                        <FiChevronRight className="right seta"
                        onClick={rightArrow}/>
                        </div>
                       
            
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