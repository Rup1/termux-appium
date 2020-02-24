'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumBaseDriver = require('appium-base-driver');

var _asyncbox = require('asyncbox');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumUiautomator2Server = require('appium-uiautomator2-server');

var _adbkit = require('adbkit');

var _adbkit2 = _interopRequireDefault(_adbkit);

var _utils = require('./utils');

var _appiumSupport = require('appium-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var REQD_PARAMS = ['adb', 'tmpDir', 'host', 'systemPort', 'devicePort', 'disableWindowAnimation'];
var SERVER_LAUNCH_RETRIES = 20;
var SERVER_INSTALL_RETRIES = 20;
var INSTRUMENTATION_TARGET = 'io.appium.uiautomator2.server.test/android.support.test.runner.AndroidJUnitRunner';
var SERVER_PACKAGE_ID = 'io.appium.uiautomator2.server';
var SERVER_TEST_PACKAGE_ID = SERVER_PACKAGE_ID + '.test';

var UiAutomator2Server = (function () {
  function UiAutomator2Server() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, UiAutomator2Server);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(REQD_PARAMS), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var req = _step.value;

        if (!opts || !_appiumSupport.util.hasValue(opts[req])) {
          throw new Error('Option \'' + req + '\' is required!');
        }
        this[req] = opts[req];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.jwproxy = new _appiumBaseDriver.JWProxy({ server: this.host, port: this.systemPort });
    this.proxyReqRes = this.jwproxy.proxyReqRes.bind(this.jwproxy);

    this.client = _adbkit2['default'].createClient({
      port: this.adb.adbPort,
      host: this.host
    });
  }

  /**
   * Installs the apks on to the device or emulator.
   *
   * @param {number} installTimeout - Installation timeout
   */

  _createClass(UiAutomator2Server, [{
    key: 'installServerApk',
    value: function installServerApk() {
      var installTimeout = arguments.length <= 0 || arguments[0] === undefined ? SERVER_INSTALL_RETRIES * 1000 : arguments[0];

      var packagesInfo, shouldUninstallServerPackages, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, appId, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, appPath, retries, output, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, line;

      return _regeneratorRuntime.async(function installServerApk$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            packagesInfo = [{
              appPath: _appiumUiautomator2Server.SERVER_APK_PATH,
              appId: SERVER_PACKAGE_ID
            }, {
              appPath: _appiumUiautomator2Server.TEST_APK_PATH,
              appId: SERVER_TEST_PACKAGE_ID
            }];
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_bluebird2['default'].reduce(packagesInfo, function callee$2$0(accumulator, pkgInfo) {
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    context$3$0.next = 2;
                    return _regeneratorRuntime.awrap(this.checkAndSignCert(pkgInfo.appPath, pkgInfo.appId));

                  case 2:
                    context$3$0.t0 = context$3$0.sent;

                    if (context$3$0.t0) {
                      context$3$0.next = 5;
                      break;
                    }

                    context$3$0.t0 = accumulator;

                  case 5:
                    return context$3$0.abrupt('return', context$3$0.t0);

                  case 6:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this);
            }, false));

          case 3:
            shouldUninstallServerPackages = context$2$0.sent;

            if (!shouldUninstallServerPackages) {
              context$2$0.next = 38;
              break;
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$2$0.prev = 8;
            _iterator2 = _getIterator(packagesInfo);

          case 10:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              context$2$0.next = 24;
              break;
            }

            appId = _step2.value.appId;
            context$2$0.prev = 12;
            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(appId));

          case 15:
            context$2$0.next = 21;
            break;

          case 17:
            context$2$0.prev = 17;
            context$2$0.t0 = context$2$0['catch'](12);

            _logger2['default'].warn('Error uninstalling \'' + appId + '\': ' + context$2$0.t0.message);
            _logger2['default'].debug('Continuing');

          case 21:
            _iteratorNormalCompletion2 = true;
            context$2$0.next = 10;
            break;

          case 24:
            context$2$0.next = 30;
            break;

          case 26:
            context$2$0.prev = 26;
            context$2$0.t1 = context$2$0['catch'](8);
            _didIteratorError2 = true;
            _iteratorError2 = context$2$0.t1;

          case 30:
            context$2$0.prev = 30;
            context$2$0.prev = 31;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 33:
            context$2$0.prev = 33;

            if (!_didIteratorError2) {
              context$2$0.next = 36;
              break;
            }

            throw _iteratorError2;

          case 36:
            return context$2$0.finish(33);

          case 37:
            return context$2$0.finish(30);

          case 38:
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            context$2$0.prev = 41;
            _iterator3 = _getIterator(packagesInfo);

          case 43:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              context$2$0.next = 52;
              break;
            }

            _step3$value = _step3.value;
            appPath = _step3$value.appPath;
            appId = _step3$value.appId;
            context$2$0.next = 49;
            return _regeneratorRuntime.awrap(this.adb.installOrUpgrade(appPath, appId, {
              timeout: installTimeout
            }));

          case 49:
            _iteratorNormalCompletion3 = true;
            context$2$0.next = 43;
            break;

          case 52:
            context$2$0.next = 58;
            break;

          case 54:
            context$2$0.prev = 54;
            context$2$0.t2 = context$2$0['catch'](41);
            _didIteratorError3 = true;
            _iteratorError3 = context$2$0.t2;

          case 58:
            context$2$0.prev = 58;
            context$2$0.prev = 59;

            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }

          case 61:
            context$2$0.prev = 61;

            if (!_didIteratorError3) {
              context$2$0.next = 64;
              break;
            }

            throw _iteratorError3;

          case 64:
            return context$2$0.finish(61);

          case 65:
            return context$2$0.finish(58);

          case 66:
            retries = (0, _utils.getRetries)('Server install', installTimeout, SERVER_INSTALL_RETRIES);

            _logger2['default'].debug('Waiting up to ' + retries * 1000 + 'ms for instrumentation \'' + INSTRUMENTATION_TARGET + '\' to be available');
            output = undefined;
            context$2$0.prev = 69;
            context$2$0.next = 72;
            return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(retries, 1000, function callee$2$0() {
              var err;
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    context$3$0.next = 2;
                    return _regeneratorRuntime.awrap(this.adb.shell(['pm', 'list', 'instrumentation']));

                  case 2:
                    output = context$3$0.sent;

                    if (!(output.indexOf('Could not access the Package Manager') !== -1)) {
                      context$3$0.next = 9;
                      break;
                    }

                    err = new Error('Problem running package manager: ' + output);

                    output = null; // remove output, so it is not printed below
                    throw err;

                  case 9:
                    if (!(output.indexOf(INSTRUMENTATION_TARGET) === -1)) {
                      context$3$0.next = 11;
                      break;
                    }

                    throw new Error('No instrumentation process found. Retrying...');

                  case 11:
                    _logger2['default'].debug('Instrumentation \'' + INSTRUMENTATION_TARGET + '\' available');

                  case 12:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this);
            }));

          case 72:
            context$2$0.next = 98;
            break;

          case 74:
            context$2$0.prev = 74;
            context$2$0.t3 = context$2$0['catch'](69);

            _logger2['default'].error('Unable to find instrumentation target \'' + INSTRUMENTATION_TARGET + '\': ' + context$2$0.t3.message);

            if (!output) {
              context$2$0.next = 98;
              break;
            }

            _logger2['default'].debug('Available targets:');
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            context$2$0.prev = 82;
            for (_iterator4 = _getIterator(output.split('\n')); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              line = _step4.value;

              _logger2['default'].debug('    ' + line.replace('instrumentation:', ''));
            }
            context$2$0.next = 90;
            break;

          case 86:
            context$2$0.prev = 86;
            context$2$0.t4 = context$2$0['catch'](82);
            _didIteratorError4 = true;
            _iteratorError4 = context$2$0.t4;

          case 90:
            context$2$0.prev = 90;
            context$2$0.prev = 91;

            if (!_iteratorNormalCompletion4 && _iterator4['return']) {
              _iterator4['return']();
            }

          case 93:
            context$2$0.prev = 93;

            if (!_didIteratorError4) {
              context$2$0.next = 96;
              break;
            }

            throw _iteratorError4;

          case 96:
            return context$2$0.finish(93);

          case 97:
            return context$2$0.finish(90);

          case 98:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[8, 26, 30, 38], [12, 17], [31,, 33, 37], [41, 54, 58, 66], [59,, 61, 65], [69, 74], [82, 86, 90, 98], [91,, 93, 97]]);
    }
  }, {
    key: 'checkAndSignCert',
    value: function checkAndSignCert(apk, apkPackage) {
      return _regeneratorRuntime.async(function checkAndSignCert$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', false);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startSession',
    value: function startSession(caps) {
      var retries;
      return _regeneratorRuntime.async(function startSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.killUiAutomatorOnDevice());

          case 2:

            _logger2['default'].info('Starting uiautomator2 server ' + _appiumUiautomator2Server.version);

            _logger2['default'].info('Using UIAutomator2 server from \'' + _appiumUiautomator2Server.SERVER_APK_PATH + '\' and test from \'' + _appiumUiautomator2Server.TEST_APK_PATH + '\'');

            // let cmd = ['am', 'instrument', '-w',
            //   'io.appium.uiautomator2.server.test/android.support.test.runner.AndroidJUnitRunner'];
            // this.adb.shell(cmd);
            // using 3rd party module called 'adbKit' for time being as using 'appium-adb'
            // facing IllegalStateException: UiAutomation not connected exception
            // https://github.com/appium/appium-uiautomator2-driver/issues/19

            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(this.startSessionUsingAdbKit(caps.deviceUDID));

          case 6:
            retries = (0, _utils.getRetries)('Server launch', caps.uiautomator2ServerLaunchTimeout, SERVER_LAUNCH_RETRIES);

            _logger2['default'].info('Waiting up to ' + retries * 1000 + 'ms for UiAutomator2 to be online...');
            // wait for UiAutomator2 to be online
            context$2$0.next = 10;
            return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(retries, 1000, this.jwproxy.command.bind(this.jwproxy), '/status', 'GET'));

          case 10:
            context$2$0.next = 12;
            return _regeneratorRuntime.awrap(this.jwproxy.command('/session', 'POST', { desiredCapabilities: caps }));

          case 12:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startSessionUsingAdbKit',
    value: function startSessionUsingAdbKit(deviceUDID) {
      var cmd;
      return _regeneratorRuntime.async(function startSessionUsingAdbKit$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            cmd = 'am instrument -w';

            if (this.disableWindowAnimation) {
              cmd = cmd + ' --no-window-animation';
            }
            cmd = cmd + ' ' + INSTRUMENTATION_TARGET;
            _logger2['default'].info('Running command: \'adb -s ' + deviceUDID + ' shell ' + cmd + '\'');
            this.client.shell(deviceUDID, cmd).then(_adbkit2['default'].util.readAll) // eslint-disable-line promise/prefer-await-to-then
            .then(function (output) {
              // eslint-disable-line promise/prefer-await-to-then
              var _iteratorNormalCompletion5 = true;
              var _didIteratorError5 = false;
              var _iteratorError5 = undefined;

              try {
                for (var _iterator5 = _getIterator(output.toString().split('\n')), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  var line = _step5.value;

                  if (line.length) {
                    _logger2['default'].debug('[UIAutomator2] ' + line);
                  }
                }
              } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                    _iterator5['return']();
                  }
                } finally {
                  if (_didIteratorError5) {
                    throw _iteratorError5;
                  }
                }
              }
            })['catch'](function (err) {
              // eslint-disable-line promise/prefer-await-to-callbacks
              _logger2['default'].error('[UIAutomator2 Error] ' + err.message);
              _logger2['default'].debug('Full error: ' + err.stack);
            });

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'deleteSession',
    value: function deleteSession() {
      return _regeneratorRuntime.async(function deleteSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug('Deleting UiAutomator2 server session');
            // rely on jwproxy's intelligence to know what we're talking about and
            // delete the current session
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.jwproxy.command('/', 'DELETE'));

          case 4:
            context$2$0.next = 9;
            break;

          case 6:
            context$2$0.prev = 6;
            context$2$0.t0 = context$2$0['catch'](1);

            _logger2['default'].warn('Did not get confirmation UiAutomator2 deleteSession worked; ' + ('Error was: ' + context$2$0.t0));

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 6]]);
    }
  }, {
    key: 'killUiAutomatorOnDevice',
    value: function killUiAutomatorOnDevice() {
      return _regeneratorRuntime.async(function killUiAutomatorOnDevice$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.adb.forceStop('io.appium.uiautomator2.server'));

          case 3:
            context$2$0.next = 8;
            break;

          case 5:
            context$2$0.prev = 5;
            context$2$0.t0 = context$2$0['catch'](0);

            _logger2['default'].info("Unable to kill the io.appium.uiautomator2.server process, assuming it is already killed");

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 5]]);
    }
  }]);

  return UiAutomator2Server;
})();

