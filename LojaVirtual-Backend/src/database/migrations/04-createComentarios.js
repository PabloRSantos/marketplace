
 exports.up = knex => {
    return knex.schema.createTable("comentarios", table => {
        table.increments("id").primary()
        table.string("conteudo").notNullable()
        table.timestamp('created').defaultTo(knex.fn.now());
        table.integer("user_id").notNullable().references("id").inTable("users")
        table.integer("product_id").notNullable().references("id").inTable("products")
    })
}

 exports.down = knex => {
    return knex.schema.dropTable("comentarios")
}



