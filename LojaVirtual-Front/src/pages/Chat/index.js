import React, {useEffect, useState} from "react"
import Header from "../../components/header"
import api from "../../services/api"
import {Content} from "./style"

const Chat = () => {
  const [conversas, setConversas] = useState([])

  useEffect(() => {
    api.get("chat")
    .then(response => {
     

      console.log(response.data)
      setConversas(response.data)

    })
  }, [])

    return (
        <>
          <Header />
          <Content id="chatContent">
                
          </Content>
        </>
    )
}

export default Chat