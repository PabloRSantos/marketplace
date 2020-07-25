import React, {useEffect, useState} from "react"
import api from "../../services/api"
import Header from "../../components/header"
import {Main, Imagem, InfoSide, Top, Spans, Buttons, SideProducts, Descricao} from "./style"
import Comentarios from "../../components/Comentarios"
import Products from "../../components/Products"
import {useLocation} from "react-router-dom"


const Product = (props) => {
    const [product, setProduct] = useState({})
    const location = useLocation()
    
    useEffect(() => {
        api.get(`products/${props.match.params.id}?categoria=${location.state.categoria}`)
        .then(response => setProduct(response.data))

    }, [props.match.params.id])

    function addCarrinho(){
        const product_id = product.id
        
        api.post("carrinho", {product_id})
        .then(response => console.log(response.data))
    }

    return (
        <>
        <Header />
        <Main>
            <Imagem>
                <img src={`http://localhost:3333/uploads/products/${product.imagem}`} alt="imagem do produto"/>
            </Imagem>
            <InfoSide>

                <Top>
                <Spans>
                     <p>{product.vendidos} Produtos vendidos</p>
                     <p>{product.unidades} Unidade(s) disponivel(s)</p>
                </Spans>
                    <h1>R${product.preco}</h1>
                    <h2>{product.nome}</h2>
                </Top>

                <Buttons>
            <button onClick={addCarrinho}>Carrinho</button>
            <button>Comprar</button>
        </Buttons>

            </InfoSide>

        <SideProducts>
            <Products 
            titulo={"Mais Produtos"}
            query={`categoria=${product.categoria_id}&limit=6`}/>
        </SideProducts>

        <Descricao>
            <div id="ProductUser">
                <img src={`http://localhost:3333/uploads/user/${product.foto}`}></img>
                <h2>{product.nome}</h2>
            </div>

            <button>Chat</button>
            <h1>Descrição:</h1>
            <p>{product.descricao}</p>
        </Descricao>

        <Comentarios id={props.match.params.id}/>
        </Main>
        </>
    )
}

export default Product