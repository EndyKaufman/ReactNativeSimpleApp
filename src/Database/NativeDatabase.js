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

            SQLite.DEBUG(vm.debug);
            SQLite.enablePromise(true);

            if (vm.db == null)
                vm.db = SQLite.openDatabase("app.db", "1.0", "SQLite App Database", 200000,
                    () => {
                        resolve(vm.db);
                    }, (err) => {
                        reject(err);
                    }
                );
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
                NativeMigration.getNewMigrations(vm).then((migrations) => {
                    console.log(migrations);
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
                if (vm.debug)
                    console.log('Success! Open database');
                vm._applyMigrations(db).then(() => {
                    if (vm.debug)
                        console.log('Success! Run apply migrations');
                    var sqlParams = obj.toSQL();
                    if (vm.debug)
                        console.log('Run query:' + obj.toString());
                    db.executeSql(obj.toString(), [],//sqlParams.sql, sqlParams.bindings,
                        (db, results) => {
                            if (vm.debug)
                                console.log('Success! Run query:' + obj.toString());
                            resolve(results);
                        }, (err) => {
                            if (vm.debug)
                                console.log('Fail! Run query:' + obj.toString());
                            reject(err);
                        });
                }, (err) => {
                    if (vm.debug)
                        console.log('Fail! Run apply migrations');
                    reject(err);
                })
            }).catch((err) => {
                if (vm.debug)
                    console.log('Fail! Open database');
                reject(err);
            })
        });
    }
}

export default new NativeDatabase();