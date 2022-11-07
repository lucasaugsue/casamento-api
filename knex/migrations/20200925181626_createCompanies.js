
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('companies', function (t) {
            t.increments('id').notNullable()
            
            t.string('name').notNullable()
            t.string('cnpj').notNullable()

            t.datetime('created_at').notNullable().defaultTo(knex.raw('NOW()'))
            t.datetime('updated_at').notNullable().defaultTo(knex.raw('NOW()'))
        }),
        knex.schema.createTable('company_profiles', function (t) {
            t.increments('id').notNullable()
           
            t.integer('user_id').index().references('id').inTable('users')
            t.integer('company_id').index().references('id').inTable('companies')
            t.integer('profile_id').index().references('id').inTable('profiles')
            
            t.datetime('created_at').notNullable().defaultTo(knex.raw('NOW()'))
            t.datetime('updated_at').notNullable().defaultTo(knex.raw('NOW()'))
        }),
    ])
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('company_profiles'),
        knex.schema.dropTable('companies'),
    ])
};