import styled from "styled-components";
import { Link } from "react-router-dom"


export const Cabecalho = styled.header`
 
 background-color: #307351;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 50px;
    overflow-x: hidden;

ul {
    list-style: none;
    display: flex;
}


.hamburguer {
    display: none;
}



img {
    max-width: 100%;
}

@media(max-width: 500px){
    ul {
      position: fixed;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      display: ${props => props.Display};

      background-color: #307351;
      padding: 8px;
      width: 150px;
      right: 0;
      top: 55px;
      z-index: 6;

      height: 30vh;
    }

    li {
        margin: 0;
        text-align: center;
    }
    
    .hamburguer {
        display: flex;
        font-weight: 500;
        cursor: pointer;
        font-size: 25px;
    }
}
`;

export const Items = styled(Link)`
    margin: 0 15px;
    font-weight: 700;
    cursor: pointer;
    font-size: 18px;
    color: white;
    text-decoration: none;
`

export const LinkHeader = styled(Link)`
    color: white;
    text-decoration: none;
    max-width: 60px;
    display: flex;
    align-items: center;
`

export const Categorias = styled.section`

background-color: #327a55;
    color: white;
    padding: 12px 50px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    ul {
    list-style: none;
    display: flex;
}

    li {
    font-weight: 500;
    margin: 0 30px;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

    nav {
        display: none;
        font-weight: 500;
        color: white;
        font-size: 16px;
        cursor: pointer;
    }

    .linkHeader {
    color: white;
    text-decoration: none;
}


@media(max-width: 850px) {
    nav {
        display: flex;
        align-items: center;
    }

    ul {
        display: ${props => props.categoriaResponsive};

      position: fixed;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      background-color: #327a55;
      padding: 8px;
      width: 250px;
      border-radius: 5px;

      right: 0;
      left: 0;
      margin: 0 auto;
      top: 100px;
      z-index: 5;

      height: 400px;
    }
    
}

`


/*@media (max-width: 800px) {
    
    #nav li {
        display: none;
    }

    ul .hamburguer {
        display: block !important;
    }

    ul.hamburguer:hover {
        
    }
}*/