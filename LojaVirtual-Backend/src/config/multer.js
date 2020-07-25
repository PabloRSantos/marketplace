const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

exports.product = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "uploads", "products"),
        filename(req, file, callback) {
            const hash = crypto.randomBytes(6).toString("hex")

            const fileName = `${hash}-${file.originalname}`

            callback(null, fileName)//1 parametro é o erro, mas como é dificil de acontecer um erro nesses comandos basicos...
        }
    })
}

exports.user = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "uploads", "user"),
        filename(req, file, callback) {
            const hash = crypto.randomBytes(6).toString("hex")

            const fileName = `${hash}-${file.originalname}`

            callback(null, fileName)//1 parametro é o erro, mas como é dificil de acontecer um erro nesses comandos basicos...
        }
    })
}