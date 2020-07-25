import React, {useEffect, useState} from "react"
import Header from "../../components/header"
import api from "../../services/api"

const Chat = () => {

  useEffect(() => {
    api.get("chat")
    .then(response => console.log(response))
  }, [])

    return (
        <main id="Chat">
          <Header />
          <div id="chatContent">
              
          </div>
        </main>
    )
}

export default Chat