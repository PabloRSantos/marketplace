
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

    const usersId = dados.map(id => id.user)

    const users = await knex("users")
    .whereIn("id", usersId)
    .select("user", "foto", "id")

    for(let i = 0; i < users.length; i++){
        users[i].chat_id = dados[i].id
    }


    return res.json(users)
}

exports.create = async (req, res) => {

    if(req.userId === req.body.user2) return res.json({error: "Erro ao criar chat"})

    const trx = await knex.transaction() //se 1 insert n da certo, ele cancela o outro

    await trx("chats").insert({user1: req.userId, user2: req.body.user2})

    await trx("chat_users").insert({user_id: req.userId})

    await trx("chat_users").insert({user_id: req.body.user2})


    await trx.commit()

    return res.json({sucess: "Salvo com sucesso"})


}
