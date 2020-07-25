import styled from "styled-components"

export const Main = styled.div`
  display: grid;
    grid-template-areas: 
    "img infos"
    "descricao side"
    "comentarios side";
    grid-template-columns: 2fr 1.1fr;


    width: 80%;
    margin: 42px auto;
    background-color: white;
    border-radius: 5px;

    @media(max-width: 1200px) {
        grid-template-areas: 
        "img"
        "infos"
        "comentarios"
        "side";
        grid-template-columns: 1fr;

}



`
export const Imagem = styled.div`

grid-area: img;
    padding: 30px;
    border-bottom: 2px solid #d3d3d2;

     img {
    width: 100%;
    max-height: 100%;
    border-radius: 5px;
    object-fit: cover;
} 

`
export const InfoSide = styled.div`

grid-area: infos;
    color: rgb(86, 87, 88);
    padding: 42px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border-left: 2px solid #d3d3d2;
    border-bottom: 2px solid #d3d3d2;

    h1 {
    font-size: 60px;
    color: #28945c;
}

    h2{
    margin-top: 16px;
    font-size: 32px;
}

     h3 {
    text-align: justify;
    margin-top: 32px;
    font-weight: 500;
    margin-left: 8px;
}

@media(max-width: 1200px) {

    border-left: none;

}

@media (max-width: 400px) {
    h3 {
        font-size: 14px;
    }
    
}
`
export const Top = styled.div`
`
export const Spans = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    margin-bottom:16px;
    text-align: center;

   p {
    margin: 0 8px;
}
`
export const Buttons = styled.div`

grid-area: buttons;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 24px;

  button { 
    background-color: #28945c;
    color: white;
    border: none;
    outline: none;
    flex: 1;
    height: 50px;
    padding: 10px 12px;
    margin: 5px 10px;
    border-radius: 5px;

    font-weight: 500;
    font-size: 24px;
    
    cursor: pointer;
    transition: .3s;
}

 button:hover {
    filter: brightness(.95);
}
`
export const SideProducts = styled.div`
    grid-area: side;
    border-left: 2px solid #d3d3d2;

  h1 {
    font-size: 40px;
    color: rgb(86, 87, 88);
    margin-top: 24px;
    text-align: center;
}

 .link {
    display: flex;
    justify-content: flex-start;

    color: #28945c;
    text-decoration: none;

    width: 100%;
    margin: 0 auto;
}

 * {
    margin: 0;
    padding: 0;
}

 .product {
    margin: 30px auto;
    padding: 0 30px;
}


 .imagem{
    width: 100px;
    height: 100px;
}

 .imagem img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

 .preco {
    margin-left: 20px;
    margin-top: 5px;
    font-size: 20px;
    font-weight: 500;
}

.seta {
    display: none;
}

@media(max-width: 1200px) {


    border-left: none;
    border-top: 3px solid #d3d3d2;
}

@media (max-width: 400px) {
   
     h1 {
        font-size: 24px;
    }    

}
`

export const Descricao = styled.div`
 grid-area: descricao;
    padding: 30px;
    border-bottom: 2px solid #d3d3d2;

     button {
        background-color: #28945c;
        color: white;
        border: none;
        outline: none;
        flex: 1;
        padding: 7px 12px;
        border-radius: 5px;
    
        font-weight: 500;
        font-size: 20px;
        
        cursor: pointer;
        transition: .3s;
    }
    
      button:hover {
        filter: brightness(.95);
    }
`









 






