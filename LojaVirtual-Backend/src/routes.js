const express = require("express")

const productsController = require("./controllers/productsController")
const categoriasController = require("./controllers/categoriasController")
const usersController = require("./controllers/usersController")
const comentariosController = require("./controllers/comentariosController")
const carrinhoController = require("./controllers/carrinhoController")
const chatController = require("./controllers/chatController")

const authMiddleware = require("./middlewares/auth")
const multer = require("multer")
const multerConfig = require("./config/multer")

const uploadProduct = multer(multerConfig.product)
const uploadUser = multer(multerConfig.user)


const rota = express.Router()


rota.get("/categorias",categoriasController.index)


rota.get("/products", productsController.index)

rota.post("/products", authMiddleware, uploadProduct.single("imagem"), productsController.create)

rota.delete("/products/:id", authMiddleware, productsController.delete)

rota.get("/products/:id", productsController.show)

rota.put("/products", authMiddleware, productsController.update)



rota.post("/login", usersController.login)

rota.post("/cadastro", usersController.cadastro)

rota.put("/user/profilePic", authMiddleware, uploadUser.single("foto"), usersController.profilePic)

rota.get("/user/vendas", authMiddleware, usersController.vendas)

rota.get("/user/profile", authMiddleware, usersController.perfil)


rota.post("/comentario", authMiddleware, comentariosController.create)

rota.get("/comentario", comentariosController.index)

rota.get("/carrinho",  authMiddleware, carrinhoController.showProducts)

rota.post("/carrinho", authMiddleware, carrinhoController.addCarrinho)

rota.delete("/carrinho", authMiddleware, carrinhoController.removeCarrinho)


rota.get("/chat", authMiddleware, chatController.show)

rota.post("/chat", authMiddleware, chatController.create)

module.exports = rota

