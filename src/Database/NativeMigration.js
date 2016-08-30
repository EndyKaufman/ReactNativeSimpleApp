import React from 'react';

/** migration list start */
import mig_20160830095427_init from './migrations/20160830095427_init';
var migrations = [mig_20160830095427_init];
/** migration list end */

var knex = require('./../../node_modules/knex/build/knex.js')({
    useNullAsDefault: true,
    client: 'sqlite3'
});

class NativeMigration {

    fakePromise() {
        var vm = this;
        return {
            all(items) {
                var sql_items = [];
                items.forEach(function (item) {
                    sql_items.push(item.toString());
                })
                return sql_items;
            }
        }
    }

    up() {
        var vm = this;
        migrations.forEach(function (migration) {
            console.log(migration.name, migration.up(knex, vm.fakePromise()));
        })
    }

    down() {
        var vm = this;
        migrations.forEach(function (migration) {
            migration.down(knex, vm.fakePromise());
        })
    }
}

export default new NativeMigration();