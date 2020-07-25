
const knex = require("../database/connections")

exports.show = async(req, res) => {

    const dados = await knex("chats").where('user1', req.userId).orWhere('user2', req.userId)
    

    return res.json(dados)
}

exports.create = async (req, res) => {

    await knex("chats").insert({user1: req.userId, user2: req.body.user2})

    return res.json({messages: "oi"})

}
