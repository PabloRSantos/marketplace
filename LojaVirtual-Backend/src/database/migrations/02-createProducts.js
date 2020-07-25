

 exports.up = knex => {
    return knex.schema.createTable("products", table => {
        table.increments("id").primary()
        table.string("nome").notNullable()
        table.decimal("preco").notNullable()
        table.string("descricao").notNullable()
        table.string("imagem").notNullable()
        table.string("cores").notNullable()
        table.decimal("unidades").notNullable()
        table.decimal("vendidos").defaultTo(0)
        table.integer("user_id").notNullable().references("id").inTable("users")
        table.string("modelo")
        table.string("tags")
    })
}

 exports.down = knex => {
    return knex.schema.dropTable("products")
}



