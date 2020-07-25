
const knex = require("../database/connections")

exports.show = async(req, res) => {

    const resultado = await knex("chats")
    .where('user1', req.userId)
    .orWhere('user2', req.userId)
    
    const dados = resultado.map(dado => {
        if(dado.user1 == req.userId) {
            delete dado.user1
            dado.user = dado.user2
            delete dado.user2
        }

        else {
            delete dado.user2
            dado.user = dado.user1
            delete dado.user1
        } 

        return dado
    })

    const users = await knex("users")
    .join("chat_users", "chat_users.user_id", "=", "users.id")

    return res.json(users)
}

exports.create = async (req, res) => {



    const trx = await knex.transaction() //se 1 insert n da certo, ele cancela o outro

    await trx("chats").insert({user1: req.userId, user2: req.body.user2})

    await trx("chat_users").insert("user_id", req.userId)

    await trx("chat_users").insert("user_id", req.body.user2)

    await trx.commit()

    return res.json({sucess: "Salvo com sucesso"})


}
