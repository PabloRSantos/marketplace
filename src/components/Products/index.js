import React, {useState, useEffect} from "react"
import api from "../../services/api"
import {Link} from "react-router-dom"
import {FiChevronLeft, FiChevronRight } from "react-icons/fi"


const Products = (props) => {
    const [prods, setProds] = useState([])
    const [pages, setPages] = useState(0)
    const [pageAtual, setPageAtual] = useState(1)
    const [noClickLeft, setNoClickLeft] = useState("noClick")
    const [noClickRight, setNoClickRight] = useState("")

    useEffect(() => {
        api.get(`products?${props.query}&page=${pageAtual}`)
        .then(response => {
            setProds(response.data.products)
            setPages(response.data.pages)

            pageAtual >= response.data.pages && setNoClickRight("noClick")
        })
        .catch(() => alert("Erro na conexao do servidor"))
    }, [props.query, pageAtual])

    
    function leftArrow(){
       if(pageAtual <= 1) return 

       setNoClickRight("")
       setPageAtual(pageAtual - 1)

       if(pageAtual - 1 <= 1) setNoClickLeft("noClick")
    }   
    
    function rightArrow (){
        if(pageAtual >= pages) {
            return setNoClickRight("noClick")
        }

            setNoClickLeft("")
           setPageAtual(pageAtual + 1) 

        if(pageAtual + 1 >= pages) return setNoClickRight("noClick")

        setNoClickRight("")
    }


    return (
            <section>
            <FiChevronLeft className={` seta left ${noClickLeft}`}
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
             <FiChevronRight className={` seta right ${noClickRight}`}
                     onClick={rightArrow}/>
            </section>
        )
}

export default Products