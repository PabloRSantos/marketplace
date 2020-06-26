import React, {useState, useEffect} from "react"
import api from "../../services/api"
import {Link} from "react-router-dom"
import {FiChevronLeft, FiChevronRight } from "react-icons/fi"


const Products = (props) => {
    const [prods, setProds] = useState([])
    const [pages, setPages] = useState(0)
    const [pageAtual, setPageAtual] = useState(1)
    const [noClick, setNoClick] = useState("")

    useEffect(() => {



        api.get(`products?${props.query}&page=${pageAtual}`)
        .then(response => {
            setProds(response.data.products)
            setPages(response.data.pages)
        })
        .catch(() => alert("Erro na conexao do servidor"))
    }, [props.query, pageAtual])


    
    function leftArrow(){
       if(pageAtual <= 0) return setNoClick("noClickLeft")

       setNoClick("")
       setPageAtual(pageAtual - 1)
    }   
    
    function rightArrow (){
        if(pageAtual >= pages) {
            return setNoClick("noClickRight")
        }

           setNoClick("")
           setPageAtual(pageAtual + 1) 

           

    }


    return (
        prods.length == 0 ? (
            <section>
            <p id="noProduct">Nenhum produto encontrado</p>
            </section>
        ) : (
            <section>
            <FiChevronLeft className={` seta ${noClick}`}
                     onClick={leftArrow}/>
     <div className="contentProduct">
     <h1>{props.titulo}</h1>
         <div className="cards">
            {prods.map(prod => (
                <div id={prod.id} className="product">
                      <Link className="link" to={{pathname:`/product/${prod.id}`, state: {categoria:prod.categoria_id}}}>
                    <div className="imagem">
                        <img src={`http://localhost:3333/uploads/products/${prod.imagem}`}/>
                    </div>
                     <div className="preco">
                     <p>{`R$${prod.preco}`}</p> 
                     </div>
                     </Link>
                </div>
            ))}
            </div>
             </div>
             <FiChevronRight className={` seta ${noClick}`}
                     onClick={rightArrow}/>
            </section>
        )
    
    )
}

export default Products