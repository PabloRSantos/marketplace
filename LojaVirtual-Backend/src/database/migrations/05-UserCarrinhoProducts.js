

 async function up(knex){
    return knex.schema.createTable("carrinho", table => {
        table.increments("id").primary()
        table.integer("product_id")
        .notNullable()
        .references('id')
        .inTable("products")

        table.integer("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
    })
}

 async function down(knex){
    return knex.schema.dropTable("carrinho")
}

module.exports = {up, down}

