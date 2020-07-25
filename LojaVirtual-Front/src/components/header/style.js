import styled from "styled-components";

export const Cabecalho = styled.header`
 
 background-color: #307351;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    overflow-x: hidden;

ul {
    list-style: none;
    display: flex;
}

li {
    margin: 0 15px;
    font-weight: 700;
    cursor: pointer;
    font-size: 18px;
}

.hamburguer {
    display: none;
}

.linkHeader {
    color: white;
    text-decoration: none;
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

export const Categorias = styled.section`

background-color: #327a55;
    color: white;
    padding: 12px 0;
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


@media(max-width: 750px) {
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