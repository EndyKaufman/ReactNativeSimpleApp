
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('items', function (table) {
            table.float('cost')
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.hasColumn('items', 'cost').then(function (exists) {
            if (exists) {
                return knex.schema.table('items', function (table) {
                    table.dropColumn('cost');
                });
            }
        })
    ]);
};
