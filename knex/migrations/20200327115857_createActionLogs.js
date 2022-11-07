
exports.up = function (knex) {
    return knex.schema.createTable('action_logs', function (t) {
        t.increments('id').notNullable()
        t.integer('user_id').nullable()
        t.text('error').nullable()
        t.text('data').nullable()
        t.string('method').nullable()
        t.string('url').nullable()
        t.string('action').nullable()
        t.datetime('datetime').nullable()
    });
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('action_logs')
    ])
};