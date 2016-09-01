
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('items', function (table) {
            table.float('sale_cost')
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('items', function (table) {
            table.dropColumn('sale_cost');
        })
    ]);
};