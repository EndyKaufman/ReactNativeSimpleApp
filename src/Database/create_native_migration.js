process.chdir(__dirname);

var config = require('./knexfile.js');

var dev = require('knex')(config.development);
var prod = require('knex')(config.production);

var destroy = function () {
    dev.destroy();
    prod.destroy();
}
var update_NativeMigration=function(){
    
}
dev.migrate.latest()
    .then(function () {
        return prod.migrate.latest()
            .then(function (migrations) {
                console.log(migrations);
                return prod.migrate.rollback().then(function (migrations) {
                    console.log(migrations);
                    destroy();
                }).catch(function (error) {
                    console.error(error);
                });
            }).catch(function (error) {
                console.error(error);
                destroy();
            });
    }).catch(function (error) {
        console.error(error);
        destroy();
    });

