'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _ = require('../..');

var _desired = require('./desired');

var _helpersSession = require('./helpers/session');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var APIDEMOS_PACKAGE = 'io.appium.android.apis';
var APIDEMOS_MAIN_ACTIVITY = '.ApiDemos';
var APIDEMOS_SPLIT_TOUCH_ACTIVITY = '.view.SplitTouchView';

var DEFAULT_ADB_PORT = 5037;

function killServer(adbPort) {
  var adb;
  return _regeneratorRuntime.async(function killServer$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (process.env.TESTOBJECT_E2E_TESTS) {
          context$1$0.next = 9;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB({ adbPort: adbPort }));

      case 3:
        adb = context$1$0.sent;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.killServer());

      case 6:
        if (!process.env.CI) {
          context$1$0.next = 9;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(10000));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

describe('createSession', function () {
  var driver = undefined;
  describe('default adb port', function () {
    afterEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (!driver) {
              context$3$0.next = 3;
              break;
            }

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.quit());

          case 3:
            driver = null;

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should start android session focusing on default pkg and act', function callee$2$0() {
      var appPackage, appActivity;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.APIDEMOS_CAPS));

          case 2:
            driver = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getCurrentPackage());

          case 5:
            appPackage = context$3$0.sent;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.getCurrentDeviceActivity());

          case 8:
            appActivity = context$3$0.sent;

            appPackage.should.equal(APIDEMOS_PACKAGE);
            appActivity.should.equal(APIDEMOS_MAIN_ACTIVITY);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should start android session focusing on custom pkg and act', function callee$2$0() {
      var caps, appPackage, appActivity;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _Object$assign({}, _desired.APIDEMOS_CAPS, {
              appPackage: APIDEMOS_PACKAGE,
              appActivity: APIDEMOS_SPLIT_TOUCH_ACTIVITY
            });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(caps));

          case 3:
            driver = context$3$0.sent;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.getCurrentPackage());

          case 6:
            appPackage = context$3$0.sent;
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.getCurrentDeviceActivity());

          case 9:
            appActivity = context$3$0.sent;

            appPackage.should.equal(caps.appPackage);
            appActivity.should.equal(caps.appActivity);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should error out for not apk extension', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (!process.env.TESTOBJECT_E2E_TESTS) {
              context$3$0.next = 2;
              break;
            }

            return context$3$0.abrupt('return');

          case 2:
            caps = _Object$assign({}, _desired.APIDEMOS_CAPS, {
              app: 'foo',
              appPackage: APIDEMOS_PACKAGE,
              appActivity: APIDEMOS_SPLIT_TOUCH_ACTIVITY
            });
            context$3$0.prev = 3;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(caps));

          case 6:
            throw new Error('Call to \'initDriver\' should not have succeeded');

          case 9:
            context$3$0.prev = 9;
            context$3$0.t0 = context$3$0['catch'](3);

            context$3$0.t0.data.should.match(/does not exist or is not accessible/);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[3, 9]]);
    });
    it('should error out for invalid app path', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (!process.env.TESTOBJECT_E2E_TESTS) {
              context$3$0.next = 2;
              break;
            }

            return context$3$0.abrupt('return');

          case 2:
            caps = _Object$assign({}, _desired.APIDEMOS_CAPS, {
              app: 'foo.apk',
              appPackage: APIDEMOS_PACKAGE,
              appActivity: APIDEMOS_SPLIT_TOUCH_ACTIVITY
            });
            context$3$0.prev = 3;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(caps));

          case 6:
            throw new Error('Call to \'initDriver\' should not have succeeded');

          case 9:
            context$3$0.prev = 9;
            context$3$0.t0 = context$3$0['catch'](3);

            context$3$0.t0.data.should.match(/does not exist or is not accessible/);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[3, 9]]);
    });
    it('should get device model, manufacturer and screen size in session details', function callee$2$0() {
      var caps, serverCaps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _Object$assign({}, _desired.APIDEMOS_CAPS, {
              appPackage: APIDEMOS_PACKAGE,
              appActivity: APIDEMOS_SPLIT_TOUCH_ACTIVITY
            });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(caps));

          case 3:
            driver = context$3$0.sent;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.sessionCapabilities());

          case 6:
            serverCaps = context$3$0.sent;

            serverCaps.deviceScreenSize.should.exist;
            serverCaps.deviceScreenDensity.should.exist;
            serverCaps.deviceModel.should.exist;
            serverCaps.deviceManufacturer.should.exist;
            serverCaps.deviceApiLevel.should.be.greaterThan(0);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('custom adb port', function () {
    // Don't do these tests on TestObject. Cannot use TestObject's ADB.
    if (process.env.TESTOBJECT_E2E_TESTS) {
      return;
    }

    var adbPort = 5042;
    var driver = undefined;

    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(killServer(DEFAULT_ADB_PORT));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    afterEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (!driver) {
              context$3$0.next = 3;
              break;
            }

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.quit());

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(killServer(adbPort));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should start android session with a custom adb port', function callee$2$0() {
      var caps, appPackage, appActivity;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _Object$assign({}, _desired.APIDEMOS_CAPS, {
              adbPort: adbPort
            });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(caps, adbPort));

          case 3:
            driver = context$3$0.sent;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.getCurrentPackage());

          case 6:
            appPackage = context$3$0.sent;
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.getCurrentDeviceActivity());

          case 9:
            appActivity = context$3$0.sent;

            appPackage.should.equal(APIDEMOS_PACKAGE);
            appActivity.should.equal(APIDEMOS_MAIN_ACTIVITY);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('w3c compliance', function () {
    it('should start a session with W3C caps', function callee$2$0() {
      var _ref, value, sessionId, status;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: 'http://' + _.DEFAULT_HOST + ':' + _.DEFAULT_PORT + '/wd/hub/session', json: {
                capabilities: {
                  alwaysMatch: _desired.APIDEMOS_CAPS,
                  firstMatch: [{}]
                }
              } }));

          case 2:
            _ref = context$3$0.sent;
            value = _ref.value;
            sessionId = _ref.sessionId;
            status = _ref.status;

            value.should.exist;
            value.capabilities.should.exist;
            value.sessionId.should.exist;
            should.not.exist(sessionId);
            should.not.exist(status);
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(_requestPromise2['default']['delete']({ url: 'http://' + _.DEFAULT_HOST + ':' + _.DEFAULT_PORT + '/wd/hub/session/' + value.sessionId }));

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

describe('close', function () {
  it('should close application', function callee$1$0() {
    var driver, appPackage;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.APIDEMOS_CAPS));

        case 2:
          driver = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.closeApp());

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.getCurrentPackage());

        case 7:
          appPackage = context$2$0.sent;

          if (appPackage) {
            appPackage.should.not.equal(APIDEMOS_PACKAGE);
          }

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// on Travis this takes a while to get into a good state

// Don't test this on TestObject. The 'app' cap gets stripped out and can't be tested

// Don't test this on TestObject. The 'app' cap gets stripped out and can't be tested
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9kcml2ZXItZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozt5QkFDN0IsWUFBWTs7Ozs4QkFDUixpQkFBaUI7Ozs7Z0JBQ00sT0FBTzs7dUJBQ3BCLFdBQVc7OzhCQUNkLG1CQUFtQjs7d0JBQ2hDLFVBQVU7Ozs7QUFHeEIsSUFBTSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDN0Isa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBTSxnQkFBZ0IsR0FBRyx3QkFBd0IsQ0FBQztBQUNsRCxJQUFNLHNCQUFzQixHQUFHLFdBQVcsQ0FBQztBQUMzQyxJQUFNLDZCQUE2QixHQUFHLHNCQUFzQixDQUFDOztBQUU3RCxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQzs7QUFFOUIsU0FBZSxVQUFVLENBQUUsT0FBTztNQUUxQixHQUFHOzs7O1lBREosT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7Ozs7Ozt5Q0FDbkIsdUJBQUksU0FBUyxDQUFDLEVBQUMsT0FBTyxFQUFQLE9BQU8sRUFBQyxDQUFDOzs7QUFBcEMsV0FBRzs7eUNBQ0QsR0FBRyxDQUFDLFVBQVUsRUFBRTs7O2FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTs7Ozs7O3lDQUVWLHNCQUFFLEtBQUssQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7Q0FHekI7O0FBRUQsUUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZO0FBQ3BDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxVQUFRLENBQUMsa0JBQWtCLEVBQUUsWUFBWTtBQUN2QyxhQUFTLENBQUM7Ozs7aUJBQ0osTUFBTTs7Ozs7OzZDQUNGLE1BQU0sQ0FBQyxJQUFJLEVBQUU7OztBQUVyQixrQkFBTSxHQUFHLElBQUksQ0FBQzs7Ozs7OztLQUNmLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsOERBQThELEVBQUU7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L2Z1bmN0aW9uYWwvZHJpdmVyLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZSc7XG5pbXBvcnQgeyBERUZBVUxUX0hPU1QsIERFRkFVTFRfUE9SVCB9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7IEFQSURFTU9TX0NBUFMgfSBmcm9tICcuL2Rlc2lyZWQnO1xuaW1wb3J0IHsgaW5pdERyaXZlciB9IGZyb20gJy4vaGVscGVycy9zZXNzaW9uJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcblxuXG5jb25zdCBzaG91bGQgPSBjaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCBBUElERU1PU19QQUNLQUdFID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuY29uc3QgQVBJREVNT1NfTUFJTl9BQ1RJVklUWSA9ICcuQXBpRGVtb3MnO1xuY29uc3QgQVBJREVNT1NfU1BMSVRfVE9VQ0hfQUNUSVZJVFkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuXG5jb25zdCBERUZBVUxUX0FEQl9QT1JUID0gNTAzNztcblxuYXN5bmMgZnVuY3Rpb24ga2lsbFNlcnZlciAoYWRiUG9ydCkge1xuICBpZiAoIXByb2Nlc3MuZW52LlRFU1RPQkpFQ1RfRTJFX1RFU1RTKSB7XG4gICAgbGV0IGFkYiA9IGF3YWl0IEFEQi5jcmVhdGVBREIoe2FkYlBvcnR9KTtcbiAgICBhd2FpdCBhZGIua2lsbFNlcnZlcigpO1xuICAgIGlmIChwcm9jZXNzLmVudi5DSSkge1xuICAgICAgLy8gb24gVHJhdmlzIHRoaXMgdGFrZXMgYSB3aGlsZSB0byBnZXQgaW50byBhIGdvb2Qgc3RhdGVcbiAgICAgIGF3YWl0IEIuZGVsYXkoMTAwMDApO1xuICAgIH1cbiAgfVxufVxuXG5kZXNjcmliZSgnY3JlYXRlU2Vzc2lvbicsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgZGVzY3JpYmUoJ2RlZmF1bHQgYWRiIHBvcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgYWZ0ZXJFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkcml2ZXIpIHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICAgIH1cbiAgICAgIGRyaXZlciA9IG51bGw7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHN0YXJ0IGFuZHJvaWQgc2Vzc2lvbiBmb2N1c2luZyBvbiBkZWZhdWx0IHBrZyBhbmQgYWN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihBUElERU1PU19DQVBTKTtcbiAgICAgIGxldCBhcHBQYWNrYWdlID0gYXdhaXQgZHJpdmVyLmdldEN1cnJlbnRQYWNrYWdlKCk7XG4gICAgICBsZXQgYXBwQWN0aXZpdHkgPSBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudERldmljZUFjdGl2aXR5KCk7XG4gICAgICBhcHBQYWNrYWdlLnNob3VsZC5lcXVhbChBUElERU1PU19QQUNLQUdFKTtcbiAgICAgIGFwcEFjdGl2aXR5LnNob3VsZC5lcXVhbChBUElERU1PU19NQUlOX0FDVElWSVRZKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHN0YXJ0IGFuZHJvaWQgc2Vzc2lvbiBmb2N1c2luZyBvbiBjdXN0b20gcGtnIGFuZCBhY3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIEFQSURFTU9TX0NBUFMsIHtcbiAgICAgICAgYXBwUGFja2FnZTogQVBJREVNT1NfUEFDS0FHRSxcbiAgICAgICAgYXBwQWN0aXZpdHk6IEFQSURFTU9TX1NQTElUX1RPVUNIX0FDVElWSVRZLFxuICAgICAgfSk7XG4gICAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKGNhcHMpO1xuICAgICAgbGV0IGFwcFBhY2thZ2UgPSBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudFBhY2thZ2UoKTtcbiAgICAgIGxldCBhcHBBY3Rpdml0eSA9IGF3YWl0IGRyaXZlci5nZXRDdXJyZW50RGV2aWNlQWN0aXZpdHkoKTtcbiAgICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKGNhcHMuYXBwUGFja2FnZSk7XG4gICAgICBhcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoY2Fwcy5hcHBBY3Rpdml0eSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBlcnJvciBvdXQgZm9yIG5vdCBhcGsgZXh0ZW5zaW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gRG9uJ3QgdGVzdCB0aGlzIG9uIFRlc3RPYmplY3QuIFRoZSAnYXBwJyBjYXAgZ2V0cyBzdHJpcHBlZCBvdXQgYW5kIGNhbid0IGJlIHRlc3RlZFxuICAgICAgaWYgKHByb2Nlc3MuZW52LlRFU1RPQkpFQ1RfRTJFX1RFU1RTKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgQVBJREVNT1NfQ0FQUywge1xuICAgICAgICBhcHA6ICdmb28nLFxuICAgICAgICBhcHBQYWNrYWdlOiBBUElERU1PU19QQUNLQUdFLFxuICAgICAgICBhcHBBY3Rpdml0eTogQVBJREVNT1NfU1BMSVRfVE9VQ0hfQUNUSVZJVFksXG4gICAgICB9KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGluaXREcml2ZXIoY2Fwcyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FsbCB0byAnaW5pdERyaXZlcicgc2hvdWxkIG5vdCBoYXZlIHN1Y2NlZWRlZGApO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlLmRhdGEuc2hvdWxkLm1hdGNoKC9kb2VzIG5vdCBleGlzdCBvciBpcyBub3QgYWNjZXNzaWJsZS8pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZXJyb3Igb3V0IGZvciBpbnZhbGlkIGFwcCBwYXRoJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gRG9uJ3QgdGVzdCB0aGlzIG9uIFRlc3RPYmplY3QuIFRoZSAnYXBwJyBjYXAgZ2V0cyBzdHJpcHBlZCBvdXQgYW5kIGNhbid0IGJlIHRlc3RlZFxuICAgICAgaWYgKHByb2Nlc3MuZW52LlRFU1RPQkpFQ1RfRTJFX1RFU1RTKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgQVBJREVNT1NfQ0FQUywge1xuICAgICAgICBhcHA6ICdmb28uYXBrJyxcbiAgICAgICAgYXBwUGFja2FnZTogQVBJREVNT1NfUEFDS0FHRSxcbiAgICAgICAgYXBwQWN0aXZpdHk6IEFQSURFTU9TX1NQTElUX1RPVUNIX0FDVElWSVRZLFxuICAgICAgfSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGluaXREcml2ZXIoY2Fwcyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FsbCB0byAnaW5pdERyaXZlcicgc2hvdWxkIG5vdCBoYXZlIHN1Y2NlZWRlZGApO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlLmRhdGEuc2hvdWxkLm1hdGNoKC9kb2VzIG5vdCBleGlzdCBvciBpcyBub3QgYWNjZXNzaWJsZS8pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2V0IGRldmljZSBtb2RlbCwgbWFudWZhY3R1cmVyIGFuZCBzY3JlZW4gc2l6ZSBpbiBzZXNzaW9uIGRldGFpbHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIEFQSURFTU9TX0NBUFMsIHtcbiAgICAgICAgYXBwUGFja2FnZTogQVBJREVNT1NfUEFDS0FHRSxcbiAgICAgICAgYXBwQWN0aXZpdHk6IEFQSURFTU9TX1NQTElUX1RPVUNIX0FDVElWSVRZLFxuICAgICAgfSk7XG4gICAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKGNhcHMpO1xuXG4gICAgICBsZXQgc2VydmVyQ2FwcyA9IGF3YWl0IGRyaXZlci5zZXNzaW9uQ2FwYWJpbGl0aWVzKCk7XG4gICAgICBzZXJ2ZXJDYXBzLmRldmljZVNjcmVlblNpemUuc2hvdWxkLmV4aXN0O1xuICAgICAgc2VydmVyQ2Fwcy5kZXZpY2VTY3JlZW5EZW5zaXR5LnNob3VsZC5leGlzdDtcbiAgICAgIHNlcnZlckNhcHMuZGV2aWNlTW9kZWwuc2hvdWxkLmV4aXN0O1xuICAgICAgc2VydmVyQ2Fwcy5kZXZpY2VNYW51ZmFjdHVyZXIuc2hvdWxkLmV4aXN0O1xuICAgICAgc2VydmVyQ2Fwcy5kZXZpY2VBcGlMZXZlbC5zaG91bGQuYmUuZ3JlYXRlclRoYW4oMCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdjdXN0b20gYWRiIHBvcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gRG9uJ3QgZG8gdGhlc2UgdGVzdHMgb24gVGVzdE9iamVjdC4gQ2Fubm90IHVzZSBUZXN0T2JqZWN0J3MgQURCLlxuICAgIGlmIChwcm9jZXNzLmVudi5URVNUT0JKRUNUX0UyRV9URVNUUykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhZGJQb3J0ID0gNTA0MjtcbiAgICBsZXQgZHJpdmVyO1xuXG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGtpbGxTZXJ2ZXIoREVGQVVMVF9BREJfUE9SVCk7XG4gICAgfSk7XG4gICAgYWZ0ZXJFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkcml2ZXIpIHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQga2lsbFNlcnZlcihhZGJQb3J0KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc3RhcnQgYW5kcm9pZCBzZXNzaW9uIHdpdGggYSBjdXN0b20gYWRiIHBvcnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIEFQSURFTU9TX0NBUFMsIHtcbiAgICAgICAgYWRiUG9ydCxcbiAgICAgIH0pO1xuICAgICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihjYXBzLCBhZGJQb3J0KTtcbiAgICAgIGxldCBhcHBQYWNrYWdlID0gYXdhaXQgZHJpdmVyLmdldEN1cnJlbnRQYWNrYWdlKCk7XG4gICAgICBsZXQgYXBwQWN0aXZpdHkgPSBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudERldmljZUFjdGl2aXR5KCk7XG4gICAgICBhcHBQYWNrYWdlLnNob3VsZC5lcXVhbChBUElERU1PU19QQUNLQUdFKTtcbiAgICAgIGFwcEFjdGl2aXR5LnNob3VsZC5lcXVhbChBUElERU1PU19NQUlOX0FDVElWSVRZKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3czYyBjb21wbGlhbmNlJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgc3RhcnQgYSBzZXNzaW9uIHdpdGggVzNDIGNhcHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB7IHZhbHVlLCBzZXNzaW9uSWQsIHN0YXR1cyB9ID0gYXdhaXQgcmVxdWVzdC5wb3N0KHt1cmw6IGBodHRwOi8vJHtERUZBVUxUX0hPU1R9OiR7REVGQVVMVF9QT1JUfS93ZC9odWIvc2Vzc2lvbmAsIGpzb246IHtcbiAgICAgICAgY2FwYWJpbGl0aWVzOiB7XG4gICAgICAgICAgYWx3YXlzTWF0Y2g6IEFQSURFTU9TX0NBUFMsXG4gICAgICAgICAgZmlyc3RNYXRjaDogW3t9XSxcbiAgICAgICAgfVxuICAgICAgfX0pO1xuICAgICAgdmFsdWUuc2hvdWxkLmV4aXN0O1xuICAgICAgdmFsdWUuY2FwYWJpbGl0aWVzLnNob3VsZC5leGlzdDtcbiAgICAgIHZhbHVlLnNlc3Npb25JZC5zaG91bGQuZXhpc3Q7XG4gICAgICBzaG91bGQubm90LmV4aXN0KHNlc3Npb25JZCk7XG4gICAgICBzaG91bGQubm90LmV4aXN0KHN0YXR1cyk7XG4gICAgICBhd2FpdCByZXF1ZXN0LmRlbGV0ZSh7dXJsOiBgaHR0cDovLyR7REVGQVVMVF9IT1NUfToke0RFRkFVTFRfUE9SVH0vd2QvaHViL3Nlc3Npb24vJHt2YWx1ZS5zZXNzaW9uSWR9YH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gIGl0KCdzaG91bGQgY2xvc2UgYXBwbGljYXRpb24nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGRyaXZlciA9IGF3YWl0IGluaXREcml2ZXIoQVBJREVNT1NfQ0FQUyk7XG4gICAgYXdhaXQgZHJpdmVyLmNsb3NlQXBwKCk7XG4gICAgbGV0IGFwcFBhY2thZ2UgPSBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudFBhY2thZ2UoKTtcbiAgICBpZiAoYXBwUGFja2FnZSkge1xuICAgICAgYXBwUGFja2FnZS5zaG91bGQubm90LmVxdWFsKEFQSURFTU9TX1BBQ0tBR0UpO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
