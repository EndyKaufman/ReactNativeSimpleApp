import React from 'react';

/** migration list start */
var migrations = [];
var migrations_names = [];
/** migration list end */

class NativeMigration {

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
            db.schema.createTableIfNotExists('migrations', (table) => {
                table.increments();
                table.string('name');
                table.timestamps();
            })
        );
    }

    getList(db) {
        return db.run(
            db.query.select().table('migrations')
        );
    }

    getNewMigrations(db) {
        var vm = this;
        var fileMigrations = vm.getAllFormFiles();
        var newMigration = [];
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
                        newMigration.push(fileMigrations[i]);
                    }
                }
                resolve(newMigration);
            }, (err) => {
                if (err.message.indexOf('no such table: migrations') !== -1)
                    vm.createTable(db).then((data) => {
                        vm.getNewMigrations(db).then((newMigration) => {
                            resolve(newMigration);
                        }, (err) => {
                            reject(err)
                        })
                    })
                else
                    reject(err);
            });
        });
    }
}

export default new NativeMigration();