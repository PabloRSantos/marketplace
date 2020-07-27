const knex = require("../database/connections")

exports.addCarrinho = async (req, res) => {


      const {product_id} = req.body


      const carrinho = {
        user_id: req.userId,
        product_id
      }

      await knex("carrinho").insert(carrinho)
      
      return res.json({success: "Adicionado com sucesso!"})
  }

  exports.removeCarrinho = async (req, res) => {
      
      const {product_id} = req.query
      const user_id = req.userId

      let dados = await knex("carrinho").where({user_id, product_id}).first()
  
      await knex("carrinho").where("id", dados.id).del()

      return res.json({success: "Excluido com sucesso"})
  }

  exports.showProducts = async (req, res) => {

    const productsCarrinho = await knex("carrinho")
    .join("products", "products.id", "=", "carrinho.product_id")
    .where("carrinho.user_id", req.userId)

    return res.json(productsCarrinho)
  }
