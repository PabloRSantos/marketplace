
exports.seed = async (knex) => {

    await knex("categorias").del()

    await knex("categorias").insert([
       {nome: "Veículos", produtos: 0},
       {nome: "Tecnologia", produtos: 0},
       {nome: "Jóias", produtos: 0},
       {nome: "Esporte e Lazer", produtos: 0},
       {nome: "Livros", produtos: 0},
       {nome: "Moda", produtos: 0}
    ])

}
