const knex = require("../database/connections")

exports.index = async(req, res) => {
    const categorias = await knex("categorias").select("*")
    return res.json(categorias)
}