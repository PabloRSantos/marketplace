import React, {useEffect, useState} from "react"
import api from "../../services/api"
import Header from "../../components/header"
import "./style.css"

const Product = (props) => {
    const [product, setProduct] = useState({})


    useEffect(() => {
        api.get(`products/${props.match.params.id}`)
        .then(response => setProduct(response.data))
    }, [])

    return (
        <>
        <Header />
        <main id="showProduct">
            <div id="imagem">
                <img src={`http://localhost:3333/uploads/${product.imagem}`} alt="imagem do produto"/>
            </div>
            <div id="infosSide">
                
                <div id="top">
                    <h1>R${product.preco}</h1>
                    <h2>{product.nome}</h2>
                    <h3>{product.descricao}</h3>
                </div>

                <div id="spans">
                     <p>{product.vendidos} Produtos vendidos</p>
                     <p>{product.unidades} Unidade(s) disponivel(s)</p>
                     <p>Cores: {product.cores}</p>
                </div>

            </div>
        </main>
        </>
    )
}

export default Product