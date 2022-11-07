
exports.up = function (knex) {
    return knex.schema.createTable('profiles', function (t) {
        t.increments('id').notNullable()
        
        t.string('name').notNullable()

        t.datetime('created_at').notNullable().defaultTo(knex.raw('NOW()'))
        t.datetime('updated_at').notNullable().defaultTo(knex.raw('NOW()'))
    });
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('profiles')
    ])
};