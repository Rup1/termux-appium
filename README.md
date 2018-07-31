# Termux-Appium
Run Appium On Termux Android Directly. Now you don't need PC to run appium script, lets check this magic!

# Usage
## Installation
### Install termux for android on Play Store
    https://play.google.com/store/apps/details?id=com.termux
### From termux on android install Node and NPM
    pkg install nodejs
### Install termux-appium package:
    npm install termux-appium

## start your test:
    // !!!Important Note: you need to turn OFF and ON adb debug on android if you have connected with pc before
    //install wd: npm install wd
    
    const { startServer } = require('termux-appium');
    const DEFAULT_HOST = "localhost";
    const DEFAULT_PORT = 4884;
    (async function main () {
      return await startServer(DEFAULT_PORT, DEFAULT_HOST);
    })();
    
    const wd = require('wd');
    
    var browser = wd.promiseChainRemote({
        host: 'localhost',
        port: 4884
    });

    const defaultCaps = {
        deviceName: 'Termux',
        platformName: 'Android',
        newCommandTimeout: 1800,
        appPackage: 'com.instagram.android',
        appActivity: 'com.instagram.android.activity.MainTabActivity'
    };

    (async function runTest() {
        await browser.init(defaultCaps);
        await browser.sleep(5000);
        await browser.waitForElementById("com.instagram.android:id/log_in_button", 1000).click();
        //continue..
        await browser.quit();

    })()
