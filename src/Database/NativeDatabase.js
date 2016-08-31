import React from 'react';

import NativeMigration from './NativeMigration';

var Knex = require('./../../node_modules/knex/build/knex.js');
var SQLite = require('react-native-sqlite-storage');

class NativeDatabase {

    constructor() {
        var vm = this;

        vm.db = null;
        vm.debug = false;
        vm._migrationsIsRunned = false;
        vm.query = Knex({
            useNullAsDefault: true,
            client: 'sqlite3'
        });
        vm.schema = vm.query.schema;
    }


    open() {
        var vm = this;
        return new Promise((resolve, reject) => {
            if (vm.db === null) {
                vm.db = true;
                NativeMigration.debug = vm.debug;
                SQLite.DEBUG(vm.debug);
                SQLite.enablePromise(true);
                vm.db = SQLite.openDatabase("app.db", "1.0", "SQLite App Database", 200000,
                    () => {
                        if (vm.debug)
                            console.log('Success! Open database');
                        resolve(vm.db);
                    }, (err) => {
                        if (vm.debug)
                            console.log('Fail! Open database');
                        reject(err);
                    }
                );
            }
            else
                resolve(vm.db);
        });
    }

    close() {
        var vm = this;
        return new Promise((resolve, reject) => {
            if (vm.db !== null)
                vm.db.close(() => {
                    resolve(true);
                }, (err) => {
                    reject(err);
                }
                );
            else
                resolve(true);
        });
    }

    _applyMigrations(db) {
        var vm = this;
        return new Promise((resolve, reject) => {
            if (vm._migrationsIsRunned == false) {
                vm._migrationsIsRunned = true;
                NativeMigration.applyNewMigrations(vm).then((migrations) => {
                    if (vm.debug)
                        console.log(['Migrations:', migrations]);
                    resolve(migrations);
                }).catch((err) => {
                    reject(err);
                })
            } else {
                resolve([]);
            }
        });
    }

    run(obj) {
        var vm = this;
        return new Promise((resolve, reject) => {
            vm.open().then((db) => {
                vm._applyMigrations(db).then(() => {
                    if (vm.debug)
                        console.log('Success! Run apply migrations');
                    var sqlParams = obj.toSQL();
                    if (vm.debug) {
                        console.log('Run query:' + obj.toString());
                    }
                    db.executeSql(obj.toString()).then(
                        (results) => {
                            if (vm.debug) {
                                console.log('Success! Run query:' + obj.toString());
                                console.log(['Results:', results[0]]);
                            }
                            resolve(results[0]);
                        }).catch((err) => {
                            if (vm.debug)
                                console.log('Fail! Run query:' + obj.toString());
                            reject(err);
                        });
                }).catch((err) => {
                    if (vm.debug)
                        console.log('Fail! Run apply migrations');
                    reject(err);
                })
            }).catch((err) => {
                reject(err);
            })
        });
    }
}

export default new NativeDatabase();