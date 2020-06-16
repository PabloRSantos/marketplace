import React, { useEffect, useState } from "react"
import api from "../../../services/api"
import './style.css'
import {Link} from "react-router-dom"

const UserProducts = () => {
    const [products, setProducts] = useState([])
    const [deleteProducts, setDeleteProducts] = useState(0)

    useEffect(() => {
        const id = localStorage.getItem("LojaVirtualId")
        api.get(`products?user=${id}`)
            .then(response => {
                setProducts(response.data)
            })
    }, [deleteProducts])

    function deleteProduct(id) {
        if(window.confirm("Tem certeza que quer deletar esse produto?")) {
            api.delete(`products/${id}`)
            .then((response) => {
                alert(response.data.message)
                setDeleteProducts(deleteProducts + 1)
            })
            .catch(() => alert("Erro ao deletar, tente novamente"))
        } else {
            return
        }
    }

    return (
        <>
            <main id="userProdutos">
                <div id="buttonUserProduto">
                   <Link to="/user/addProduto">
                   <button>Adicionar Produto</button>   </Link>
                </div>
                {products.length == 0 ? (
                    <p>Nenhum produto encontrado</p>
                ) : (
                        products.map(product => (
                            <div key={product.id} className="product">
                                <p onClick={() => deleteProduct(product.id)} className="delete">X</p>
                            <div className="productPic">
                             <img src={`http://localhost:3333/uploads/${product.imagem}`}/>
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