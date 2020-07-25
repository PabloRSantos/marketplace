const knex = require("../database/connections")

exports.index = async (req, res) => {
    const comentarios = await knex("comentarios").join("users", "users.id", "=", "comentarios.user_id").where("comentarios.product_id", req.query.id).orderBy("created", "desc")

    return res.json(comentarios)
}
exports.create = async (req, res) => {
    const body = req.body
    body.user_id = req.userId

    await knex("comentarios").insert(body)

    return res.json({sucess: "Salvo com sucesso"})
}