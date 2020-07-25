async function up(knex){
    return knex.schema.createTable("chats", table => {
        table.increments("id").primary()
        table.integer('user1')
        table.integer('user2')

    
    })
}

 async function down(knex){
    return knex.schema.dropTable("chats")
}

module.exports = {up, down}

