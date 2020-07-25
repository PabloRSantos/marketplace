 async function up(knex){
    return knex.schema.createTable("users", table => {
        table.increments("id").primary()
        table.string("foto").notNullable().defaultTo("default.png")
        table.string("nome").notNullable().unique()
        table.string("senha").notNullable()
        table.string("email").notNullable().unique()
    })
}

 async function down(knex){
    return knex.schema.dropTable("users")
}

module.exports = {up, down}

