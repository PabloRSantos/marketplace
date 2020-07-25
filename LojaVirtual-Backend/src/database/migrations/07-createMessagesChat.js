async function up(knex){
    return knex.schema.createTable("messages_chat", table => {
        table.increments("id").primary()
        table.string("text").notNullable()
        table.integer("chat_id").notNullable().references("id").inTable("chats")
    })
}

 async function down(knex){
    return knex.schema.dropTable("messages_chat")
}

module.exports = {up, down}

