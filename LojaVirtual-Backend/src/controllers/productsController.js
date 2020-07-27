const knex = require("../database/connections")
const fs= require('fs');
const path = require("path")

    exports.index = async (req, res) => {

        if(req.query.pesquisa){

            const limit = req.query.limit || 50
            const page = req.query.page

            const skip = (page - 1) * limit

            if(req.query.categoria) {

            const products = await knex("products")
            .join("relacionamento", "products.id", "=", "relacionamento.product_id")
            .where("relacionamento.categoria_id", req.query.categoria)
            .where("tags", "like", `%${req.query.pesquisa}%`)
            .select("*")
            .offset(skip)
            .limit(limit)

            let count = await knex("products").where("tags", "like", `%${req.query.pesquisa}%`).count("id" , {as: 'count'})

            const pages = count[0].count / limit 

            return res.json({products, pages})
            
            } else {

                const products = await knex("products").where("tags", "like", `%${req.query.pesquisa}%`)
                .offset(skip)
                .limit(limit)

                let count = await knex("products").where("tags", "like", `%${req.query.pesquisa}%`).count("id" , {as: 'count'})

            const pages = count[0].count / limit

            return res.json({products, pages})

            }
        }

        if(req.query.categoria && !req.query.pesquisa) {
                const categorias = req.query.categoria
                const limit = req.query.limit || 50
                const page = req.query.page

                const skip = (page - 1) * limit
                
                const products = await knex("products")
                .join("relacionamento", "products.id", "=", "relacionamento.product_id")
                .where("relacionamento.categoria_id", categorias)
                .select("*")
                .offset(skip)
                .limit(limit)

                let count = await knex("products")
                .join("relacionamento", "products.id", "=", "relacionamento.product_id")
                .where("relacionamento.categoria_id", categorias)
                .count("products.id" , {as: 'count'})

            const pages = count[0].count / limit

            return res.json({products, pages})
            }

        if(req.query.tipo){
            const limit = req.query.limit || 8
            const page = req.query.page

            const skip = (page - 1) * limit

            const products = await knex("products")
            .join("relacionamento", "products.id", "=", "relacionamento.product_id")
            .orderBy(req.query.tipo, req.query.ordenar)
            .offset(skip)
            .limit(limit)
        

            let count = await knex("products").count("id" , {as: 'count'})

            const pages = count[0].count / limit
            

            return res.json({products, pages})
        }

        if(req.query.user) {
            const page = req.query.page
            const limit = req.query.limit || 10


            const skip = (page - 1) * limit
            let products = await knex("products")
            .join("relacionamento", "products.id", "=", "relacionamento.product_id")
            .where("products.user_id", req.query.user)
            .orderBy("products.id", "desc")
            .offset(skip)
            .limit(limit)

            let count = await knex("products").where("user_id", req.query.user).count("id" , {as: 'count'})

            const pages = count[0].count / 10

            return res.json({products, pages})
        }

        const products = await knex("products")
        .join("relacionamento", "product.id", "=", "relacionamento.product_id")
        .select("*")

        let count = await knex("products").count("id" , {as: 'count'})

        const pages = count[0].count / 10

        return res.json({products, pages})
    }

    exports.create = async (req, res) => {

        let {
            nome,
            descricao,
            cores,
            unidades,
            modelo,
            categorias,
        } = req.body

        const infos = `${nome} ${descricao} ${modelo}`
        const tags = infos
        const preco = req.body.preco.replace(",", ".")

        const product = {
            nome,
            preco,
            descricao,
            cores,
            unidades,
            modelo,
            tags,
            user_id: req.userId,
            imagem: req.file.filename
        }
        
        const trx = await knex.transaction() //se 1 insert n da certo, ele cancela o outro

        const idsProducts = await trx("products").insert(product).returning("id")

        const product_id = idsProducts[0]

        const relacionamento = await categorias
        .map(categoria => parseInt(categoria.split()))
        .map(categoria_id => {
            return {
                categoria_id,
                product_id
            }
        })

        await trx("relacionamento").insert(relacionamento)
        await trx.commit()

        return res.json({sucess: "Salvo com sucesso"})
    }

    exports.delete = async (req, res) =>{
        const id = req.params.id

        const imagem = await knex("products").where("id", id).select("imagem")

        await knex("products")
        .where({id: id})
        .del()

        fs.unlink(path.resolve(__dirname, "..", "..", "uploads", "products", imagem[0].imagem), function(){
            return res.json({message: "Excluido com sucesso"})
        })

    }

    exports.show = async(req, res) => {
        const id = req.params.id
 

        const product = await knex("products").first()
        .join("relacionamento", "products.id", "=", "relacionamento.product_id")
        .join("users", "users.id", "=", "products.user_id")
        .where("relacionamento.categoria_id", req.query.categoria)
        .where("products.id", id)
        .select("*")

        return res.json(product)
    }

    exports.update = async(req, res) => {

        let query = JSON.stringify(req.query).replace("{", "").replace("}", "").split(":")
        query = query.toString().replace(/"+/g, '').split(",")

        const product = await knex("products").where("id", query[1]).update(query[2], query[3])

        return res.json({message: "Sucesso"})
    }


