# monitor-launcher
Abalobi Monitor - Ionic app for launching ODK / Telegram / Weather etc

- clone repository into local directory
- in local directory open CLI and run: `npm install`
- RUN CLI: `bower install ngCordova`
- Run CLI : `cordova platform add android`
- Install needed plugins:

    ```
    ionic plugin add https://github.com/Initsogar/cordova-webintent 
    cordova plugin add cordova-plugin-inappbrowser 
    cordova plugin add com.lampa.startapp
    ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git 
    cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git
	
    ```

**To check plugins installed (should list above plugins):**
```
cordova plugins ls
```
**To deploy app to phone or emulator**
```
ionic run android
```
**To deploy to browser**
```
ionic serve
```
