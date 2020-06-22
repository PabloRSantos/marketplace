import React, { useEffect, useState } from "react"
import api from "../../../services/api"
import './style.css'
import {Link} from "react-router-dom"
import Header from "../../../components/header"
import Confirm from "../../../components/Confirm"

const UserProducts = () => {
    const [products, setProducts] = useState([])
    const [deleteProducts, setDeleteProducts] = useState(0)
    const [classAlert, setClassAlert] = useState("hidden")

    useEffect(() => {
        const id = localStorage.getItem("LojaVirtualId")
        api.get(`products?user=${id}`)
            .then(response => {
                setProducts(response.data)
            })
    }, [deleteProducts])

    function Confirmar (boolean) {
        if (boolean == 1) {
            deleteProduct(Number(classAlert))
        } else {
            setClassAlert("hidden")
        }
    }
    

    function deleteProduct (id){
           api.delete(`products/${id}`)
            .then((response) => {
                alert(response.data.message)
                setDeleteProducts(deleteProducts + 1)
                setClassAlert("hidden")
            })
            .catch(() => alert("Erro ao deletar, tente novamente"))
    }

    return (
        <> 
            <Confirm
            message={"Confirmar exclusão?"}
            classAlert={classAlert}
            confirm={() => Confirmar(1)}
            cancel={() => Confirmar(0)}/>
            
            <Header />
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
                                <Link to={`/product/${product.id}`}>
                                <p onClick={() => setClassAlert(product.id)} className="delete">X</p>
                            <div className="productPic">
                             <img src={`http://localhost:3333/uploads/products/${product.imagem}`}/>
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
                                </Link>
                            </div>
                        ))
                    )}
            </main>
        </>
    )
}

export default UserProducts