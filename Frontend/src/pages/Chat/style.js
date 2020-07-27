import styled, {css} from "styled-components"

export const Content = styled.div`
    
    display: flex;

    width: 80%;
    height: 70vh;
    margin: 50px auto;

    border-radius: 8px;
    background-color: white;

    color: rgb(86, 87, 88);


    h1 {
        text-align: center;
        margin-bottom: 16px;
    }

 
`

export const Chats = styled.ul`
    flex: 1;
    border-right: 2px solid #d3d3d2;
    min-height: 100%;

    overflow-y: scroll;


       li {
        width: 100%;
        color: black;
        border-bottom: 2px solid rgba(211, 211, 210, 0.5);

        padding: 10px 30px;

        display: flex;
        align-items: center;
        cursor: pointer;
    }

    h2 {
    color: rgb(86, 87, 88);
    }

    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        
        margin-right: 12px;
    }
`

export const ContentMessages = styled.div`
    flex: 1.5;

    display: flex;
    flex-direction:column;
    justify-content: center;

    padding: 25px;

    #messages {
        width: 100%;
        height: 80%;
        max-height: 80%;
        flex: 1;
        display: flex;
        flex-direction: column;

        margin-bottom: 25px;
        background-color: #F6F5F4;
        border-radius: 5px;

        overflow-y: scroll;
        
    }

    form {
        display: flex;
    }

    input {
        border: none;
        border-radius: 5px;
        background-color: #F6F5F4;
        color:  rgb(86, 87, 88);
        font-size: 14px;
        padding: 8px;
        flex: 1;
    }

    button {
    background-color: #307351;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: .4s;
    margin-left: 10px;
}

button:hover {
    filter: brightness(.92);
}



`

export const Message = styled.div`
    background-color: #307351;
    color: white;
    max-width: 50%;
    padding: 6px 8px;
    margin: 5px;

    border-radius: 12px;

    ${props => props.user_id === true ?
        css`    
       align-self: flex-end;
       border-bottom-right-radius: 0px; 
    ` : css`
        border-bottom-left-radius: 0px; 
        align-self: flex-start;
    `}
`