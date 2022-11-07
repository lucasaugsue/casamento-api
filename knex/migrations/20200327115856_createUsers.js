
exports.up = function (knex) {
    return knex.schema.createTable('users', function (t) {
        t.increments('id').notNullable()
        
        t.integer('address_id').nullable().index().references('id').inTable('addresses')

        t.string('name').notNullable()
        t.string('username').nullable()
        t.string('cpf').nullable()
        t.string('document_number').nullable()
        t.string('document_type').nullable().default("RG")
        t.string('email').nullable()
        t.string('phone').nullable()
        t.string('password').nullable()
        t.date('birthday').nullable()
        
        t.datetime('created_at').notNullable().defaultTo(knex.raw('NOW()'))
        t.datetime('updated_at').notNullable().defaultTo(knex.raw('NOW()'))
    });
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('users')
    ])
};