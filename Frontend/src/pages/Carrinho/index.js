import React, {useEffect, useState} from "react"
import api from "../../services/api"
import Header from "../../components/header"
import "./style.css"
import {Link} from "react-router-dom"

const Carrinho = () => {
    const [products, setProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [controller, setController] = useState(false)


    useEffect(() => {
        
        api.get(`carrinho`)
        .then(async response => {
            setProducts(response.data)
            
            let total = null
            await response.data.map(response => (
                total+= parseFloat(response.preco)
            ))
           
           setTotalProducts(total)
        })
    }, [controller])

    function removeProduct (event){
        const product_id = event.target.id

        api.delete(`carrinho?product_id=${product_id}`)
        .then(() => controller === true ? setController(false) : setController(true))
        .catch(err => console.log(err))
    }

    return (
        <main id="carrinho">
         <Header />
         <div id="contentCarrinho">

            {products.map(product => (
                  <div className="productCarrinho" id={product.product_id}>
                 <p className="close" id={product.product_id} onClick={removeProduct}>X</p>
                 <Link className="link" to={`/product/${product.product_id}`}>
                    <div className="imagemProduct">
                        <img src={`https://lojavirtual-backend.herokuapp.com/uploads/products/${product.imagem}`} alt="imagem"/>
                    </div>

                    <div className="infosProduct">
                        <div className="texto">
                        <h2>{product.nome}</h2>
                        <h3>{product.descricao}</h3>
                        </div>
                        <h1>R${product.preco}</h1>
                    </div>
                    </Link>
                </div>
                
            ))}

            <div id="total">
                <h2>Total:</h2>
                <h1>R${totalProducts}</h1>
            </div>

         
                <button id="comprar">Comprar</button>

         </div>
        </main>
    )
}

export default Carrinho