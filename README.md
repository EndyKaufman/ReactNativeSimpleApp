## docs
http://xn----7sbmatugdkfphym2m9a.xn--p1ai/genymotion-ustanovka-prilozhenij.html
http://knexjs.org/

## global
npm install knex react-native rnpm -g

## manual run
VBoxManage list vms
VBoxManage startvm gui <VM id | VM name>
cd android && ./gradlew installRelease && cd ..
cd android && ./gradlew installDebug && cd ..
open chrome console on url http://localhost:8081/debugger-ui
npm start

cd android && ./gradlew installDebug && cd .. && npm start


## default run (emulator must be started)
react-native run-android

## migration
npm run mig add
npm run mig apply
npm run mig rollback

## knex migration
knex init
knex migrate:make migration_name
knex migrate:latest
knex migrate:rollback
knex migrate:latest --env staging
knex migrate:latest --env production