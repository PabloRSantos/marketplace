const knex = require("../database/connections")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")


function generateToken (params = {}){
    const auth = process.env.JWT_AUTH 

    return jwt.sign(params, auth, {
       // expiresIn: 86400,
    })
}

exports.cadastro = async (req, res) => {

    const users = await knex("users").select("email").where("email", req.body.email)

    if(users[0] != null) {
            return res.json({error: "Email já cadastrado"})
    }

    if(req.body.senha != req.body.senha2) {
            return res.json({error: "Senhas não correspondem"}) 
    }

    const hash = await bcrypt.hash(req.body.senha, 10)
    req.body.senha = hash

    let { nome, senha, email} = req.body

    const user = knex("users").insert({nome, senha, email})
    .then(() => {
        return res.json({
            sucess: "Cadastrado com sucesso", 
            token: generateToken({id: user.id}),
            id: user.id
    })
}).catch(() => {
    return res.status(404).json({error: "Erro ao cadastrar, tente novamente"})
})

}

exports.login = async(req, res) => {
    
    const user = await knex("users").first().select("*").where({
        email: req.body.email,
    })

    if(user == null || user == undefined) {
        return res.json({error: "Usuário não encontrado"})
    }

    if(!await bcrypt.compare(req.body.senha, user.senha))
        return res.json({error: "Senha inválida"})  
    

    return res.json({ 
        token: generateToken({id: user.id}),
        id: user.id
    })

    //return res.json({message: `Olá ${req.body.nome}, seu login foi efetuado com sucesso`})

}

exports.vendas = async(req, res) => {
    const products = knex("products").where("user_id", req.query.user).select("*")

    if(!products) {
        return res.status(404).json({message: "Nenhum produto encontrado"})
    }

    return res.json(products)
}

exports.perfil = async(req, res) => {
    
    const user = await knex("users").limit(1).where("id", req.userId).select("*")

    if(user[0] == null) {
        return res.json({error: "Erro no token"})
    }

    return res.json({user})
}

exports.profilePic = async(req, res) => {
    const fotoAntiga = await knex("users").select("foto").where("id", req.body.id).first()

    fs.unlink(path.resolve(__dirname, "..", "..", "uploads", "user", fotoAntiga.foto), async function(){
        await knex("users").where("id", req.body.id).first().update("foto", req.file.filename)
        return res.json({sucess: "Salvo com sucesso"})
    })
}


