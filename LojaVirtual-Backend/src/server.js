const express = require("express")
const cors = require("cors")
const rotas =  require("./routes.js")
const path = require("path")
require("dotenv/config")
const knex = require("./database/connections")


const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(rotas)

app.use("/uploads/products", express.static(path.resolve(__dirname, "..", "uploads", "products")))
app.use("/uploads/user", express.static(path.resolve(__dirname, "..", "uploads", "user")))


io.on("connection", socket => {

    socket.on("LogInRoom", async idRoom => {
        

        const messages = await knex("messages_chat").where("chat_id", idRoom).select("text", "id", "user_id") || "Nenhuma mensagem encontrada" 

        socket.emit("previousMessages", messages)

        socket.join(idRoom)

        socket.on("sendMessage", async data => {

            data.chat_id = idRoom
            await knex("messages_chat").insert(data)
    
            socket.to(idRoom).emit("receivedMessage", data)
        })

        /*socket.on("createRoom", async newRoom => {
            await knex("chats").insert(newRoom).returning("id")

        })*/
    })

   
})

server.listen(process.env.PORT || 3333, () => console.log("servidor rodando"))

