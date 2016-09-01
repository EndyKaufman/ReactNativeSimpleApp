import React from 'react';

/** migration list start */
import mig_20160831205834_items_create_table from './migrations/20160831205834_items_create_table';
import mig_20160831235347_items_add_fields from './migrations/20160831235347_items_add_fields';
import mig_20160901234109_items_add_fields from './migrations/20160901234109_items_add_fields';
var migrations= [mig_20160831205834_items_create_table,
mig_20160831235347_items_add_fields,
mig_20160901234109_items_add_fields];
var migrations_names= ["20160831205834_items_create_table",
"20160831235347_items_add_fields",
"20160901234109_items_add_fields"];
/** migration list end */

class NativeMigration {

    constructor() {
        var vm = this;
        vm.debug = false;
    }

    fakePromise() {
        var vm = this;
        return {
            all(items) {
                var sql_items = [];
                items.forEach((item) => {
                    sql_items.push(item);
                })
                return sql_items;
            }
        }
    }

    getAllFormFiles(db) {
        var vm = this;
        var items = [];
        migrations.forEach((migration, index) => {
            items.push({
                name: migrations_names[index],
                up: migration.up(db.query, vm.fakePromise()),
                down: migration.down(db.query, vm.fakePromise()),
            });
        });
        return items;
    }

    createTable(db) {
        return db.run(
            db.schema.createTable('migrations', (table) => {
                table.increments();
                table.string('name');
                table.timestamps();
            })
        );
    }

    insert(db, values) {
        return db.run(
            db.query('migrations').insert(values).returning('*')
        );
    }

    getList(db) {
        return db.run(
            db.query.select().table('migrations')
        );
    }

    applyMigration(db, migration) {
        var vm = this;
        var name = migration.name;
        var up = migration.up;
        var down = migration.down;

        return new Promise((resolve, reject) => {
            if (vm.debug)
                console.log('Sub query count in migration:' + name + ' = ' + up.length);
            if (up.length > 0) {
                if (vm.debug)
                    console.log('Apply migration:' + name);
                var out = [];
                for (let i = 0; i < up.length; i++) {
                    out.push(db.run(up[i]));
                }
                Promise.all(out).then((results) => {
                    vm.insert(db, { name: name }).then((values) => {
                        if (vm.debug)
                            console.log('Success! Apply migration:' + name);
                        resolve(values);
                    }).catch((err) => {
                        if (vm.debug)
                            console.log('Fail! Apply migration:' + name);
                        reject(err);
                    })
                }).catch((err) => {
                    reject(err);
                });
            }
            else
                resolve([]);
        });
    }

    applyNewMigrations(db) {
        var vm = this;
        return new Promise((resolve, reject) => {
            vm.getNewMigrations(db).then((newMigrations) => {
                if (vm.debug)
                    console.log('New migration count = ' + newMigrations.length);
                if (newMigrations.length > 0) {
                    if (vm.debug)
                        console.log('Apply all new migrations');
                    var out = [];
                    for (let i = 0; i < newMigrations.length; i++) {
                        out.push(vm.applyMigration(db, newMigrations[i]));
                    }
                    Promise.all(out).then((results) => {
                        if (vm.debug)
                            console.log('Success! Apply all new migrations');
                        resolve(results);
                    }).catch((err) => {
                        if (vm.debug)
                            console.log('Fail! Apply all new migrations');
                        reject(err);
                    });

                }
                else
                    resolve([]);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getNewMigrations(db) {
        var vm = this;
        var fileMigrations = vm.getAllFormFiles(db);
        var newMigrations = [];
        return new Promise((resolve, reject) => {
            vm.getList(db).then((results) => {
                var oldMigrations = [];
                if (results !== undefined) {
                    for (let i = 0; i < results.rows.length; i++) {
                        let row = results.rows.item(i);
                        oldMigrations.push(row.name);
                    }
                }
                for (let i = 0; i < fileMigrations.length; i++) {
                    if (oldMigrations.indexOf(fileMigrations[i].name) === -1) {
                        newMigrations.push(fileMigrations[i]);
                    }
                }
                if (vm.debug) {
                    console.log(['fileMigrations:', fileMigrations]);
                    console.log(['oldMigrations:', oldMigrations]);
                    console.log(['newMigrations:', newMigrations]);
                }
                resolve(newMigrations);
            }).catch((err) => {
                if (vm.debug) {
                    console.log('Try create migrations table');
                }
                vm.createTable(db).then(() => {
                    if (vm.debug) {
                        console.log('Try get new migrations');
                    }
                    vm.getNewMigrations(db).then((items) => {
                        if (vm.debug) {
                            console.log(['newMigrations:', items]);
                            console.log('Success! Try get new migrations');
                        }
                        resolve(items);
                    }, (err) => {
                        if (vm.debug) {
                            console.log('Fail! Try get new migrations');
                        }
                        reject(err);
                    })
                }).catch((err) => {
                    if (vm.debug) {
                        console.log('Fail! Try create migrations table');
                    }
                    reject(err)
                })
            });
        });
    }
}

export default new NativeMigration();