(function () {
    'use strict'

    var fs = require('fs');
    var path = require('path');
    process.chdir(path.dirname(__dirname));

    var Knex = require('knex');
    var Promise = require('promise');

    var knexfile = require('./../knexfile.js');
    var dev = Knex(knexfile.development);
    var prod = Knex(knexfile.production);

    var args = JSON.parse(process.env.npm_config_argv).original;

    if (args.indexOf('apply') !== -1)
        update_NativeMigration();

    if (args.indexOf('add') !== -1) {
        var name = 'auto_migration';
        if (args.indexOf('add') < args.length - 1)
            name = args[args.indexOf('add') + 1];
        dev.migrate.make(name);
        setTimeout(function () {
            update_NativeMigration();
        })
    }

    if (args.indexOf('rollback') !== -1) {
        dev.migrate.rollback();
        setTimeout(function () {
            update_NativeMigration();
        })
    }

    function update_NativeMigration_content(migrations, content) {

        const list_start_tag = '/** migration list start */';
        const list_end_tag = '/** migration list end */';

        var list_end = content.split(list_end_tag);

        if (list_end.length === 2) {
            var list_start = list_end[0].split(list_start_tag);

            if (list_start.length === 2) {
                var list_content = list_start[1];
                var new_list_content = [];
                migrations[1].forEach(function (migration) {
                    migration = path.basename(migration, '.js');
                    new_list_content.push(
                        ["import mig_", migration, " from './migrations/", migration, "';"].join('')
                    );
                });
                var migration_list = [];
                var migration_names_list = [];
                migrations[1].forEach(function (migration) {
                    migration = path.basename(migration, '.js');
                    migration_list.push(
                        ["mig_", migration].join('')
                    );
                    migration_names_list.push(
                        ['"', migration, '"'].join('')
                    );
                });
                if (migrations[1].length > 0)
                    new_list_content.push(['var migrations= [', migration_list.join(',\n'), '];'].join(''));
                else
                    new_list_content.push('var migrations= [];');

                if (migrations[1].length > 0)
                    new_list_content.push(['var migrations_names= [', migration_names_list.join(',\n'), '];'].join(''));
                else
                    new_list_content.push('var migrations_names= [];');

                new_list_content = new_list_content.join('\n');

                content = content.replace(
                    [list_start_tag, list_content, list_end_tag].join(''),
                    [list_start_tag, new_list_content, list_end_tag].join('\n')
                );
            } else {
                throw new Error(['Not found text "', list_start_tag, '"'].join(''));
            }
        } else {
            throw new Error(['Not found text "', list_end_tag, '"'].join(''));
        }
        return content;
    }

    function destroy(error) {
        if (error !== undefined)
            console.error(error);
        dev.destroy();
        prod.destroy();
    }

    function update_NativeMigration_file(migrations) {
        return new Promise(function (resolve, reject) {
            fs.readFile('./NativeMigration.js', 'utf8', function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    data = update_NativeMigration_content(migrations, data)
                    fs.writeFile('./NativeMigration.js', data, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve('ok');
                        }
                    });
                }
            });
        });
    }

    function update_NativeMigration() {
        dev.migrate.latest()
            .then(function () {
                return prod.migrate.latest()
                    .then(function (migrations) {
                        return prod.migrate.rollback().then(function (rollback_migrations) {
                            update_NativeMigration_file(migrations).then(function (data) {
                                console.log('ok');
                                destroy();
                            }).catch(function (error) {
                                destroy(error);
                            })
                        }).catch(function (error) {
                            destroy(error);
                        });
                    }).catch(function (error) {
                        destroy(error);
                    });
            }).catch(function (error) {
                destroy(error);
            });
    }
})();