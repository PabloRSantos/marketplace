import React, {useEffect, useState} from "react"
import api from "../../services/api"
import Header from "../../components/header"
import {Main,
     Imagem,
     InfoSide,
     Top,
     Spans,
     Vendedor,
     Buttons,
     SideProducts,
     Descricao,
    ContentDescricao} from "./style"
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

    async function createChat(){
       const {data} = await api.post("chat", {user2: product.user_id})

       console.log(data)
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
                     <p>{product.vendidos} Vendidos</p>
                     <p>{product.unidades} disponivel(s)</p>
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

        <ContentDescricao>
            <h1>Vendedor:</h1>
            <Vendedor>
                <div>
                    <img src={`http://localhost:3333/uploads/user/${product.foto}`}></img>
                    <h2>{product.nome}</h2>
                </div>

                <button onClick={createChat}>Chat</button>

            </Vendedor>

            <Descricao>
                <h1>Produto:</h1>
                <p>{product.descricao}</p>
            </Descricao>
        </ContentDescricao>

        <Comentarios id={props.match.params.id}/>
        </Main>
        </>
    )
}

export default Product