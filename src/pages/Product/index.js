import React, {useEffect, useState} from "react"
import api from "../../services/api"
import Header from "../../components/header"
import "./style.css"
import Comentarios from "../../components/Comentarios"
import Products from "../../components/Products"
import {useLocation} from "react-router-dom"


const Product = (props) => {
    const [product, setProduct] = useState({})
    const location = useLocation()
    
    useEffect(() => {
        api.get(`products/${props.match.params.id}?categoria=${location.state.categoria}`)
        .then(response => setProduct(response.data)
        )

    }, [props.match.params.id])

    function addCarrinho(){
        const product_id = product.id
        const user_id = localStorage.getItem("LojaVirtualId")
        
        api.post("carrinho", {product_id, user_id})
        .then(response => console.log(response.data))
    }

    return (
        <>
        <Header />
        <main id="mainProduct">
            <div id="imagem">
                <img src={`http://localhost:3333/uploads/products/${product.imagem}`} alt="imagem do produto"/>
            </div>
            <div id="infosSide">

                <div id="top">
                <div id="spans">
                     <p>{product.vendidos} Produtos vendidos</p>
                     <p>{product.unidades} Unidade(s) disponivel(s)</p>
                </div>
                    <h1>R${product.preco}</h1>
                    <h2>{product.nome}</h2>
                    <h3>{product.descricao}</h3>
                </div>

                <div id="buttonsProduct">
            <button onClick={addCarrinho}>Carrinho</button>
            <button>Comprar</button>
        </div>

            </div>

        <div id="productsSide">
            <Products 
            titulo={"Mais Produtos"}
            query={`categoria=${product.categoria_id}&limit=6`}/>
        </div>

        <Comentarios id={props.match.params.id}/>
        </main>
        </>
    )
}

export default Product