import React, {useEffect, useState} from "react"
import Header from "../../components/header"
import api from "../../services/api"
import {Content, Chats, ContentMessages, Message} from "./style"
import io from "socket.io-client"


const socket = io("http://localhost:3333/")
socket.on("connection")

const Chat = () => {
  const [chats, setChats] = useState([])
  const [chatId, setChatId] = useState(0)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState()
  const userId = localStorage.getItem("LojaVirtualId")


  socket.on("previousMessages", msg => {
    setMessages(msg)
    console.log(msg)
  })

  socket.on("receivedMessage", msg => setMessages([...messages, msg]))
  

  useEffect(() => {
    api.get("chat")
    .then(response => {
     
      setChats(response.data)

    })
  }, [])

  function handleChat(chat_id) {

    socket.emit("LogInRoom", chat_id)

    setChatId(chat_id)
  }

  function handleInput(event){
    setMessage(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault()


    socket.emit("sendMessage", {text: message, user_id: userId})
    setMessages([...messages, {text: message, id: 5, user_id: userId}])
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
                      <h2>{chat.user}</h2>
                      </li>
                    ))}
                  </Chats>
                  
                  <ContentMessages>
                    {chatId !== 0 && (
                      <>
                        <div id="messages">
                          {messages.map(msg => (
                            <Message key={msg.id} user_id={userId == msg.user_id ? true : false}>
                              <p>{msg.text}</p>
                            </Message>
                          ))}
                        </div>
    
                        <form>
                        <input value={message} onChange={handleInput} type="text" placeholder="Sua mensagem"/>
                        <button onClick={handleSubmit}>Enviar</button>
    
                        </form>
                       </>
                    )}

                  </ContentMessages>
                </Content>
        </>
    )
}

export default Chat