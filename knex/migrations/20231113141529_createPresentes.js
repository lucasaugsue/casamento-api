
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('presentes', function (t) {
            t.increments('id').notNullable()
            
            t.string('nome').notNullable()
            t.string('url').nullable()
            t.string('preco').notNullable()
            t.string('descricao').notNullable()
            t.boolean('favorito').notNullable()
            t.string('mais_informacoes', 1000).nullable()

            t.datetime('created_at').notNullable().defaultTo(knex.raw('NOW()'))
            t.datetime('updated_at').notNullable().defaultTo(knex.raw('NOW()'))
        }),
    ])
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('presentes'),
    ])
};