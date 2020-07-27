

 async function up(knex){
    return knex.schema.createTable("relacionamento", table => {
        table.increments("id").primary()
        table.integer("product_id")
        .notNullable()
        .references('id')
        .inTable("products")

        table.integer("categoria_id")
        .notNullable()
        .references("id")
        .inTable("categorias")
    })
}

 async function down(knex){
    return knex.schema.dropTable("relacionamento")
}

module.exports = {up, down}

