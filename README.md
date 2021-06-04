# weather-app

# Mobile app for POS manager
add to build.gradle
npm install --save react-native-background-fetch
maven {
            url("$rootDir/../node_modules/react-native-background-fetch/android/libs")
        }
npm i --save-dev reactotron-react-native
npm install react-native-geolocation-service
## Features

# Build Android:
- cd ./android
+ Generate APK:
- ./gradlew assembleRelease
+ Generate Release Bundle (file .aab):
- ./gradlew bundleRelease

+ Quick command
- cd ./android && ./gradlew assembleRelease && cd ..
- cd ./android && ./gradlew bundleRelease && cd ..
- react-native run-android --variant=release

+ check task:
./gradlew tasks
# Build iOS:
Dùng XCode

# Reactotron - debug tool
- Tool support working with React Native + Redux
- Connect to Android Studio's Emulators: adb reverse tcp:9090 tcp:9090
- Connect to genyMotion emulator: adb reverse tcp:3334 tcp:3334

# run on specific port:
- react-native start --port=8899
- react-native run-ios --port=8899

# iOS run on specific simulator:
- react-native run-ios --simulator="iPhone 8" --port=8899
- react-native run-ios --simulator="iPhone 8 Plus"
- react-native run-ios --simulator="iPhone 11"
- react-native run-ios --simulator="iPhone 11" --port=8899
- react-native run-ios --simulator="iPhone 11 Pro"
- react-native run-ios --simulator="iPhone 11 Pro Max"
- react-native run-ios --simulator="iPad Pro (9.7-inch)"
- react-native run-ios --simulator="iPad Pro (11-inch)"
- react-native run-ios --simulator="iPad Pro (12.9-inch) (3rd generation)"
- react-native run-ios --simulator="iPad Air (3rd generation)"
