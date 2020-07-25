async function up(knex){
    return knex.schema.createTable("chat_users", table => {
        table.increments("id").primary()
        table.integer("user_id").notNullable().references("id").inTable("users")
    })
}

 async function down(knex){
    return knex.schema.dropTable("chat_users")
}

module.exports = {up, down}

