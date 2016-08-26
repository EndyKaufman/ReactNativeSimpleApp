## manual run
VBoxManage list vms
VBoxManage startvm gui <VM id | VM name>
cd android && ./gradlew installRelease && cd ..
cd android && ./gradlew installBuild && cd ..
open chrome console on url http://localhost:8081/debugger-ui
npm start

## default run (emulator must be started)
react-native run-android