exports['default'] = UiAutomator2Server;
module.exports = exports['default'];

// kill any uiautomator existing processes
//# sourceMappingURL=data:application/json;charset=utf8;base64,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a0I7OztxQkFxSlQsa0JBQWtCIiwiZmlsZSI6ImxpYi91aWF1dG9tYXRvcjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKV1Byb3h5IH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IFNFUlZFUl9BUEtfUEFUSCBhcyBhcGtQYXRoLCBURVNUX0FQS19QQVRIIGFzIHRlc3RBcGtQYXRoLCB2ZXJzaW9uIGFzIHNlcnZlclZlcnNpb24gfSBmcm9tICdhcHBpdW0tdWlhdXRvbWF0b3IyLXNlcnZlcic7XG5pbXBvcnQgYWRia2l0IGZyb20gJ2FkYmtpdCc7XG5pbXBvcnQgeyBnZXRSZXRyaWVzIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuXG5cbmNvbnN0IFJFUURfUEFSQU1TID0gWydhZGInLCAndG1wRGlyJywgJ2hvc3QnLCAnc3lzdGVtUG9ydCcsICdkZXZpY2VQb3J0JywgJ2Rpc2FibGVXaW5kb3dBbmltYXRpb24nXTtcbmNvbnN0IFNFUlZFUl9MQVVOQ0hfUkVUUklFUyA9IDIwO1xuY29uc3QgU0VSVkVSX0lOU1RBTExfUkVUUklFUyA9IDIwO1xuY29uc3QgSU5TVFJVTUVOVEFUSU9OX1RBUkdFVCA9ICdpby5hcHBpdW0udWlhdXRvbWF0b3IyLnNlcnZlci50ZXN0L2FuZHJvaWQuc3VwcG9ydC50ZXN0LnJ1bm5lci5BbmRyb2lkSlVuaXRSdW5uZXInO1xuY29uc3QgU0VSVkVSX1BBQ0tBR0VfSUQgPSAnaW8uYXBwaXVtLnVpYXV0b21hdG9yMi5zZXJ2ZXInO1xuY29uc3QgU0VSVkVSX1RFU1RfUEFDS0FHRV9JRCA9IGAke1NFUlZFUl9QQUNLQUdFX0lEfS50ZXN0YDtcblxuXG5jbGFzcyBVaUF1dG9tYXRvcjJTZXJ2ZXIge1xuICBjb25zdHJ1Y3RvciAob3B0cyA9IHt9KSB7XG4gICAgZm9yIChsZXQgcmVxIG9mIFJFUURfUEFSQU1TKSB7XG4gICAgICBpZiAoIW9wdHMgfHwgIXV0aWwuaGFzVmFsdWUob3B0c1tyZXFdKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE9wdGlvbiAnJHtyZXF9JyBpcyByZXF1aXJlZCFgKTtcbiAgICAgIH1cbiAgICAgIHRoaXNbcmVxXSA9IG9wdHNbcmVxXTtcbiAgICB9XG4gICAgdGhpcy5qd3Byb3h5ID0gbmV3IEpXUHJveHkoe3NlcnZlcjogdGhpcy5ob3N0LCBwb3J0OiB0aGlzLnN5c3RlbVBvcnR9KTtcbiAgICB0aGlzLnByb3h5UmVxUmVzID0gdGhpcy5qd3Byb3h5LnByb3h5UmVxUmVzLmJpbmQodGhpcy5qd3Byb3h5KTtcblxuICAgIHRoaXMuY2xpZW50ID0gYWRia2l0LmNyZWF0ZUNsaWVudCh7XG4gICAgICBwb3J0OiB0aGlzLmFkYi5hZGJQb3J0LFxuICAgICAgaG9zdDogdGhpcy5ob3N0XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5zdGFsbHMgdGhlIGFwa3Mgb24gdG8gdGhlIGRldmljZSBvciBlbXVsYXRvci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluc3RhbGxUaW1lb3V0IC0gSW5zdGFsbGF0aW9uIHRpbWVvdXRcbiAgICovXG4gIGFzeW5jIGluc3RhbGxTZXJ2ZXJBcGsgKGluc3RhbGxUaW1lb3V0ID0gU0VSVkVSX0lOU1RBTExfUkVUUklFUyAqIDEwMDApIHtcbiAgICBjb25zdCBwYWNrYWdlc0luZm8gPSBbXG4gICAgICB7XG4gICAgICAgIGFwcFBhdGg6IGFwa1BhdGgsXG4gICAgICAgIGFwcElkOiBTRVJWRVJfUEFDS0FHRV9JRCxcbiAgICAgIH0sIHtcbiAgICAgICAgYXBwUGF0aDogdGVzdEFwa1BhdGgsXG4gICAgICAgIGFwcElkOiBTRVJWRVJfVEVTVF9QQUNLQUdFX0lELFxuICAgICAgfV07XG4gICAgY29uc3Qgc2hvdWxkVW5pbnN0YWxsU2VydmVyUGFja2FnZXMgPSBhd2FpdCBCLnJlZHVjZShcbiAgICAgIHBhY2thZ2VzSW5mbyxcbiAgICAgIGFzeW5jIChhY2N1bXVsYXRvciwgcGtnSW5mbykgPT4gKGF3YWl0IHRoaXMuY2hlY2tBbmRTaWduQ2VydChwa2dJbmZvLmFwcFBhdGgsIHBrZ0luZm8uYXBwSWQpKSB8fCBhY2N1bXVsYXRvcixcbiAgICAgIGZhbHNlKTtcbiAgICBpZiAoc2hvdWxkVW5pbnN0YWxsU2VydmVyUGFja2FnZXMpIHtcbiAgICAgIGZvciAoY29uc3Qge2FwcElkfSBvZiBwYWNrYWdlc0luZm8pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsoYXBwSWQpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIud2FybihgRXJyb3IgdW5pbnN0YWxsaW5nICcke2FwcElkfSc6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdDb250aW51aW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCB7YXBwUGF0aCwgYXBwSWR9IG9mIHBhY2thZ2VzSW5mbykge1xuICAgICAgYXdhaXQgdGhpcy5hZGIuaW5zdGFsbE9yVXBncmFkZShhcHBQYXRoLCBhcHBJZCwge1xuICAgICAgICB0aW1lb3V0OiBpbnN0YWxsVGltZW91dCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCByZXRyaWVzID0gZ2V0UmV0cmllcygnU2VydmVyIGluc3RhbGwnLCBpbnN0YWxsVGltZW91dCwgU0VSVkVSX0lOU1RBTExfUkVUUklFUyk7XG5cbiAgICBsb2dnZXIuZGVidWcoYFdhaXRpbmcgdXAgdG8gJHtyZXRyaWVzICogMTAwMH1tcyBmb3IgaW5zdHJ1bWVudGF0aW9uICcke0lOU1RSVU1FTlRBVElPTl9UQVJHRVR9JyB0byBiZSBhdmFpbGFibGVgKTtcbiAgICBsZXQgb3V0cHV0O1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCByZXRyeUludGVydmFsKHJldHJpZXMsIDEwMDAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgb3V0cHV0ID0gYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydwbScsICdsaXN0JywgJ2luc3RydW1lbnRhdGlvbiddKTtcbiAgICAgICAgaWYgKG91dHB1dC5pbmRleE9mKCdDb3VsZCBub3QgYWNjZXNzIHRoZSBQYWNrYWdlIE1hbmFnZXInKSAhPT0gLTEpIHtcbiAgICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBQcm9ibGVtIHJ1bm5pbmcgcGFja2FnZSBtYW5hZ2VyOiAke291dHB1dH1gKTtcbiAgICAgICAgICBvdXRwdXQgPSBudWxsOyAvLyByZW1vdmUgb3V0cHV0LCBzbyBpdCBpcyBub3QgcHJpbnRlZCBiZWxvd1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSBlbHNlIGlmIChvdXRwdXQuaW5kZXhPZihJTlNUUlVNRU5UQVRJT05fVEFSR0VUKSA9PT0gLTEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGluc3RydW1lbnRhdGlvbiBwcm9jZXNzIGZvdW5kLiBSZXRyeWluZy4uLicpO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgSW5zdHJ1bWVudGF0aW9uICcke0lOU1RSVU1FTlRBVElPTl9UQVJHRVR9JyBhdmFpbGFibGVgKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLmVycm9yKGBVbmFibGUgdG8gZmluZCBpbnN0cnVtZW50YXRpb24gdGFyZ2V0ICcke0lOU1RSVU1FTlRBVElPTl9UQVJHRVR9JzogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgIGlmIChvdXRwdXQpIHtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdBdmFpbGFibGUgdGFyZ2V0czonKTtcbiAgICAgICAgZm9yIChsZXQgbGluZSBvZiBvdXRwdXQuc3BsaXQoJ1xcbicpKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKGAgICAgJHtsaW5lLnJlcGxhY2UoJ2luc3RydW1lbnRhdGlvbjonLCAnJyl9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBjaGVja0FuZFNpZ25DZXJ0IChhcGssIGFwa1BhY2thZ2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyBzdGFydFNlc3Npb24gKGNhcHMpIHtcbiAgICAvLyBraWxsIGFueSB1aWF1dG9tYXRvciBleGlzdGluZyBwcm9jZXNzZXNcbiAgICBhd2FpdCB0aGlzLmtpbGxVaUF1dG9tYXRvck9uRGV2aWNlKCk7XG5cbiAgICBsb2dnZXIuaW5mbyhgU3RhcnRpbmcgdWlhdXRvbWF0b3IyIHNlcnZlciAke3NlcnZlclZlcnNpb259YCk7XG5cbiAgICBsb2dnZXIuaW5mbyhgVXNpbmcgVUlBdXRvbWF0b3IyIHNlcnZlciBmcm9tICcke2Fwa1BhdGh9JyBhbmQgdGVzdCBmcm9tICcke3Rlc3RBcGtQYXRofSdgKTtcblxuICAgIC8vIGxldCBjbWQgPSBbJ2FtJywgJ2luc3RydW1lbnQnLCAnLXcnLFxuICAgIC8vICAgJ2lvLmFwcGl1bS51aWF1dG9tYXRvcjIuc2VydmVyLnRlc3QvYW5kcm9pZC5zdXBwb3J0LnRlc3QucnVubmVyLkFuZHJvaWRKVW5pdFJ1bm5lciddO1xuICAgIC8vIHRoaXMuYWRiLnNoZWxsKGNtZCk7XG4gICAgLy8gdXNpbmcgM3JkIHBhcnR5IG1vZHVsZSBjYWxsZWQgJ2FkYktpdCcgZm9yIHRpbWUgYmVpbmcgYXMgdXNpbmcgJ2FwcGl1bS1hZGInXG4gICAgLy8gZmFjaW5nIElsbGVnYWxTdGF0ZUV4Y2VwdGlvbjogVWlBdXRvbWF0aW9uIG5vdCBjb25uZWN0ZWQgZXhjZXB0aW9uXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FwcGl1bS9hcHBpdW0tdWlhdXRvbWF0b3IyLWRyaXZlci9pc3N1ZXMvMTlcblxuICAgIGF3YWl0IHRoaXMuc3RhcnRTZXNzaW9uVXNpbmdBZGJLaXQoY2Fwcy5kZXZpY2VVRElEKTtcblxuICAgIGxldCByZXRyaWVzID0gZ2V0UmV0cmllcygnU2VydmVyIGxhdW5jaCcsIGNhcHMudWlhdXRvbWF0b3IyU2VydmVyTGF1bmNoVGltZW91dCwgU0VSVkVSX0xBVU5DSF9SRVRSSUVTKTtcblxuICAgIGxvZ2dlci5pbmZvKGBXYWl0aW5nIHVwIHRvICR7cmV0cmllcyAqIDEwMDB9bXMgZm9yIFVpQXV0b21hdG9yMiB0byBiZSBvbmxpbmUuLi5gKTtcbiAgICAvLyB3YWl0IGZvciBVaUF1dG9tYXRvcjIgdG8gYmUgb25saW5lXG4gICAgYXdhaXQgcmV0cnlJbnRlcnZhbChyZXRyaWVzLCAxMDAwLCB0aGlzLmp3cHJveHkuY29tbWFuZC5iaW5kKHRoaXMuandwcm94eSksICcvc3RhdHVzJywgJ0dFVCcpO1xuICAgIGF3YWl0IHRoaXMuandwcm94eS5jb21tYW5kKCcvc2Vzc2lvbicsICdQT1NUJywge2Rlc2lyZWRDYXBhYmlsaXRpZXM6IGNhcHN9KTtcbiAgfVxuXG4gIGFzeW5jIHN0YXJ0U2Vzc2lvblVzaW5nQWRiS2l0IChkZXZpY2VVRElEKSB7XG4gICAgbGV0IGNtZCA9ICdhbSBpbnN0cnVtZW50IC13JztcbiAgICBpZiAodGhpcy5kaXNhYmxlV2luZG93QW5pbWF0aW9uKSB7XG4gICAgICBjbWQgPSBgJHtjbWR9IC0tbm8td2luZG93LWFuaW1hdGlvbmA7XG4gICAgfVxuICAgIGNtZCA9IGAke2NtZH0gJHtJTlNUUlVNRU5UQVRJT05fVEFSR0VUfWA7XG4gICAgbG9nZ2VyLmluZm8oYFJ1bm5pbmcgY29tbWFuZDogJ2FkYiAtcyAke2RldmljZVVESUR9IHNoZWxsICR7Y21kfSdgKTtcbiAgICB0aGlzLmNsaWVudC5zaGVsbChkZXZpY2VVRElELCBjbWQpXG4gICAgICAudGhlbihhZGJraXQudXRpbC5yZWFkQWxsKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHByb21pc2UvcHJlZmVyLWF3YWl0LXRvLXRoZW5cbiAgICAgIC50aGVuKGZ1bmN0aW9uIChvdXRwdXQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by10aGVuXG4gICAgICAgIGZvciAobGV0IGxpbmUgb2Ygb3V0cHV0LnRvU3RyaW5nKCkuc3BsaXQoJ1xcbicpKSB7XG4gICAgICAgICAgaWYgKGxpbmUubGVuZ3RoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoYFtVSUF1dG9tYXRvcjJdICR7bGluZX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by1jYWxsYmFja3NcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBbVUlBdXRvbWF0b3IyIEVycm9yXSAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICBsb2dnZXIuZGVidWcoYEZ1bGwgZXJyb3I6ICR7ZXJyLnN0YWNrfWApO1xuICAgICAgfSk7XG4gIH1cblxuICBhc3luYyBkZWxldGVTZXNzaW9uICgpIHtcbiAgICBsb2dnZXIuZGVidWcoJ0RlbGV0aW5nIFVpQXV0b21hdG9yMiBzZXJ2ZXIgc2Vzc2lvbicpO1xuICAgIC8vIHJlbHkgb24gandwcm94eSdzIGludGVsbGlnZW5jZSB0byBrbm93IHdoYXQgd2UncmUgdGFsa2luZyBhYm91dCBhbmRcbiAgICAvLyBkZWxldGUgdGhlIGN1cnJlbnQgc2Vzc2lvblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLmp3cHJveHkuY29tbWFuZCgnLycsICdERUxFVEUnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci53YXJuKGBEaWQgbm90IGdldCBjb25maXJtYXRpb24gVWlBdXRvbWF0b3IyIGRlbGV0ZVNlc3Npb24gd29ya2VkOyBgICtcbiAgICAgICAgICBgRXJyb3Igd2FzOiAke2Vycn1gKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBraWxsVWlBdXRvbWF0b3JPbkRldmljZSAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuYWRiLmZvcmNlU3RvcCgnaW8uYXBwaXVtLnVpYXV0b21hdG9yMi5zZXJ2ZXInKTtcbiAgICB9IGNhdGNoIChpZ25vcmUpIHtcbiAgICAgIGxvZ2dlci5pbmZvKFwiVW5hYmxlIHRvIGtpbGwgdGhlIGlvLmFwcGl1bS51aWF1dG9tYXRvcjIuc2VydmVyIHByb2Nlc3MsIGFzc3VtaW5nIGl0IGlzIGFscmVhZHkga2lsbGVkXCIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVaUF1dG9tYXRvcjJTZXJ2ZXI7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
