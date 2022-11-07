
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('resources', function (t) {
            t.increments('id').notNullable()

            t.integer('parent_id').index().references('id').inTable('resources')
            
            t.string('name').notNullable()
            t.string('type').notNullable()
            t.string('key').notNullable()
            t.string('description').nullable()
            t.string('link').nullable()

            t.datetime('created_at').notNullable().defaultTo(knex.raw('NOW()'))
            t.datetime('updated_at').notNullable().defaultTo(knex.raw('NOW()'))
        }),
        knex.schema.createTable('resources_profiles', function (t) {
            t.increments('id').notNullable()
           
            t.integer('resource_id').index().references('id').inTable('resources')
            t.integer('profile_id').index().references('id').inTable('profiles')
            
            t.datetime('created_at').notNullable().defaultTo(knex.raw('NOW()'))
            t.datetime('updated_at').notNullable().defaultTo(knex.raw('NOW()'))
        }),
    ])
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('resources_profiles'),
        knex.schema.dropTable('resources'),
    ])
};