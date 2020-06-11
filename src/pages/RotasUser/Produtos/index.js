import React, { useEffect, useState } from "react"
import Header from "../../../components/header"
import api from "../../../services/api"
import './style.css'
import {Link} from "react-router-dom"

const UserProducts = () => {
    const [products, setProducts] = useState([])


    useEffect(() => {
        const id = localStorage.getItem("LojaVirtualId")
        api.get(`products?user=${id}`)
            .then(response => {
                setProducts(response.data)
            })
    }, [])

    function addProduct() {

    }

    return (
        <>
            <Header />
            <main id="userProdutos">
                <div id="buttonUserProduto">
                   <Link to="/users/addProduto">
                   <button onClick={addProduct}>Adicionar Produto</button>   </Link>
                </div>
                {products.length == 0 ? (
                    <p>Nenhum produto encontrado</p>
                ) : (
                        products.map(product => (
                            <div key={product.id} className="product">

                                <div className="productPic">

                                </div>
                                <div className="productInfo">
                                    <div className="productCima">
                                        <h1>{product.nome}</h1>
                                        <p>{product.descricao}</p>
                                    </div>
                                    <div className="productBaixo">
                                        <p>Preço: {product.preco}</p>
                                        <p>Unidades: {product.unidades}</p>
                                        <p>Unidades vendidas: {product.vendidos}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
            </main>
        </>
    )
}

export default UserProducts