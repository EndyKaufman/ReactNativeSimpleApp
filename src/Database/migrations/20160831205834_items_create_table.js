
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('items', function (table) {
            table.increments();
            table.string('title');
            table.string('description');
            table.timestamps();
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('items')
    ]);
};
