exports.name = "20160830095427_init";

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('users', function (table) {
            table.increments();
            table.string('name');
            table.timestamps();
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
    ]);
};
