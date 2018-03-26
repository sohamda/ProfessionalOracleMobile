NavbarHybridAirport : Hybrid JET application
keys : Self Signed JKS certificate to build an Android app

To execute on a browser :
cd NavbarHybridAirport
ojet serve android --browser

To build :
cd NavbarHybridAirport
ojet build android --release --build-config=buildConfig.json

To validate Cordova:
cd NavbarHybridAirport/hybrid
cordova platform
cordova requirements

To add/remove platforms:
cd NavbarHybridAirport/hybrid
cordova remove android
cordova platform add android@6.4.0