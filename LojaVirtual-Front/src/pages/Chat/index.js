import React, {useEffect, useState} from "react"
import Header from "../../components/header"
import api from "../../services/api"
import {Content, Chats, ContentMessages} from "./style"
import io from "socket.io-client"


const socket = io("http://localhost:3333/")
socket.on("connection")

const Chat = () => {
  const [chats, setChats] = useState([])
  const [chatId, setChatId] = useState(0)

  useEffect(() => {
    api.get("chat")
    .then(response => {
     
      setChats(response.data)

    })
  }, [])

  function handleChat(chatId) {

  }

    return (
        <>
          <Header />
              <Content>
                  <Chats>
                    {chats.map(chat => (
                      <li
                      key={chat.chat_id}
                      onClick={() => handleChat(chat.chat_id)} >
                      
                        <img src={`http://localhost:3333/uploads/user/${chat.foto}`}></img>
                      <h2>{chat.nome}</h2>
                      </li>
                    ))}
                  </Chats>
                  
                  <ContentMessages>
                    {chatId !== 0 && (
                      <>
                        <div id="messages">
                        </div>
    
                        <form>
                        <input type="text" placeholder="Sua mensagem"/>
                        <button>Enviar</button>
    
                        </form>
                       </>
                    )}

                  </ContentMessages>
                </Content>
        </>
    )
}

export default Chat