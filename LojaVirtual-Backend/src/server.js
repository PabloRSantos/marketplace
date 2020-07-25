const express = require("express")
const cors = require("cors")
const rotas =  require("./routes.js")
const {errors} = require("celebrate")
const path = require("path")
require("dotenv/config")


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(rotas)

app.use("/uploads/products", express.static(path.resolve(__dirname, "..", "uploads", "products")))
app.use("/uploads/user", express.static(path.resolve(__dirname, "..", "uploads", "user")))

app.use(errors())

app.listen(process.env.PORT || 3333, () => console.log("servidor rodando"))
