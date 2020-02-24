'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumBaseDriver = require('appium-base-driver');

var _uiautomator2 = require('./uiautomator2');

var _uiautomator22 = _interopRequireDefault(_uiautomator2);

var _appiumSupport = require('appium-support');

var _asyncbox = require('asyncbox');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _commandsIndex = require('./commands/index');

var _commandsIndex2 = _interopRequireDefault(_commandsIndex);

var _appiumAdb = require('appium-adb');

var _helpers = require('./helpers');

var uiautomator2Helpers = _interopRequireWildcard(_helpers);

var _appiumAndroidDriver = require('appium-android-driver');

var _desiredCaps = require('./desired-caps');

var _desiredCaps2 = _interopRequireDefault(_desiredCaps);

var _portscanner = require('portscanner');

var helpers = _Object$assign({}, uiautomator2Helpers, _appiumAndroidDriver.androidHelpers);

// The range of ports we can use on the system for communicating to the
// UiAutomator2 HTTP server on the device
var SYSTEM_PORT_RANGE = [8200, 8299];

// This is the port that UiAutomator2 listens to on the device. We will forward
// one of the ports above on the system to this port on the device.
var DEVICE_PORT = 6790;

// NO_PROXY contains the paths that we never want to proxy to UiAutomator2 server.
// TODO:  Add the list of paths that we never want to proxy to UiAutomator2 server.
// TODO: Need to segregate the paths better way using regular expressions wherever applicable.
// (Not segregating right away because more paths to be added in the NO_PROXY list)
var NO_PROXY = [['GET', new RegExp('^/session/(?!.*\/)')], ['GET', new RegExp('^/session/[^/]+/alert_[^/]+')], ['GET', new RegExp('^/session/[^/]+/alert/[^/]+')], ['GET', new RegExp('^/session/[^/]+/appium/[^/]+/current_activity')], ['GET', new RegExp('^/session/[^/]+/appium/[^/]+/current_package')], ['GET', new RegExp('^/session/[^/]+/appium/app/[^/]+')], ['GET', new RegExp('^/session/[^/]+/appium/device/[^/]+')], ['GET', new RegExp('^/session/[^/]+/appium/settings')], ['GET', new RegExp('^/session/[^/]+/context')], ['GET', new RegExp('^/session/[^/]+/contexts')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/attribute')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/displayed')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/enabled')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/location_in_view')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/name')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/screenshot')], ['GET', new RegExp('^/session/[^/]+/element/[^/]+/selected')], ['GET', new RegExp('^/session/[^/]+/ime/[^/]+')], ['GET', new RegExp('^/session/[^/]+/log/types')], ['GET', new RegExp('^/session/[^/]+/network_connection')], ['GET', new RegExp('^/session/[^/]+/screenshot')], ['GET', new RegExp('^/session/[^/]+/url')], ['POST', new RegExp('^/session/[^/]+/[^/]+_alert$')], ['POST', new RegExp('^/session/[^/]+/actions')], ['POST', new RegExp('^/session/[^/]+/alert/[^/]+')], ['POST', new RegExp('^/session/[^/]+/app/[^/]')], ['POST', new RegExp('^/session/[^/]+/appium/[^/]+/start_activity')], ['POST', new RegExp('^/session/[^/]+/appium/app/[^/]+')], ['POST', new RegExp('^/session/[^/]+/appium/compare_images')], ['POST', new RegExp('^/session/[^/]+/appium/device/(?!set_clipboard|get_clipboard)[^/]+')], ['POST', new RegExp('^/session/[^/]+/appium/element/[^/]+/replace_value')], ['POST', new RegExp('^/session/[^/]+/appium/element/[^/]+/value')], ['POST', new RegExp('^/session/[^/]+/appium/getPerformanceData')], ['POST', new RegExp('^/session/[^/]+/appium/performanceData/types')], ['POST', new RegExp('^/session/[^/]+/appium/settings')], ['POST', new RegExp('^/session/[^/]+/appium/start_recording_screen')], ['POST', new RegExp('^/session/[^/]+/appium/stop_recording_screen')], ['POST', new RegExp('^/session/[^/]+/context')], ['POST', new RegExp('^/session/[^/]+/element')], ['POST', new RegExp('^/session/[^/]+/ime/[^/]+')], ['POST', new RegExp('^/session/[^/]+/keys')], ['POST', new RegExp('^/session/[^/]+/location')], ['POST', new RegExp('^/session/[^/]+/log')], ['POST', new RegExp('^/session/[^/]+/network_connection')], ['POST', new RegExp('^/session/[^/]+/timeouts')], ['POST', new RegExp('^/session/[^/]+/touch/multi/perform')], ['POST', new RegExp('^/session/[^/]+/touch/perform')], ['POST', new RegExp('^/session/[^/]+/url')],

// MJSONWP commands
['POST', new RegExp('^/session/[^/]+/execute')], ['POST', new RegExp('^/session/[^/]+/execute_async')],
// W3C commands
['GET', new RegExp('^/session/[^/]+/window/rect')], ['POST', new RegExp('^/session/[^/]+/execute/async')], ['POST', new RegExp('^/session/[^/]+/execute/sync')]];

// This is a set of methods and paths that we never want to proxy to Chromedriver.
var CHROME_NO_PROXY = [['GET', new RegExp('^/session/[^/]+/appium')], ['GET', new RegExp('^/session/[^/]+/context')], ['GET', new RegExp('^/session/[^/]+/orientation')], ['POST', new RegExp('^/session/[^/]+/appium')], ['POST', new RegExp('^/session/[^/]+/context')], ['POST', new RegExp('^/session/[^/]+/orientation')], ['POST', new RegExp('^/session/[^/]+/touch/multi/perform')], ['POST', new RegExp('^/session/[^/]+/touch/perform')]];
var APP_EXTENSION = '.apk';

var MEMOIZED_FUNCTIONS = ['getWindowSize', 'getStatusBarHeight', 'getDevicePixelRatio'];

var AndroidUiautomator2Driver = (function (_BaseDriver) {
  _inherits(AndroidUiautomator2Driver, _BaseDriver);

  function AndroidUiautomator2Driver() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var shouldValidateCaps = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, AndroidUiautomator2Driver);

    // `shell` overwrites adb.shell, so remove
    delete opts.shell;

    _get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'constructor', this).call(this, opts, shouldValidateCaps);
    this.locatorStrategies = ['xpath', 'id', 'class name', 'accessibility id', '-android uiautomator'];
    this.desiredCapConstraints = _desiredCaps2['default'];
    this.uiautomator2 = null;
    this.jwpProxyActive = false;
    this.defaultIME = null;
    this.jwpProxyAvoid = NO_PROXY;
    this.apkStrings = {}; // map of language -> strings obj

    this.settings = new _appiumBaseDriver.DeviceSettings({ ignoreUnimportantViews: false, allowInvisibleElements: false }, this.onSettingsUpdate.bind(this));
    // handle webview mechanics from AndroidDriver
    this.chromedriver = null;
    this.sessionChromedrivers = {};

    // memoize functions here, so that they are done on a per-instance basis
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(MEMOIZED_FUNCTIONS), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var fn = _step.value;

        this[fn] = _lodash2['default'].memoize(this[fn]);
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
  }

  // first add the android-driver commands which we will fall back to

  _createClass(AndroidUiautomator2Driver, [{
    key: 'validateDesiredCaps',
    value: function validateDesiredCaps(caps) {
      return _get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'validateDesiredCaps', this).call(this, caps) && _appiumAndroidDriver.androidHelpers.validateDesiredCaps(caps);
    }
  }, {
    key: 'createSession',
    value: function createSession() {
      var _len,
          args,
          _key,
          _ref,
          _ref2,
          sessionId,
          caps,
          serverDetails,
          defaultOpts,
          _helpers$getChromePkg,
          pkg,
          activity,
          args$2$0 = arguments;

      return _regeneratorRuntime.async(function createSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;

            for (_len = args$2$0.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = args$2$0[_key];
            }

            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'createSession', this).apply(this, args));

          case 4:
            _ref = context$2$0.sent;
            _ref2 = _slicedToArray(_ref, 2);
            sessionId = _ref2[0];
            caps = _ref2[1];
            serverDetails = { platform: 'LINUX',
              webStorageEnabled: false,
              takesScreenshot: true,
              javascriptEnabled: true,
              databaseEnabled: false,
              networkConnectionEnabled: true,
              locationContextEnabled: false,
              warnings: {},
              desired: this.caps };

            this.caps = _Object$assign(serverDetails, this.caps);

            this.curContext = this.defaultContextName();

            defaultOpts = {
              fullReset: false,
              autoLaunch: true,
              adbPort: _appiumAdb.DEFAULT_ADB_PORT,
              androidInstallTimeout: 90000
            };

            _lodash2['default'].defaults(this.opts, defaultOpts);

            if (this.isChromeSession) {
              _logger2['default'].info("We're going to run a Chrome-based session");
              _helpers$getChromePkg = helpers.getChromePkg(this.opts.browserName);
              pkg = _helpers$getChromePkg.pkg;
              activity = _helpers$getChromePkg.activity;

              this.opts.appPackage = this.caps.appPackage = pkg;
              this.opts.appActivity = this.caps.appActivity = activity;
              _logger2['default'].info('Chrome-type package and activity are ' + pkg + ' and ' + activity);
            }

            if (this.opts.reboot) {
              this.setAvdFromCapabilities(caps);
            }

            if (!this.opts.app) {
              context$2$0.next = 23;
              break;
            }

            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(this.helpers.configureApp(this.opts.app, APP_EXTENSION));

          case 18:
            this.opts.app = context$2$0.sent;
            context$2$0.next = 21;
            return _regeneratorRuntime.awrap(this.checkAppPresent());

          case 21:
            context$2$0.next = 27;
            break;

          case 23:
            if (!this.appOnDevice) {
              context$2$0.next = 27;
              break;
            }

            // the app isn't an actual app file but rather something we want to
            // assume is on the device and just launch via the appPackage
            _logger2['default'].info('App file was not listed, instead we\'re going to run ' + (this.opts.appPackage + ' directly on the device'));
            context$2$0.next = 27;
            return _regeneratorRuntime.awrap(this.checkPackagePresent());

          case 27:
            context$2$0.t0 = this.opts.systemPort;

            if (context$2$0.t0) {
              context$2$0.next = 32;
              break;
            }

            context$2$0.next = 31;
            return _regeneratorRuntime.awrap((0, _portscanner.findAPortNotInUse)(SYSTEM_PORT_RANGE[0], SYSTEM_PORT_RANGE[1]));

          case 31:
            context$2$0.t0 = context$2$0.sent;

          case 32:
            this.opts.systemPort = context$2$0.t0;

            this.opts.adbPort = this.opts.adbPort || _appiumAdb.DEFAULT_ADB_PORT;

            context$2$0.next = 36;
            return _regeneratorRuntime.awrap(this.startUiAutomator2Session());

          case 36:
            context$2$0.next = 38;
            return _regeneratorRuntime.awrap(this.fillDeviceDetails());

          case 38:
            if (!this.opts.mjpegScreenshotUrl) {
              context$2$0.next = 43;
              break;
            }

            _logger2['default'].info('Starting MJPEG stream reading URL: \'' + this.opts.mjpegScreenshotUrl + '\'');
            this.mjpegStream = new _appiumSupport.mjpeg.MJpegStream(this.opts.mjpegScreenshotUrl);
            context$2$0.next = 43;
            return _regeneratorRuntime.awrap(this.mjpegStream.start());

          case 43:
            return context$2$0.abrupt('return', [sessionId, this.caps]);

          case 46:
            context$2$0.prev = 46;
            context$2$0.t1 = context$2$0['catch'](0);
            context$2$0.next = 50;
            return _regeneratorRuntime.awrap(this.deleteSession());

          case 50:
            throw context$2$0.t1;

          case 51:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 46]]);
    }
  }, {
    key: 'fillDeviceDetails',
    value: function fillDeviceDetails() {
      return _regeneratorRuntime.async(function fillDeviceDetails$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.getDevicePixelRatio());

          case 2:
            this.caps.pixelRatio = context$2$0.sent;
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(this.getStatusBarHeight());

          case 5:
            this.caps.statBarHeight = context$2$0.sent;
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(this.getViewPortRect());

          case 8:
            this.caps.viewportRect = context$2$0.sent;

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getSession',
    value: function getSession() {
      var sessionData, uia2Data;
      return _regeneratorRuntime.async(function getSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'getSession', this).call(this));

          case 2:
            sessionData = context$2$0.sent;

            _logger2['default'].debug("Getting session details from server to mix in");
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/', 'GET', {}));

          case 6:
            uia2Data = context$2$0.sent;
            return context$2$0.abrupt('return', _Object$assign({}, sessionData, uia2Data));

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'isEmulator',
    value: function isEmulator() {
      return !!(this.opts.avd || /emulator/.test(this.opts.udid));
    }
  }, {
    key: 'setAvdFromCapabilities',
    value: function setAvdFromCapabilities(caps) {
      if (this.opts.avd) {
        _logger2['default'].info('avd name defined, ignoring device name and platform version');
      } else {
        if (!caps.deviceName) {
          _logger2['default'].errorAndThrow('avd or deviceName should be specified when reboot option is enables');
        }
        if (!caps.platformVersion) {
          _logger2['default'].errorAndThrow('avd or platformVersion should be specified when reboot option is enabled');
        }
        var avdDevice = caps.deviceName.replace(/[^a-zA-Z0-9_.]/g, "-");
        this.opts.avd = avdDevice + '__' + caps.platformVersion;
      }
    }
  }, {
    key: 'startUiAutomator2Session',
    value: function startUiAutomator2Session() {
      var _ref3,

      // get device udid for this session
      udid, emPort, appInfo, pids, isRoot, viewName, timeout;

      return _regeneratorRuntime.async(function startUiAutomator2Session$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!this.opts.javaVersion) {
              this.opts.javaVersion = '1.8.0_131';
            }context$2$0.next = 3;
            return _regeneratorRuntime.awrap(helpers.getDeviceInfoFromCaps(this.opts));

          case 3:
            _ref3 = context$2$0.sent;
            udid = _ref3.udid;
            emPort = _ref3.emPort;

            this.opts.udid = udid;
            this.opts.emPort = emPort;

            // now that we know our java version and device info, we can create our
            // ADB instance
            context$2$0.next = 10;
            return _regeneratorRuntime.awrap(_appiumAndroidDriver.androidHelpers.createADB(this.opts));

          case 10:
            this.adb = context$2$0.sent;
            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(this.adb.getApiLevel());

          case 13:
            context$2$0.t0 = context$2$0.sent;

            if (!(context$2$0.t0 < 21)) {
              context$2$0.next = 16;
              break;
            }

            _logger2['default'].errorAndThrow('UIAutomation2 is only supported since Android 5.0 (Lollipop). ' + 'You could still use other supported backends in order to automate older Android versions.');

          case 16:
            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(helpers.getLaunchInfo(this.adb, this.opts));

          case 18:
            appInfo = context$2$0.sent;

            // and get it onto our 'opts' object so we use it from now on
            _Object$assign(this.opts, appInfo);

            // set actual device name, udid, platform version, screen size, screen density, model and manufacturer details
            this.caps.deviceName = this.adb.curDeviceId;
            this.caps.deviceUDID = this.opts.udid;
            context$2$0.next = 24;
            return _regeneratorRuntime.awrap(this.adb.getPlatformVersion());

          case 24:
            this.caps.platformVersion = context$2$0.sent;
            context$2$0.next = 27;
            return _regeneratorRuntime.awrap(this.adb.getScreenSize());

          case 27:
            this.caps.deviceScreenSize = context$2$0.sent;
            context$2$0.next = 30;
            return _regeneratorRuntime.awrap(this.adb.getScreenDensity());

          case 30:
            this.caps.deviceScreenDensity = context$2$0.sent;
            context$2$0.next = 33;
            return _regeneratorRuntime.awrap(this.adb.getModel());

          case 33:
            this.caps.deviceModel = context$2$0.sent;
            context$2$0.next = 36;
            return _regeneratorRuntime.awrap(this.adb.getManufacturer());

          case 36:
            this.caps.deviceManufacturer = context$2$0.sent;
            context$2$0.next = 39;
            return _regeneratorRuntime.awrap(this.adb.getApiLevel());

          case 39:
            this.caps.deviceApiLevel = context$2$0.sent;
            context$2$0.next = 42;
            return _regeneratorRuntime.awrap(this.initUiAutomator2Server());

          case 42:
            context$2$0.next = 44;
            return _regeneratorRuntime.awrap(helpers.initDevice(this.adb, this.opts));

          case 44:
            this.defaultIME = context$2$0.sent;

            // Further prepare the device by forwarding the UiAutomator2 port
            _logger2['default'].debug('Forwarding UiAutomator2 Server port ' + DEVICE_PORT + ' to ' + this.opts.systemPort);
            context$2$0.next = 48;
            return _regeneratorRuntime.awrap(this.adb.forwardPort(this.opts.systemPort, DEVICE_PORT));

          case 48:
            if (!this.opts.autoLaunch) {
              context$2$0.next = 51;
              break;
            }

            context$2$0.next = 51;
            return _regeneratorRuntime.awrap(this.initAUT());

          case 51:
            // Adding AUT package name in the capabilities if package name not exist in caps
            if (!this.caps.appPackage && appInfo) {
              this.caps.appPackage = appInfo.appPackage;
            }

            context$2$0.prev = 52;
            context$2$0.next = 55;
            return _regeneratorRuntime.awrap(this.adb.getPIDsByName('uiautomator'));

          case 55:
            context$2$0.t1 = function (p) {
              return '' + p;
            };

            pids = context$2$0.sent.map(context$2$0.t1);

            if (_lodash2['default'].isEmpty(pids)) {
              context$2$0.next = 69;
              break;
            }

            context$2$0.next = 60;
            return _regeneratorRuntime.awrap(this.adb.root());

          case 60:
            isRoot = context$2$0.sent;
            context$2$0.prev = 61;
            context$2$0.next = 64;
            return _regeneratorRuntime.awrap(this.adb.shell(['kill', '-9'].concat(_toConsumableArray(pids))));

          case 64:
            context$2$0.prev = 64;

            if (!isRoot) {
              context$2$0.next = 68;
              break;
            }

            context$2$0.next = 68;
            return _regeneratorRuntime.awrap(this.adb.unroot());

          case 68:
            return context$2$0.finish(64);

          case 69:
            context$2$0.next = 74;
            break;

          case 71:
            context$2$0.prev = 71;
            context$2$0.t2 = context$2$0['catch'](52);

            _logger2['default'].warn('Unable to stop uiautomator process: ' + context$2$0.t2.message);

          case 74:
            context$2$0.next = 76;
            return _regeneratorRuntime.awrap(this.uiautomator2.startSession(this.caps));

          case 76:
            if (this.opts.skipUnlock) {
              context$2$0.next = 81;
              break;
            }

            context$2$0.next = 79;
            return _regeneratorRuntime.awrap(helpers.unlock(this, this.adb, this.caps));

          case 79:
            context$2$0.next = 82;
            break;

          case 81:
            _logger2['default'].debug('\'skipUnlock\' capability set, so skipping device unlock');

          case 82:
            if (!this.opts.autoLaunch) {
              context$2$0.next = 85;
              break;
            }

            context$2$0.next = 85;
            return _regeneratorRuntime.awrap(this.ensureAppStarts());

          case 85:
            if (!_appiumSupport.util.hasValue(this.opts.orientation)) {
              context$2$0.next = 89;
              break;
            }

            _logger2['default'].debug('Setting initial orientation to \'' + this.opts.orientation + '\'');
            context$2$0.next = 89;
            return _regeneratorRuntime.awrap(this.setOrientation(this.opts.orientation));

          case 89:
            if (!this.opts.autoWebview) {
              context$2$0.next = 95;
              break;
            }

            viewName = this.defaultWebviewName();
            timeout = this.opts.autoWebviewTimeout || 2000;

            _logger2['default'].info('Setting auto webview to context \'' + viewName + '\' with timeout ' + timeout + 'ms');
            context$2$0.next = 95;
            return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(timeout / 500, 500, this.setContext.bind(this), viewName));

          case 95:
            if (!this.isChromeSession) {
              context$2$0.next = 98;
              break;
            }

            context$2$0.next = 98;
            return _regeneratorRuntime.awrap(this.startChromeSession(this));

          case 98:

            // now that everything has started successfully, turn on proxying so all
            // subsequent session requests go straight to/from uiautomator2
            this.jwpProxyActive = true;

          case 99:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[52, 71], [61,, 64, 69]]);
    }
  }, {
    key: 'initUiAutomator2Server',
    value: function initUiAutomator2Server() {
      return _regeneratorRuntime.async(function initUiAutomator2Server$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            // now that we have package and activity, we can create an instance of
            // uiautomator2 with the appropriate data
            this.uiautomator2 = new _uiautomator22['default']({
              host: this.opts.remoteAdbHost || this.opts.host || 'localhost',
              systemPort: this.opts.systemPort,
              devicePort: DEVICE_PORT,
              adb: this.adb,
              apk: this.opts.app,
              tmpDir: this.opts.tmpDir,
              appPackage: this.opts.appPackage,
              appActivity: this.opts.appActivity,
              disableWindowAnimation: !!this.opts.disableWindowAnimation
            });
            this.proxyReqRes = this.uiautomator2.proxyReqRes.bind(this.uiautomator2);

            // killing any uiautomator existing processes
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.uiautomator2.killUiAutomatorOnDevice());

          case 4:
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(this.uiautomator2.installServerApk(this.opts.uiautomator2ServerInstallTimeout));

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'initAUT',
    value: function initAUT() {
      var otherApps, signed;
      return _regeneratorRuntime.async(function initAUT$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_appiumAndroidDriver.androidHelpers.pushStrings(this.opts.language, this.adb, this.opts));

          case 2:
            this.apkStrings[this.opts.language] = context$2$0.sent;

            if (!this.opts.otherApps) {
              context$2$0.next = 11;
              break;
            }

            otherApps = undefined;

            try {
              otherApps = helpers.parseArray(this.opts.otherApps);
            } catch (e) {
              _logger2['default'].errorAndThrow('Could not parse "otherApps" capability: ' + e.message);
            }
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(_bluebird2['default'].all(otherApps.map(function (app) {
              return _this.helpers.configureApp(app, APP_EXTENSION);
            })));

          case 8:
            otherApps = context$2$0.sent;
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(helpers.installOtherApks(otherApps, this.adb, this.opts));

          case 11:
            if (this.opts.app) {
              context$2$0.next = 17;
              break;
            }

            if (this.opts.fullReset) {
              _logger2['default'].errorAndThrow('Full reset requires an app capability, use fastReset if app is not provided');
            }
            _logger2['default'].debug('No app capability. Assuming it is already on the device');

            if (!this.opts.fastReset) {
              context$2$0.next = 17;
              break;
            }

            context$2$0.next = 17;
            return _regeneratorRuntime.awrap(helpers.resetApp(this.adb, this.opts));

          case 17:
            if (this.opts.skipUninstall) {
              context$2$0.next = 20;
              break;
            }

            context$2$0.next = 20;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 20:
            if (this.opts.noSign) {
              context$2$0.next = 27;
              break;
            }

            context$2$0.next = 23;
            return _regeneratorRuntime.awrap(this.adb.checkApkCert(this.opts.app, this.opts.appPackage));

          case 23:
            signed = context$2$0.sent;

            if (!(!signed && this.opts.app)) {
              context$2$0.next = 27;
              break;
            }

            context$2$0.next = 27;
            return _regeneratorRuntime.awrap(this.adb.sign(this.opts.app, this.opts.appPackage));

          case 27:
            if (!this.opts.app) {
              context$2$0.next = 30;
              break;
            }

            context$2$0.next = 30;
            return _regeneratorRuntime.awrap(helpers.installApk(this.adb, this.opts));

          case 30:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'ensureAppStarts',
    value: function ensureAppStarts() {
      var appWaitPackage, appWaitActivity;
      return _regeneratorRuntime.async(function ensureAppStarts$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            appWaitPackage = this.opts.appWaitPackage || this.opts.appPackage;
            appWaitActivity = this.opts.appWaitActivity || this.opts.appActivity;

            _logger2['default'].info('UiAutomator2 did not start the activity we were waiting for, ' + ('\'' + appWaitPackage + '/' + appWaitActivity + '\'. Starting it ourselves'));

            if (!this.caps.androidCoverage) {
              context$2$0.next = 9;
              break;
            }

            _logger2['default'].info('androidCoverage is configured. ' + (' Starting instrumentation of \'' + this.caps.androidCoverage + '\'...'));
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(this.adb.androidCoverage(this.caps.androidCoverage, appWaitPackage, appWaitActivity));

          case 7:
            context$2$0.next = 11;
            break;

          case 9:
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(this.adb.startApp({
              pkg: this.opts.appPackage,
              activity: this.opts.appActivity,
              action: this.opts.intentAction,
              category: this.opts.intentCategory,
              flags: this.opts.intentFlags,
              waitPkg: this.opts.appWaitPackage,
              waitActivity: this.opts.appWaitActivity,
              optionalIntentArguments: this.opts.optionalIntentArguments,
              stopApp: !this.opts.dontStopAppOnReset,
              retry: true
            }));

          case 11:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'deleteSession',
    value: function deleteSession() {
      var avdName;
      return _regeneratorRuntime.async(function deleteSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug('Deleting UiAutomator2 session');
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_appiumAndroidDriver.androidHelpers.removeAllSessionWebSocketHandlers(this.server, this.sessionId));

          case 3:
            if (!this.uiautomator2) {
              context$2$0.next = 22;
              break;
            }

            context$2$0.prev = 4;
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(this.stopChromedriverProxies());

          case 7:
            context$2$0.next = 12;
            break;

          case 9:
            context$2$0.prev = 9;
            context$2$0.t0 = context$2$0['catch'](4);

            _logger2['default'].warn('Unable to stop ChromeDriver proxies: ' + context$2$0.t0.message);

          case 12:
            if (!this.jwpProxyActive) {
              context$2$0.next = 21;
              break;
            }

            context$2$0.prev = 13;
            context$2$0.next = 16;
            return _regeneratorRuntime.awrap(this.uiautomator2.deleteSession());

          case 16:
            context$2$0.next = 21;
            break;

          case 18:
            context$2$0.prev = 18;
            context$2$0.t1 = context$2$0['catch'](13);

            _logger2['default'].warn('Unable to proxy deleteSession to UiAutomator2: ' + context$2$0.t1.message);

          case 21:
            this.uiautomator2 = null;

          case 22:
            this.jwpProxyActive = false;

            if (!this.adb) {
              context$2$0.next = 86;
              break;
            }

            if (!(this.opts.unicodeKeyboard && this.opts.resetKeyboard && this.defaultIME)) {
              context$2$0.next = 34;
              break;
            }

            _logger2['default'].debug('Resetting IME to \'' + this.defaultIME + '\'');
            context$2$0.prev = 26;
            context$2$0.next = 29;
            return _regeneratorRuntime.awrap(this.adb.setIME(this.defaultIME));

          case 29:
            context$2$0.next = 34;
            break;

          case 31:
            context$2$0.prev = 31;
            context$2$0.t2 = context$2$0['catch'](26);

            _logger2['default'].warn('Unable to reset IME: ' + context$2$0.t2.message);

          case 34:
            if (!this.caps.androidCoverage) {
              context$2$0.next = 45;
              break;
            }

            _logger2['default'].info('Shutting down the adb process of instrumentation...');
            context$2$0.next = 38;
            return _regeneratorRuntime.awrap(this.adb.endAndroidCoverage());

          case 38:
            if (!this.caps.androidCoverageEndIntent) {
              context$2$0.next = 44;
              break;
            }

            _logger2['default'].info('Sending intent broadcast \'' + this.caps.androidCoverageEndIntent + '\' at the end of instrumenting.');
            context$2$0.next = 42;
            return _regeneratorRuntime.awrap(this.adb.broadcast(this.caps.androidCoverageEndIntent));

          case 42:
            context$2$0.next = 45;
            break;

          case 44:
            _logger2['default'].warn('No androidCoverageEndIntent is configured in caps. Possibly you cannot get coverage file.');

          case 45:
            if (!this.opts.appPackage) {
              context$2$0.next = 54;
              break;
            }

            context$2$0.prev = 46;
            context$2$0.next = 49;
            return _regeneratorRuntime.awrap(this.adb.forceStop(this.opts.appPackage));

          case 49:
            context$2$0.next = 54;
            break;

          case 51:
            context$2$0.prev = 51;
            context$2$0.t3 = context$2$0['catch'](46);

            _logger2['default'].warn('Unable to force stop app: ' + context$2$0.t3.message);

          case 54:
            if (!(this.opts.fullReset && !this.opts.skipUninstall && !this.appOnDevice)) {
              context$2$0.next = 64;
              break;
            }

            _logger2['default'].debug('Capability \'fullReset\' set to \'true\', Uninstalling \'' + this.opts.appPackage + '\'');
            context$2$0.prev = 56;
            context$2$0.next = 59;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 59:
            context$2$0.next = 64;
            break;

          case 61:
            context$2$0.prev = 61;
            context$2$0.t4 = context$2$0['catch'](56);

            _logger2['default'].warn('Unable to uninstall app: ' + context$2$0.t4.message);

          case 64:
            context$2$0.next = 66;
            return _regeneratorRuntime.awrap(this.adb.stopLogcat());

          case 66:
            if (!_appiumSupport.util.hasValue(this.opts.systemPort)) {
              context$2$0.next = 75;
              break;
            }

            context$2$0.prev = 67;
            context$2$0.next = 70;
            return _regeneratorRuntime.awrap(this.adb.removePortForward(this.opts.systemPort));

          case 70:
            context$2$0.next = 75;
            break;

          case 72:
            context$2$0.prev = 72;
            context$2$0.t5 = context$2$0['catch'](67);

            _logger2['default'].warn('Unable to remove port forward \'' + context$2$0.t5.message + '\'');
            // Ignore, this block will also be called when we fall in catch block
            // and before even port forward.

          case 75:
            if (!this.opts.reboot) {
              context$2$0.next = 86;
              break;
            }

            avdName = this.opts.avd.replace('@', '');

            _logger2['default'].debug('Closing emulator \'' + avdName + '\'');
            context$2$0.prev = 78;
            context$2$0.next = 81;
            return _regeneratorRuntime.awrap(this.adb.killEmulator(avdName));

          case 81:
            context$2$0.next = 86;
            break;

          case 83:
            context$2$0.prev = 83;
            context$2$0.t6 = context$2$0['catch'](78);

            _logger2['default'].warn('Unable to close emulator: ' + context$2$0.t6.message);

          case 86:
            if (this.mjpegStream) {
              _logger2['default'].info('Closing MJPEG stream');
              this.mjpegStream.stop();
            }
            context$2$0.next = 89;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'deleteSession', this).call(this));

          case 89:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[4, 9], [13, 18], [26, 31], [46, 51], [56, 61], [67, 72], [78, 83]]);
    }
  }, {
    key: 'checkAppPresent',
    value: function checkAppPresent() {
      return _regeneratorRuntime.async(function checkAppPresent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug('Checking whether app is actually present');
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(this.opts.app));

          case 3:
            if (context$2$0.sent) {
              context$2$0.next = 5;
              break;
            }

            _logger2['default'].errorAndThrow('Could not find app apk at \'' + this.opts.app + '\'');

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'onSettingsUpdate',
    value: function onSettingsUpdate(key, value) {
      var settings;
      return _regeneratorRuntime.async(function onSettingsUpdate$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            settings = _defineProperty({}, key, value);
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/settings', 'POST', { settings: settings }));

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }

    // Need to override android-driver's version of this since we don't actually
    // have a bootstrap; instead we just restart adb and re-forward the UiAutomator2
    // port
  }, {
    key: 'wrapBootstrapDisconnect',
    value: function wrapBootstrapDisconnect(wrapped) {
      return _regeneratorRuntime.async(function wrapBootstrapDisconnect$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(wrapped());

          case 2:
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(this.adb.restart());

          case 4:
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(this.adb.forwardPort(this.opts.systemPort, DEVICE_PORT));

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'proxyActive',
    value: function proxyActive(sessionId) {
      _get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'proxyActive', this).call(this, sessionId);

      // we always have an active proxy to the UiAutomator2 server
      return true;
    }
  }, {
    key: 'canProxy',
    value: function canProxy(sessionId) {
      _get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'canProxy', this).call(this, sessionId);

      // we can always proxy to the uiautomator2 server
      return true;
    }
  }, {
    key: 'getProxyAvoidList',
    value: function getProxyAvoidList(sessionId) {
      _get(Object.getPrototypeOf(AndroidUiautomator2Driver.prototype), 'getProxyAvoidList', this).call(this, sessionId);
      // we are maintaining two sets of NO_PROXY lists, one for chromedriver(CHROME_NO_PROXY)
      // and one for uiautomator2(NO_PROXY), based on current context will return related NO_PROXY list
      if (_appiumSupport.util.hasValue(this.chromedriver)) {
        // if the current context is webview(chromedriver), then return CHROME_NO_PROXY list
        this.jwpProxyAvoid = CHROME_NO_PROXY;
      } else {
        this.jwpProxyAvoid = NO_PROXY;
      }
      if (this.opts.nativeWebScreenshot) {
        this.jwpProxyAvoid = [].concat(_toConsumableArray(this.jwpProxyAvoid), [['GET', new RegExp('^/session/[^/]+/screenshot')]]);
      }

      return this.jwpProxyAvoid;
    }
  }, {
    key: 'driverData',
    get: function get() {
      // TODO fill out resource info here
      return {};
    }
  }, {
    key: 'isChromeSession',
    get: function get() {
      return helpers.isChromeBrowser(this.opts.browserName);
    }
  }]);

  return AndroidUiautomator2Driver;
})(_appiumBaseDriver.BaseDriver);

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = _getIterator(_lodash2['default'].toPairs(_appiumAndroidDriver.androidCommands)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _step2$value = _slicedToArray(_step2.value, 2);

    var cmd = _step2$value[0];
    var fn = _step2$value[1];

    AndroidUiautomator2Driver.prototype[cmd] = fn;
  }

  // then overwrite with any uiautomator2-specific commands
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
      _iterator2['return']();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = _getIterator(_lodash2['default'].toPairs(_commandsIndex2['default'])), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var _step3$value = _slicedToArray(_step3.value, 2);

    var cmd = _step3$value[0];
    var fn = _step3$value[1];

    AndroidUiautomator2Driver.prototype[cmd] = fn;
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
      _iterator3['return']();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

exports['default'] = AndroidUiautomator2Driver;
module.exports = exports['default'];

// TODO handle otherSessionData for multiple sessions

// find and copy, or download and unzip an app url or path

// get appPackage et al from manifest if necessary

// set up the modified UiAutomator2 server etc

// start an avd, set the language/locale, pick an emulator, etc...
// TODO with multiple devices we'll need to parameterize this

// If the user sets autoLaunch to false, they are responsible for initAUT() and startAUT()

// set up app under test
// prepare our actual AUT, get it on the device, etc...

// launch UiAutomator2 and wait till its online and we have a session

// Unlock the device after the session is started.

// unlock the device to prepare it for testing

// rescue UiAutomator2 if it fails to start our AUT

// if the initial orientation is requested, set it

// if we want to immediately get into a webview, set our context
// appropriately

// set the localized strings for the current language from the apk
// TODO: incorporate changes from appium#5308 which fix a race cond-
// ition bug in old appium and need to be replicated here

// Install any "otherApps" that were specified in caps

// make sure we have an activity and package to wait for

// Use this broadcast intent to notify it's time to dump coverage to file
//# sourceMappingURL=data:application/json;charset=utf8;base64,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YSxDQUFDO0tBQzNCOzs7U0FqWGMsZUFBRzs7QUFFaEIsYUFBTyxFQUFFLENBQUM7S0FDWDs7O1NBZ1htQixlQUFHO0FBQ3JCLGFBQU8sT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3ZEOzs7U0FsZUcseUJBQXlCOzs7Ozs7OztBQXNlL0IscUNBQXNCLG9CQUFFLE9BQU8sc0NBQWlCLGlIQUFFOzs7UUFBeEMsR0FBRztRQUFFLEVBQUU7O0FBQ2YsNkJBQXlCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztHQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRCxxQ0FBc0Isb0JBQUUsT0FBTyw0QkFBVSxpSEFBRTs7O1FBQWpDLEdBQUc7UUFBRSxFQUFFOztBQUNmLDZCQUF5QixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7R0FDL0M7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBRWMseUJBQXlCIiwiZmlsZSI6ImxpYi9kcml2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQmFzZURyaXZlciwgRGV2aWNlU2V0dGluZ3MgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuaW1wb3J0IFVpQXV0b21hdG9yMlNlcnZlciBmcm9tICcuL3VpYXV0b21hdG9yMic7XG5pbXBvcnQgeyBmcywgdXRpbCwgbWpwZWcgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgY29tbWFuZHMgZnJvbSAnLi9jb21tYW5kcy9pbmRleCc7XG5pbXBvcnQgeyBERUZBVUxUX0FEQl9QT1JUIH0gZnJvbSAnYXBwaXVtLWFkYic7XG5pbXBvcnQgKiBhcyB1aWF1dG9tYXRvcjJIZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBhbmRyb2lkSGVscGVycywgYW5kcm9pZENvbW1hbmRzIH0gZnJvbSAnYXBwaXVtLWFuZHJvaWQtZHJpdmVyJztcbmltcG9ydCBkZXNpcmVkQ2FwQ29uc3RyYWludHMgZnJvbSAnLi9kZXNpcmVkLWNhcHMnO1xuaW1wb3J0IHsgZmluZEFQb3J0Tm90SW5Vc2UgfSBmcm9tICdwb3J0c2Nhbm5lcic7XG5cblxuY29uc3QgaGVscGVycyA9IE9iamVjdC5hc3NpZ24oe30sIHVpYXV0b21hdG9yMkhlbHBlcnMsIGFuZHJvaWRIZWxwZXJzKTtcblxuLy8gVGhlIHJhbmdlIG9mIHBvcnRzIHdlIGNhbiB1c2Ugb24gdGhlIHN5c3RlbSBmb3IgY29tbXVuaWNhdGluZyB0byB0aGVcbi8vIFVpQXV0b21hdG9yMiBIVFRQIHNlcnZlciBvbiB0aGUgZGV2aWNlXG5jb25zdCBTWVNURU1fUE9SVF9SQU5HRSA9IFs4MjAwLCA4Mjk5XTtcblxuLy8gVGhpcyBpcyB0aGUgcG9ydCB0aGF0IFVpQXV0b21hdG9yMiBsaXN0ZW5zIHRvIG9uIHRoZSBkZXZpY2UuIFdlIHdpbGwgZm9yd2FyZFxuLy8gb25lIG9mIHRoZSBwb3J0cyBhYm92ZSBvbiB0aGUgc3lzdGVtIHRvIHRoaXMgcG9ydCBvbiB0aGUgZGV2aWNlLlxuY29uc3QgREVWSUNFX1BPUlQgPSA2NzkwO1xuXG4vLyBOT19QUk9YWSBjb250YWlucyB0aGUgcGF0aHMgdGhhdCB3ZSBuZXZlciB3YW50IHRvIHByb3h5IHRvIFVpQXV0b21hdG9yMiBzZXJ2ZXIuXG4vLyBUT0RPOiAgQWRkIHRoZSBsaXN0IG9mIHBhdGhzIHRoYXQgd2UgbmV2ZXIgd2FudCB0byBwcm94eSB0byBVaUF1dG9tYXRvcjIgc2VydmVyLlxuLy8gVE9ETzogTmVlZCB0byBzZWdyZWdhdGUgdGhlIHBhdGhzIGJldHRlciB3YXkgdXNpbmcgcmVndWxhciBleHByZXNzaW9ucyB3aGVyZXZlciBhcHBsaWNhYmxlLlxuLy8gKE5vdCBzZWdyZWdhdGluZyByaWdodCBhd2F5IGJlY2F1c2UgbW9yZSBwYXRocyB0byBiZSBhZGRlZCBpbiB0aGUgTk9fUFJPWFkgbGlzdClcbmNvbnN0IE5PX1BST1hZID0gW1xuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi8oPyEuKlxcLyknKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FsZXJ0X1teL10rJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hbGVydC9bXi9dKycpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL1teL10rL2N1cnJlbnRfYWN0aXZpdHknKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9bXi9dKy9jdXJyZW50X3BhY2thZ2UnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9hcHAvW14vXSsnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9kZXZpY2UvW14vXSsnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9zZXR0aW5ncycpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvY29udGV4dCcpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvY29udGV4dHMnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2VsZW1lbnQvW14vXSsvYXR0cmlidXRlJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9lbGVtZW50L1teL10rL2Rpc3BsYXllZCcpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvZWxlbWVudC9bXi9dKy9lbmFibGVkJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9lbGVtZW50L1teL10rL2xvY2F0aW9uX2luX3ZpZXcnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2VsZW1lbnQvW14vXSsvbmFtZScpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvZWxlbWVudC9bXi9dKy9zY3JlZW5zaG90JyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9lbGVtZW50L1teL10rL3NlbGVjdGVkJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9pbWUvW14vXSsnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2xvZy90eXBlcycpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvbmV0d29ya19jb25uZWN0aW9uJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9zY3JlZW5zaG90JyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy91cmwnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9bXi9dK19hbGVydCQnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hY3Rpb25zJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYWxlcnQvW14vXSsnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHAvW14vXScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9bXi9dKy9zdGFydF9hY3Rpdml0eScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9hcHAvW14vXSsnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vY29tcGFyZV9pbWFnZXMnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vZGV2aWNlLyg/IXNldF9jbGlwYm9hcmR8Z2V0X2NsaXBib2FyZClbXi9dKycpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9lbGVtZW50L1teL10rL3JlcGxhY2VfdmFsdWUnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vZWxlbWVudC9bXi9dKy92YWx1ZScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bS9nZXRQZXJmb3JtYW5jZURhdGEnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vcGVyZm9ybWFuY2VEYXRhL3R5cGVzJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL3NldHRpbmdzJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtL3N0YXJ0X3JlY29yZGluZ19zY3JlZW4nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0vc3RvcF9yZWNvcmRpbmdfc2NyZWVuJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvY29udGV4dCcpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2VsZW1lbnQnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9pbWUvW14vXSsnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9rZXlzJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvbG9jYXRpb24nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9sb2cnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9uZXR3b3JrX2Nvbm5lY3Rpb24nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy90aW1lb3V0cycpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3RvdWNoL211bHRpL3BlcmZvcm0nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy90b3VjaC9wZXJmb3JtJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvdXJsJyldLFxuXG4gIC8vIE1KU09OV1AgY29tbWFuZHNcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2V4ZWN1dGUnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9leGVjdXRlX2FzeW5jJyldLFxuICAvLyBXM0MgY29tbWFuZHNcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvd2luZG93L3JlY3QnKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9leGVjdXRlL2FzeW5jJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvZXhlY3V0ZS9zeW5jJyldLFxuXTtcblxuLy8gVGhpcyBpcyBhIHNldCBvZiBtZXRob2RzIGFuZCBwYXRocyB0aGF0IHdlIG5ldmVyIHdhbnQgdG8gcHJveHkgdG8gQ2hyb21lZHJpdmVyLlxuY29uc3QgQ0hST01FX05PX1BST1hZID0gW1xuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0nKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2NvbnRleHQnKV0sXG4gIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL29yaWVudGF0aW9uJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvY29udGV4dCcpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL29yaWVudGF0aW9uJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvdG91Y2gvbXVsdGkvcGVyZm9ybScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3RvdWNoL3BlcmZvcm0nKV0sXG5dO1xuY29uc3QgQVBQX0VYVEVOU0lPTiA9ICcuYXBrJztcblxuY29uc3QgTUVNT0laRURfRlVOQ1RJT05TID0gW1xuICAnZ2V0V2luZG93U2l6ZScsXG4gICdnZXRTdGF0dXNCYXJIZWlnaHQnLFxuICAnZ2V0RGV2aWNlUGl4ZWxSYXRpbycsXG5dO1xuXG5jbGFzcyBBbmRyb2lkVWlhdXRvbWF0b3IyRHJpdmVyIGV4dGVuZHMgQmFzZURyaXZlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRzID0ge30sIHNob3VsZFZhbGlkYXRlQ2FwcyA9IHRydWUpIHtcbiAgICAvLyBgc2hlbGxgIG92ZXJ3cml0ZXMgYWRiLnNoZWxsLCBzbyByZW1vdmVcbiAgICBkZWxldGUgb3B0cy5zaGVsbDtcblxuICAgIHN1cGVyKG9wdHMsIHNob3VsZFZhbGlkYXRlQ2Fwcyk7XG4gICAgdGhpcy5sb2NhdG9yU3RyYXRlZ2llcyA9IFtcbiAgICAgICd4cGF0aCcsXG4gICAgICAnaWQnLFxuICAgICAgJ2NsYXNzIG5hbWUnLFxuICAgICAgJ2FjY2Vzc2liaWxpdHkgaWQnLFxuICAgICAgJy1hbmRyb2lkIHVpYXV0b21hdG9yJ1xuICAgIF07XG4gICAgdGhpcy5kZXNpcmVkQ2FwQ29uc3RyYWludHMgPSBkZXNpcmVkQ2FwQ29uc3RyYWludHM7XG4gICAgdGhpcy51aWF1dG9tYXRvcjIgPSBudWxsO1xuICAgIHRoaXMuandwUHJveHlBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmRlZmF1bHRJTUUgPSBudWxsO1xuICAgIHRoaXMuandwUHJveHlBdm9pZCA9IE5PX1BST1hZO1xuICAgIHRoaXMuYXBrU3RyaW5ncyA9IHt9OyAvLyBtYXAgb2YgbGFuZ3VhZ2UgLT4gc3RyaW5ncyBvYmpcblxuICAgIHRoaXMuc2V0dGluZ3MgPSBuZXcgRGV2aWNlU2V0dGluZ3Moe2lnbm9yZVVuaW1wb3J0YW50Vmlld3M6IGZhbHNlLCBhbGxvd0ludmlzaWJsZUVsZW1lbnRzOiBmYWxzZX0sXG4gICAgICAgIHRoaXMub25TZXR0aW5nc1VwZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAvLyBoYW5kbGUgd2VidmlldyBtZWNoYW5pY3MgZnJvbSBBbmRyb2lkRHJpdmVyXG4gICAgdGhpcy5jaHJvbWVkcml2ZXIgPSBudWxsO1xuICAgIHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnMgPSB7fTtcblxuICAgIC8vIG1lbW9pemUgZnVuY3Rpb25zIGhlcmUsIHNvIHRoYXQgdGhleSBhcmUgZG9uZSBvbiBhIHBlci1pbnN0YW5jZSBiYXNpc1xuICAgIGZvciAoY29uc3QgZm4gb2YgTUVNT0laRURfRlVOQ1RJT05TKSB7XG4gICAgICB0aGlzW2ZuXSA9IF8ubWVtb2l6ZSh0aGlzW2ZuXSk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVEZXNpcmVkQ2FwcyAoY2Fwcykge1xuICAgIHJldHVybiBzdXBlci52YWxpZGF0ZURlc2lyZWRDYXBzKGNhcHMpICYmIGFuZHJvaWRIZWxwZXJzLnZhbGlkYXRlRGVzaXJlZENhcHMoY2Fwcyk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVTZXNzaW9uICguLi5hcmdzKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFRPRE8gaGFuZGxlIG90aGVyU2Vzc2lvbkRhdGEgZm9yIG11bHRpcGxlIHNlc3Npb25zXG4gICAgICBsZXQgW3Nlc3Npb25JZCwgY2Fwc10gPSBhd2FpdCBzdXBlci5jcmVhdGVTZXNzaW9uKC4uLmFyZ3MpO1xuXG4gICAgICBsZXQgc2VydmVyRGV0YWlscyA9IHtwbGF0Zm9ybTogJ0xJTlVYJyxcbiAgICAgICAgd2ViU3RvcmFnZUVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICB0YWtlc1NjcmVlbnNob3Q6IHRydWUsXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICBkYXRhYmFzZUVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBuZXR3b3JrQ29ubmVjdGlvbkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIGxvY2F0aW9uQ29udGV4dEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICB3YXJuaW5nczoge30sXG4gICAgICAgIGRlc2lyZWQ6IHRoaXMuY2Fwc307XG5cbiAgICAgIHRoaXMuY2FwcyA9IE9iamVjdC5hc3NpZ24oc2VydmVyRGV0YWlscywgdGhpcy5jYXBzKTtcblxuICAgICAgdGhpcy5jdXJDb250ZXh0ID0gdGhpcy5kZWZhdWx0Q29udGV4dE5hbWUoKTtcblxuICAgICAgbGV0IGRlZmF1bHRPcHRzID0ge1xuICAgICAgICBmdWxsUmVzZXQ6IGZhbHNlLFxuICAgICAgICBhdXRvTGF1bmNoOiB0cnVlLFxuICAgICAgICBhZGJQb3J0OiBERUZBVUxUX0FEQl9QT1JULFxuICAgICAgICBhbmRyb2lkSW5zdGFsbFRpbWVvdXQ6IDkwMDAwXG4gICAgICB9O1xuICAgICAgXy5kZWZhdWx0cyh0aGlzLm9wdHMsIGRlZmF1bHRPcHRzKTtcblxuICAgICAgaWYgKHRoaXMuaXNDaHJvbWVTZXNzaW9uKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKFwiV2UncmUgZ29pbmcgdG8gcnVuIGEgQ2hyb21lLWJhc2VkIHNlc3Npb25cIik7XG4gICAgICAgIGxldCB7cGtnLCBhY3Rpdml0eX0gPSBoZWxwZXJzLmdldENocm9tZVBrZyh0aGlzLm9wdHMuYnJvd3Nlck5hbWUpO1xuICAgICAgICB0aGlzLm9wdHMuYXBwUGFja2FnZSA9IHRoaXMuY2Fwcy5hcHBQYWNrYWdlID0gcGtnO1xuICAgICAgICB0aGlzLm9wdHMuYXBwQWN0aXZpdHkgPSB0aGlzLmNhcHMuYXBwQWN0aXZpdHkgPSBhY3Rpdml0eTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYENocm9tZS10eXBlIHBhY2thZ2UgYW5kIGFjdGl2aXR5IGFyZSAke3BrZ30gYW5kICR7YWN0aXZpdHl9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdHMucmVib290KSB7XG4gICAgICAgIHRoaXMuc2V0QXZkRnJvbUNhcGFiaWxpdGllcyhjYXBzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0cy5hcHApIHtcbiAgICAgICAgLy8gZmluZCBhbmQgY29weSwgb3IgZG93bmxvYWQgYW5kIHVuemlwIGFuIGFwcCB1cmwgb3IgcGF0aFxuICAgICAgICB0aGlzLm9wdHMuYXBwID0gYXdhaXQgdGhpcy5oZWxwZXJzLmNvbmZpZ3VyZUFwcCh0aGlzLm9wdHMuYXBwLCBBUFBfRVhURU5TSU9OKTtcbiAgICAgICAgYXdhaXQgdGhpcy5jaGVja0FwcFByZXNlbnQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hcHBPbkRldmljZSkge1xuICAgICAgICAvLyB0aGUgYXBwIGlzbid0IGFuIGFjdHVhbCBhcHAgZmlsZSBidXQgcmF0aGVyIHNvbWV0aGluZyB3ZSB3YW50IHRvXG4gICAgICAgIC8vIGFzc3VtZSBpcyBvbiB0aGUgZGV2aWNlIGFuZCBqdXN0IGxhdW5jaCB2aWEgdGhlIGFwcFBhY2thZ2VcbiAgICAgICAgbG9nZ2VyLmluZm8oYEFwcCBmaWxlIHdhcyBub3QgbGlzdGVkLCBpbnN0ZWFkIHdlJ3JlIGdvaW5nIHRvIHJ1biBgICtcbiAgICAgICAgICAgIGAke3RoaXMub3B0cy5hcHBQYWNrYWdlfSBkaXJlY3RseSBvbiB0aGUgZGV2aWNlYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tQYWNrYWdlUHJlc2VudCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRzLnN5c3RlbVBvcnQgPSB0aGlzLm9wdHMuc3lzdGVtUG9ydCB8fCBhd2FpdCBmaW5kQVBvcnROb3RJblVzZShTWVNURU1fUE9SVF9SQU5HRVswXSwgU1lTVEVNX1BPUlRfUkFOR0VbMV0pO1xuICAgICAgdGhpcy5vcHRzLmFkYlBvcnQgPSB0aGlzLm9wdHMuYWRiUG9ydCB8fCBERUZBVUxUX0FEQl9QT1JUO1xuXG4gICAgICBhd2FpdCB0aGlzLnN0YXJ0VWlBdXRvbWF0b3IyU2Vzc2lvbigpO1xuICAgICAgYXdhaXQgdGhpcy5maWxsRGV2aWNlRGV0YWlscygpO1xuICAgICAgaWYgKHRoaXMub3B0cy5tanBlZ1NjcmVlbnNob3RVcmwpIHtcbiAgICAgICAgbG9nZ2VyLmluZm8oYFN0YXJ0aW5nIE1KUEVHIHN0cmVhbSByZWFkaW5nIFVSTDogJyR7dGhpcy5vcHRzLm1qcGVnU2NyZWVuc2hvdFVybH0nYCk7XG4gICAgICAgIHRoaXMubWpwZWdTdHJlYW0gPSBuZXcgbWpwZWcuTUpwZWdTdHJlYW0odGhpcy5vcHRzLm1qcGVnU2NyZWVuc2hvdFVybCk7XG4gICAgICAgIGF3YWl0IHRoaXMubWpwZWdTdHJlYW0uc3RhcnQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbc2Vzc2lvbklkLCB0aGlzLmNhcHNdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuZGVsZXRlU2Vzc2lvbigpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmaWxsRGV2aWNlRGV0YWlscyAoKSB7XG4gICAgdGhpcy5jYXBzLnBpeGVsUmF0aW8gPSBhd2FpdCB0aGlzLmdldERldmljZVBpeGVsUmF0aW8oKTtcbiAgICB0aGlzLmNhcHMuc3RhdEJhckhlaWdodCA9IGF3YWl0IHRoaXMuZ2V0U3RhdHVzQmFySGVpZ2h0KCk7XG4gICAgdGhpcy5jYXBzLnZpZXdwb3J0UmVjdCA9IGF3YWl0IHRoaXMuZ2V0Vmlld1BvcnRSZWN0KCk7XG4gIH1cblxuICBnZXQgZHJpdmVyRGF0YSAoKSB7XG4gICAgLy8gVE9ETyBmaWxsIG91dCByZXNvdXJjZSBpbmZvIGhlcmVcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBhc3luYyBnZXRTZXNzaW9uICgpIHtcbiAgICBsZXQgc2Vzc2lvbkRhdGEgPSBhd2FpdCBzdXBlci5nZXRTZXNzaW9uKCk7XG4gICAgbG9nZ2VyLmRlYnVnKFwiR2V0dGluZyBzZXNzaW9uIGRldGFpbHMgZnJvbSBzZXJ2ZXIgdG8gbWl4IGluXCIpO1xuICAgIGxldCB1aWEyRGF0YSA9IGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZCgnLycsICdHRVQnLCB7fSk7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHNlc3Npb25EYXRhLCB1aWEyRGF0YSk7XG4gIH1cblxuICBpc0VtdWxhdG9yICgpIHtcbiAgICByZXR1cm4gISEodGhpcy5vcHRzLmF2ZCB8fCAvZW11bGF0b3IvLnRlc3QodGhpcy5vcHRzLnVkaWQpKTtcbiAgfVxuXG4gIHNldEF2ZEZyb21DYXBhYmlsaXRpZXMgKGNhcHMpIHtcbiAgICBpZiAodGhpcy5vcHRzLmF2ZCkge1xuICAgICAgbG9nZ2VyLmluZm8oJ2F2ZCBuYW1lIGRlZmluZWQsIGlnbm9yaW5nIGRldmljZSBuYW1lIGFuZCBwbGF0Zm9ybSB2ZXJzaW9uJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghY2Fwcy5kZXZpY2VOYW1lKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvckFuZFRocm93KCdhdmQgb3IgZGV2aWNlTmFtZSBzaG91bGQgYmUgc3BlY2lmaWVkIHdoZW4gcmVib290IG9wdGlvbiBpcyBlbmFibGVzJyk7XG4gICAgICB9XG4gICAgICBpZiAoIWNhcHMucGxhdGZvcm1WZXJzaW9uKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvckFuZFRocm93KCdhdmQgb3IgcGxhdGZvcm1WZXJzaW9uIHNob3VsZCBiZSBzcGVjaWZpZWQgd2hlbiByZWJvb3Qgb3B0aW9uIGlzIGVuYWJsZWQnKTtcbiAgICAgIH1cbiAgICAgIGxldCBhdmREZXZpY2UgPSBjYXBzLmRldmljZU5hbWUucmVwbGFjZSgvW15hLXpBLVowLTlfLl0vZywgXCItXCIpO1xuICAgICAgdGhpcy5vcHRzLmF2ZCA9IGAke2F2ZERldmljZX1fXyR7Y2Fwcy5wbGF0Zm9ybVZlcnNpb259YDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzdGFydFVpQXV0b21hdG9yMlNlc3Npb24gKCkge1xuICAgIGlmICghdGhpcy5vcHRzLmphdmFWZXJzaW9uKSB7XG4gICAgICB0aGlzLm9wdHMuamF2YVZlcnNpb24gPSAnMS44LjBfMTMxJztcbiAgICB9XG5cbiAgICAvLyBnZXQgZGV2aWNlIHVkaWQgZm9yIHRoaXMgc2Vzc2lvblxuICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKHRoaXMub3B0cyk7XG4gICAgdGhpcy5vcHRzLnVkaWQgPSB1ZGlkO1xuICAgIHRoaXMub3B0cy5lbVBvcnQgPSBlbVBvcnQ7XG5cbiAgICAvLyBub3cgdGhhdCB3ZSBrbm93IG91ciBqYXZhIHZlcnNpb24gYW5kIGRldmljZSBpbmZvLCB3ZSBjYW4gY3JlYXRlIG91clxuICAgIC8vIEFEQiBpbnN0YW5jZVxuICAgIHRoaXMuYWRiID0gYXdhaXQgYW5kcm9pZEhlbHBlcnMuY3JlYXRlQURCKHRoaXMub3B0cyk7XG5cbiAgICBpZiAoYXdhaXQgdGhpcy5hZGIuZ2V0QXBpTGV2ZWwoKSA8IDIxKSB7XG4gICAgICBsb2dnZXIuZXJyb3JBbmRUaHJvdygnVUlBdXRvbWF0aW9uMiBpcyBvbmx5IHN1cHBvcnRlZCBzaW5jZSBBbmRyb2lkIDUuMCAoTG9sbGlwb3ApLiAnICtcbiAgICAgICAgJ1lvdSBjb3VsZCBzdGlsbCB1c2Ugb3RoZXIgc3VwcG9ydGVkIGJhY2tlbmRzIGluIG9yZGVyIHRvIGF1dG9tYXRlIG9sZGVyIEFuZHJvaWQgdmVyc2lvbnMuJyk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGFwcFBhY2thZ2UgZXQgYWwgZnJvbSBtYW5pZmVzdCBpZiBuZWNlc3NhcnlcbiAgICBsZXQgYXBwSW5mbyA9IGF3YWl0IGhlbHBlcnMuZ2V0TGF1bmNoSW5mbyh0aGlzLmFkYiwgdGhpcy5vcHRzKTtcbiAgICAvLyBhbmQgZ2V0IGl0IG9udG8gb3VyICdvcHRzJyBvYmplY3Qgc28gd2UgdXNlIGl0IGZyb20gbm93IG9uXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdHMsIGFwcEluZm8pO1xuXG4gICAgLy8gc2V0IGFjdHVhbCBkZXZpY2UgbmFtZSwgdWRpZCwgcGxhdGZvcm0gdmVyc2lvbiwgc2NyZWVuIHNpemUsIHNjcmVlbiBkZW5zaXR5LCBtb2RlbCBhbmQgbWFudWZhY3R1cmVyIGRldGFpbHNcbiAgICB0aGlzLmNhcHMuZGV2aWNlTmFtZSA9IHRoaXMuYWRiLmN1ckRldmljZUlkO1xuICAgIHRoaXMuY2Fwcy5kZXZpY2VVRElEID0gdGhpcy5vcHRzLnVkaWQ7XG4gICAgdGhpcy5jYXBzLnBsYXRmb3JtVmVyc2lvbiA9IGF3YWl0IHRoaXMuYWRiLmdldFBsYXRmb3JtVmVyc2lvbigpO1xuICAgIHRoaXMuY2Fwcy5kZXZpY2VTY3JlZW5TaXplID0gYXdhaXQgdGhpcy5hZGIuZ2V0U2NyZWVuU2l6ZSgpO1xuICAgIHRoaXMuY2Fwcy5kZXZpY2VTY3JlZW5EZW5zaXR5ID0gYXdhaXQgdGhpcy5hZGIuZ2V0U2NyZWVuRGVuc2l0eSgpO1xuICAgIHRoaXMuY2Fwcy5kZXZpY2VNb2RlbCA9IGF3YWl0IHRoaXMuYWRiLmdldE1vZGVsKCk7XG4gICAgdGhpcy5jYXBzLmRldmljZU1hbnVmYWN0dXJlciA9IGF3YWl0IHRoaXMuYWRiLmdldE1hbnVmYWN0dXJlcigpO1xuICAgIHRoaXMuY2Fwcy5kZXZpY2VBcGlMZXZlbCA9IGF3YWl0IHRoaXMuYWRiLmdldEFwaUxldmVsKCk7XG5cbiAgICAvLyBzZXQgdXAgdGhlIG1vZGlmaWVkIFVpQXV0b21hdG9yMiBzZXJ2ZXIgZXRjXG4gICAgYXdhaXQgdGhpcy5pbml0VWlBdXRvbWF0b3IyU2VydmVyKCk7XG5cbiAgICAvLyBzdGFydCBhbiBhdmQsIHNldCB0aGUgbGFuZ3VhZ2UvbG9jYWxlLCBwaWNrIGFuIGVtdWxhdG9yLCBldGMuLi5cbiAgICAvLyBUT0RPIHdpdGggbXVsdGlwbGUgZGV2aWNlcyB3ZSdsbCBuZWVkIHRvIHBhcmFtZXRlcml6ZSB0aGlzXG4gICAgdGhpcy5kZWZhdWx0SU1FID0gYXdhaXQgaGVscGVycy5pbml0RGV2aWNlKHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xuXG4gICAgLy8gRnVydGhlciBwcmVwYXJlIHRoZSBkZXZpY2UgYnkgZm9yd2FyZGluZyB0aGUgVWlBdXRvbWF0b3IyIHBvcnRcbiAgICBsb2dnZXIuZGVidWcoYEZvcndhcmRpbmcgVWlBdXRvbWF0b3IyIFNlcnZlciBwb3J0ICR7REVWSUNFX1BPUlR9IHRvICR7dGhpcy5vcHRzLnN5c3RlbVBvcnR9YCk7XG4gICAgYXdhaXQgdGhpcy5hZGIuZm9yd2FyZFBvcnQodGhpcy5vcHRzLnN5c3RlbVBvcnQsIERFVklDRV9QT1JUKTtcblxuICAgIC8vIElmIHRoZSB1c2VyIHNldHMgYXV0b0xhdW5jaCB0byBmYWxzZSwgdGhleSBhcmUgcmVzcG9uc2libGUgZm9yIGluaXRBVVQoKSBhbmQgc3RhcnRBVVQoKVxuICAgIGlmICh0aGlzLm9wdHMuYXV0b0xhdW5jaCkge1xuICAgICAgLy8gc2V0IHVwIGFwcCB1bmRlciB0ZXN0XG4gICAgICAvLyBwcmVwYXJlIG91ciBhY3R1YWwgQVVULCBnZXQgaXQgb24gdGhlIGRldmljZSwgZXRjLi4uXG4gICAgICBhd2FpdCB0aGlzLmluaXRBVVQoKTtcbiAgICB9XG4gICAgLy8gQWRkaW5nIEFVVCBwYWNrYWdlIG5hbWUgaW4gdGhlIGNhcGFiaWxpdGllcyBpZiBwYWNrYWdlIG5hbWUgbm90IGV4aXN0IGluIGNhcHNcbiAgICBpZiAoIXRoaXMuY2Fwcy5hcHBQYWNrYWdlICYmIGFwcEluZm8pIHtcbiAgICAgIHRoaXMuY2Fwcy5hcHBQYWNrYWdlID0gYXBwSW5mby5hcHBQYWNrYWdlO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBwaWRzID0gKGF3YWl0IHRoaXMuYWRiLmdldFBJRHNCeU5hbWUoJ3VpYXV0b21hdG9yJykpLm1hcCgocCkgPT4gYCR7cH1gKTtcbiAgICAgIGlmICghXy5pc0VtcHR5KHBpZHMpKSB7XG4gICAgICAgIGNvbnN0IGlzUm9vdCA9IGF3YWl0IHRoaXMuYWRiLnJvb3QoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ2tpbGwnLCAnLTknLCAuLi5waWRzXSk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKGlzUm9vdCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5hZGIudW5yb290KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIud2FybihgVW5hYmxlIHRvIHN0b3AgdWlhdXRvbWF0b3IgcHJvY2VzczogJHtlcnIubWVzc2FnZX1gKTtcbiAgICB9XG5cbiAgICAvLyBsYXVuY2ggVWlBdXRvbWF0b3IyIGFuZCB3YWl0IHRpbGwgaXRzIG9ubGluZSBhbmQgd2UgaGF2ZSBhIHNlc3Npb25cbiAgICBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5zdGFydFNlc3Npb24odGhpcy5jYXBzKTtcblxuICAgIC8vIFVubG9jayB0aGUgZGV2aWNlIGFmdGVyIHRoZSBzZXNzaW9uIGlzIHN0YXJ0ZWQuXG4gICAgaWYgKCF0aGlzLm9wdHMuc2tpcFVubG9jaykge1xuICAgICAgLy8gdW5sb2NrIHRoZSBkZXZpY2UgdG8gcHJlcGFyZSBpdCBmb3IgdGVzdGluZ1xuICAgICAgYXdhaXQgaGVscGVycy51bmxvY2sodGhpcywgdGhpcy5hZGIsIHRoaXMuY2Fwcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgJ3NraXBVbmxvY2snIGNhcGFiaWxpdHkgc2V0LCBzbyBza2lwcGluZyBkZXZpY2UgdW5sb2NrYCk7XG4gICAgfVxuXG4gICAgLy8gcmVzY3VlIFVpQXV0b21hdG9yMiBpZiBpdCBmYWlscyB0byBzdGFydCBvdXIgQVVUXG4gICAgaWYgKHRoaXMub3B0cy5hdXRvTGF1bmNoKSB7XG4gICAgICBhd2FpdCB0aGlzLmVuc3VyZUFwcFN0YXJ0cygpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBpbml0aWFsIG9yaWVudGF0aW9uIGlzIHJlcXVlc3RlZCwgc2V0IGl0XG4gICAgaWYgKHV0aWwuaGFzVmFsdWUodGhpcy5vcHRzLm9yaWVudGF0aW9uKSkge1xuICAgICAgbG9nZ2VyLmRlYnVnKGBTZXR0aW5nIGluaXRpYWwgb3JpZW50YXRpb24gdG8gJyR7dGhpcy5vcHRzLm9yaWVudGF0aW9ufSdgKTtcbiAgICAgIGF3YWl0IHRoaXMuc2V0T3JpZW50YXRpb24odGhpcy5vcHRzLm9yaWVudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSB3YW50IHRvIGltbWVkaWF0ZWx5IGdldCBpbnRvIGEgd2Vidmlldywgc2V0IG91ciBjb250ZXh0XG4gICAgLy8gYXBwcm9wcmlhdGVseVxuICAgIGlmICh0aGlzLm9wdHMuYXV0b1dlYnZpZXcpIHtcbiAgICAgIGNvbnN0IHZpZXdOYW1lID0gdGhpcy5kZWZhdWx0V2Vidmlld05hbWUoKTtcbiAgICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLm9wdHMuYXV0b1dlYnZpZXdUaW1lb3V0IHx8IDIwMDA7XG4gICAgICBsb2dnZXIuaW5mbyhgU2V0dGluZyBhdXRvIHdlYnZpZXcgdG8gY29udGV4dCAnJHt2aWV3TmFtZX0nIHdpdGggdGltZW91dCAke3RpbWVvdXR9bXNgKTtcbiAgICAgIGF3YWl0IHJldHJ5SW50ZXJ2YWwodGltZW91dCAvIDUwMCwgNTAwLCB0aGlzLnNldENvbnRleHQuYmluZCh0aGlzKSwgdmlld05hbWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ2hyb21lU2Vzc2lvbikge1xuICAgICAgYXdhaXQgdGhpcy5zdGFydENocm9tZVNlc3Npb24odGhpcyk7XG4gICAgfVxuXG4gICAgLy8gbm93IHRoYXQgZXZlcnl0aGluZyBoYXMgc3RhcnRlZCBzdWNjZXNzZnVsbHksIHR1cm4gb24gcHJveHlpbmcgc28gYWxsXG4gICAgLy8gc3Vic2VxdWVudCBzZXNzaW9uIHJlcXVlc3RzIGdvIHN0cmFpZ2h0IHRvL2Zyb20gdWlhdXRvbWF0b3IyXG4gICAgdGhpcy5qd3BQcm94eUFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBhc3luYyBpbml0VWlBdXRvbWF0b3IyU2VydmVyICgpIHtcbiAgICAvLyBub3cgdGhhdCB3ZSBoYXZlIHBhY2thZ2UgYW5kIGFjdGl2aXR5LCB3ZSBjYW4gY3JlYXRlIGFuIGluc3RhbmNlIG9mXG4gICAgLy8gdWlhdXRvbWF0b3IyIHdpdGggdGhlIGFwcHJvcHJpYXRlIGRhdGFcbiAgICB0aGlzLnVpYXV0b21hdG9yMiA9IG5ldyBVaUF1dG9tYXRvcjJTZXJ2ZXIoe1xuICAgICAgaG9zdDogdGhpcy5vcHRzLnJlbW90ZUFkYkhvc3QgfHwgdGhpcy5vcHRzLmhvc3QgfHwgJ2xvY2FsaG9zdCcsXG4gICAgICBzeXN0ZW1Qb3J0OiB0aGlzLm9wdHMuc3lzdGVtUG9ydCxcbiAgICAgIGRldmljZVBvcnQ6IERFVklDRV9QT1JULFxuICAgICAgYWRiOiB0aGlzLmFkYixcbiAgICAgIGFwazogdGhpcy5vcHRzLmFwcCxcbiAgICAgIHRtcERpcjogdGhpcy5vcHRzLnRtcERpcixcbiAgICAgIGFwcFBhY2thZ2U6IHRoaXMub3B0cy5hcHBQYWNrYWdlLFxuICAgICAgYXBwQWN0aXZpdHk6IHRoaXMub3B0cy5hcHBBY3Rpdml0eSxcbiAgICAgIGRpc2FibGVXaW5kb3dBbmltYXRpb246ICEhdGhpcy5vcHRzLmRpc2FibGVXaW5kb3dBbmltYXRpb24sXG4gICAgfSk7XG4gICAgdGhpcy5wcm94eVJlcVJlcyA9IHRoaXMudWlhdXRvbWF0b3IyLnByb3h5UmVxUmVzLmJpbmQodGhpcy51aWF1dG9tYXRvcjIpO1xuXG4gICAgLy8ga2lsbGluZyBhbnkgdWlhdXRvbWF0b3IgZXhpc3RpbmcgcHJvY2Vzc2VzXG4gICAgYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIua2lsbFVpQXV0b21hdG9yT25EZXZpY2UoKTtcblxuICAgIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmluc3RhbGxTZXJ2ZXJBcGsodGhpcy5vcHRzLnVpYXV0b21hdG9yMlNlcnZlckluc3RhbGxUaW1lb3V0KTtcbiAgfVxuXG4gIGFzeW5jIGluaXRBVVQgKCkge1xuICAgIC8vIHNldCB0aGUgbG9jYWxpemVkIHN0cmluZ3MgZm9yIHRoZSBjdXJyZW50IGxhbmd1YWdlIGZyb20gdGhlIGFwa1xuICAgIC8vIFRPRE86IGluY29ycG9yYXRlIGNoYW5nZXMgZnJvbSBhcHBpdW0jNTMwOCB3aGljaCBmaXggYSByYWNlIGNvbmQtXG4gICAgLy8gaXRpb24gYnVnIGluIG9sZCBhcHBpdW0gYW5kIG5lZWQgdG8gYmUgcmVwbGljYXRlZCBoZXJlXG4gICAgdGhpcy5hcGtTdHJpbmdzW3RoaXMub3B0cy5sYW5ndWFnZV0gPSBhd2FpdCBhbmRyb2lkSGVscGVycy5wdXNoU3RyaW5ncyhcbiAgICAgICAgdGhpcy5vcHRzLmxhbmd1YWdlLCB0aGlzLmFkYiwgdGhpcy5vcHRzKTtcblxuICAgIC8vIEluc3RhbGwgYW55IFwib3RoZXJBcHBzXCIgdGhhdCB3ZXJlIHNwZWNpZmllZCBpbiBjYXBzXG4gICAgaWYgKHRoaXMub3B0cy5vdGhlckFwcHMpIHtcbiAgICAgIGxldCBvdGhlckFwcHM7XG4gICAgICB0cnkge1xuICAgICAgICBvdGhlckFwcHMgPSBoZWxwZXJzLnBhcnNlQXJyYXkodGhpcy5vcHRzLm90aGVyQXBwcyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgcGFyc2UgXCJvdGhlckFwcHNcIiBjYXBhYmlsaXR5OiAke2UubWVzc2FnZX1gKTtcbiAgICAgIH1cbiAgICAgIG90aGVyQXBwcyA9IGF3YWl0IEIuYWxsKG90aGVyQXBwcy5tYXAoKGFwcCkgPT4gdGhpcy5oZWxwZXJzLmNvbmZpZ3VyZUFwcChhcHAsIEFQUF9FWFRFTlNJT04pKSk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmluc3RhbGxPdGhlckFwa3Mob3RoZXJBcHBzLCB0aGlzLmFkYiwgdGhpcy5vcHRzKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0cy5hcHApIHtcbiAgICAgIGlmICh0aGlzLm9wdHMuZnVsbFJlc2V0KSB7XG4gICAgICAgIGxvZ2dlci5lcnJvckFuZFRocm93KCdGdWxsIHJlc2V0IHJlcXVpcmVzIGFuIGFwcCBjYXBhYmlsaXR5LCB1c2UgZmFzdFJlc2V0IGlmIGFwcCBpcyBub3QgcHJvdmlkZWQnKTtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5kZWJ1ZygnTm8gYXBwIGNhcGFiaWxpdHkuIEFzc3VtaW5nIGl0IGlzIGFscmVhZHkgb24gdGhlIGRldmljZScpO1xuICAgICAgaWYgKHRoaXMub3B0cy5mYXN0UmVzZXQpIHtcbiAgICAgICAgYXdhaXQgaGVscGVycy5yZXNldEFwcCh0aGlzLmFkYiwgdGhpcy5vcHRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0cy5za2lwVW5pbnN0YWxsKSB7XG4gICAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMub3B0cy5ub1NpZ24pIHtcbiAgICAgIGxldCBzaWduZWQgPSBhd2FpdCB0aGlzLmFkYi5jaGVja0Fwa0NlcnQodGhpcy5vcHRzLmFwcCwgdGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgICAgaWYgKCFzaWduZWQgJiYgdGhpcy5vcHRzLmFwcCkge1xuICAgICAgICBhd2FpdCB0aGlzLmFkYi5zaWduKHRoaXMub3B0cy5hcHAsIHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMub3B0cy5hcHApIHtcbiAgICAgIGF3YWl0IGhlbHBlcnMuaW5zdGFsbEFwayh0aGlzLmFkYiwgdGhpcy5vcHRzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBlbnN1cmVBcHBTdGFydHMgKCkge1xuICAgIC8vIG1ha2Ugc3VyZSB3ZSBoYXZlIGFuIGFjdGl2aXR5IGFuZCBwYWNrYWdlIHRvIHdhaXQgZm9yXG4gICAgbGV0IGFwcFdhaXRQYWNrYWdlID0gdGhpcy5vcHRzLmFwcFdhaXRQYWNrYWdlIHx8IHRoaXMub3B0cy5hcHBQYWNrYWdlO1xuICAgIGxldCBhcHBXYWl0QWN0aXZpdHkgPSB0aGlzLm9wdHMuYXBwV2FpdEFjdGl2aXR5IHx8IHRoaXMub3B0cy5hcHBBY3Rpdml0eTtcblxuICAgIGxvZ2dlci5pbmZvKGBVaUF1dG9tYXRvcjIgZGlkIG5vdCBzdGFydCB0aGUgYWN0aXZpdHkgd2Ugd2VyZSB3YWl0aW5nIGZvciwgYCArXG4gICAgICAgIGAnJHthcHBXYWl0UGFja2FnZX0vJHthcHBXYWl0QWN0aXZpdHl9Jy4gU3RhcnRpbmcgaXQgb3Vyc2VsdmVzYCk7XG5cbiAgICBpZiAodGhpcy5jYXBzLmFuZHJvaWRDb3ZlcmFnZSkge1xuICAgICAgbG9nZ2VyLmluZm8oYGFuZHJvaWRDb3ZlcmFnZSBpcyBjb25maWd1cmVkLiBgICtcbiAgICAgICAgYCBTdGFydGluZyBpbnN0cnVtZW50YXRpb24gb2YgJyR7dGhpcy5jYXBzLmFuZHJvaWRDb3ZlcmFnZX0nLi4uYCk7XG4gICAgICBhd2FpdCB0aGlzLmFkYi5hbmRyb2lkQ292ZXJhZ2UodGhpcy5jYXBzLmFuZHJvaWRDb3ZlcmFnZSwgYXBwV2FpdFBhY2thZ2UsIGFwcFdhaXRBY3Rpdml0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMuYWRiLnN0YXJ0QXBwKHtcbiAgICAgICAgcGtnOiB0aGlzLm9wdHMuYXBwUGFja2FnZSxcbiAgICAgICAgYWN0aXZpdHk6IHRoaXMub3B0cy5hcHBBY3Rpdml0eSxcbiAgICAgICAgYWN0aW9uOiB0aGlzLm9wdHMuaW50ZW50QWN0aW9uLFxuICAgICAgICBjYXRlZ29yeTogdGhpcy5vcHRzLmludGVudENhdGVnb3J5LFxuICAgICAgICBmbGFnczogdGhpcy5vcHRzLmludGVudEZsYWdzLFxuICAgICAgICB3YWl0UGtnOiB0aGlzLm9wdHMuYXBwV2FpdFBhY2thZ2UsXG4gICAgICAgIHdhaXRBY3Rpdml0eTogdGhpcy5vcHRzLmFwcFdhaXRBY3Rpdml0eSxcbiAgICAgICAgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHM6IHRoaXMub3B0cy5vcHRpb25hbEludGVudEFyZ3VtZW50cyxcbiAgICAgICAgc3RvcEFwcDogIXRoaXMub3B0cy5kb250U3RvcEFwcE9uUmVzZXQsXG4gICAgICAgIHJldHJ5OiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZVNlc3Npb24gKCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnRGVsZXRpbmcgVWlBdXRvbWF0b3IyIHNlc3Npb24nKTtcbiAgICBhd2FpdCBhbmRyb2lkSGVscGVycy5yZW1vdmVBbGxTZXNzaW9uV2ViU29ja2V0SGFuZGxlcnModGhpcy5zZXJ2ZXIsIHRoaXMuc2Vzc2lvbklkKTtcbiAgICBpZiAodGhpcy51aWF1dG9tYXRvcjIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc3RvcENocm9tZWRyaXZlclByb3hpZXMoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIud2FybihgVW5hYmxlIHRvIHN0b3AgQ2hyb21lRHJpdmVyIHByb3hpZXM6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5qd3BQcm94eUFjdGl2ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oYFVuYWJsZSB0byBwcm94eSBkZWxldGVTZXNzaW9uIHRvIFVpQXV0b21hdG9yMjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy51aWF1dG9tYXRvcjIgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmp3cFByb3h5QWN0aXZlID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5hZGIpIHtcbiAgICAgIGlmICh0aGlzLm9wdHMudW5pY29kZUtleWJvYXJkICYmIHRoaXMub3B0cy5yZXNldEtleWJvYXJkICYmIHRoaXMuZGVmYXVsdElNRSkge1xuICAgICAgICBsb2dnZXIuZGVidWcoYFJlc2V0dGluZyBJTUUgdG8gJyR7dGhpcy5kZWZhdWx0SU1FfSdgKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmFkYi5zZXRJTUUodGhpcy5kZWZhdWx0SU1FKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oYFVuYWJsZSB0byByZXNldCBJTUU6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNhcHMuYW5kcm9pZENvdmVyYWdlKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKCdTaHV0dGluZyBkb3duIHRoZSBhZGIgcHJvY2VzcyBvZiBpbnN0cnVtZW50YXRpb24uLi4nKTtcbiAgICAgICAgYXdhaXQgdGhpcy5hZGIuZW5kQW5kcm9pZENvdmVyYWdlKCk7XG4gICAgICAgIC8vIFVzZSB0aGlzIGJyb2FkY2FzdCBpbnRlbnQgdG8gbm90aWZ5IGl0J3MgdGltZSB0byBkdW1wIGNvdmVyYWdlIHRvIGZpbGVcbiAgICAgICAgaWYgKHRoaXMuY2Fwcy5hbmRyb2lkQ292ZXJhZ2VFbmRJbnRlbnQpIHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU2VuZGluZyBpbnRlbnQgYnJvYWRjYXN0ICcke3RoaXMuY2Fwcy5hbmRyb2lkQ292ZXJhZ2VFbmRJbnRlbnR9JyBhdCB0aGUgZW5kIG9mIGluc3RydW1lbnRpbmcuYCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hZGIuYnJvYWRjYXN0KHRoaXMuY2Fwcy5hbmRyb2lkQ292ZXJhZ2VFbmRJbnRlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ2dlci53YXJuKCdObyBhbmRyb2lkQ292ZXJhZ2VFbmRJbnRlbnQgaXMgY29uZmlndXJlZCBpbiBjYXBzLiBQb3NzaWJseSB5b3UgY2Fubm90IGdldCBjb3ZlcmFnZSBmaWxlLicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5vcHRzLmFwcFBhY2thZ2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmFkYi5mb3JjZVN0b3AodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIud2FybihgVW5hYmxlIHRvIGZvcmNlIHN0b3AgYXBwOiAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5vcHRzLmZ1bGxSZXNldCAmJiAhdGhpcy5vcHRzLnNraXBVbmluc3RhbGwgJiYgIXRoaXMuYXBwT25EZXZpY2UpIHtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBDYXBhYmlsaXR5ICdmdWxsUmVzZXQnIHNldCB0byAndHJ1ZScsIFVuaW5zdGFsbGluZyAnJHt0aGlzLm9wdHMuYXBwUGFja2FnZX0nYCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hZGIudW5pbnN0YWxsQXBrKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oYFVuYWJsZSB0byB1bmluc3RhbGwgYXBwOiAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhd2FpdCB0aGlzLmFkYi5zdG9wTG9nY2F0KCk7XG4gICAgICBpZiAodXRpbC5oYXNWYWx1ZSh0aGlzLm9wdHMuc3lzdGVtUG9ydCkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmFkYi5yZW1vdmVQb3J0Rm9yd2FyZCh0aGlzLm9wdHMuc3lzdGVtUG9ydCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbG9nZ2VyLndhcm4oYFVuYWJsZSB0byByZW1vdmUgcG9ydCBmb3J3YXJkICcke2Vycm9yLm1lc3NhZ2V9J2ApO1xuICAgICAgICAgIC8vIElnbm9yZSwgdGhpcyBibG9jayB3aWxsIGFsc28gYmUgY2FsbGVkIHdoZW4gd2UgZmFsbCBpbiBjYXRjaCBibG9ja1xuICAgICAgICAgIC8vIGFuZCBiZWZvcmUgZXZlbiBwb3J0IGZvcndhcmQuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9wdHMucmVib290KSB7XG4gICAgICAgIGxldCBhdmROYW1lID0gdGhpcy5vcHRzLmF2ZC5yZXBsYWNlKCdAJywgJycpO1xuICAgICAgICBsb2dnZXIuZGVidWcoYENsb3NpbmcgZW11bGF0b3IgJyR7YXZkTmFtZX0nYCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5hZGIua2lsbEVtdWxhdG9yKGF2ZE5hbWUpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIud2FybihgVW5hYmxlIHRvIGNsb3NlIGVtdWxhdG9yOiAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm1qcGVnU3RyZWFtKSB7XG4gICAgICBsb2dnZXIuaW5mbygnQ2xvc2luZyBNSlBFRyBzdHJlYW0nKTtcbiAgICAgIHRoaXMubWpwZWdTdHJlYW0uc3RvcCgpO1xuICAgIH1cbiAgICBhd2FpdCBzdXBlci5kZWxldGVTZXNzaW9uKCk7XG4gIH1cblxuICBhc3luYyBjaGVja0FwcFByZXNlbnQgKCkge1xuICAgIGxvZ2dlci5kZWJ1ZygnQ2hlY2tpbmcgd2hldGhlciBhcHAgaXMgYWN0dWFsbHkgcHJlc2VudCcpO1xuICAgIGlmICghKGF3YWl0IGZzLmV4aXN0cyh0aGlzLm9wdHMuYXBwKSkpIHtcbiAgICAgIGxvZ2dlci5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgZmluZCBhcHAgYXBrIGF0ICcke3RoaXMub3B0cy5hcHB9J2ApO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIG9uU2V0dGluZ3NVcGRhdGUgKGtleSwgdmFsdWUpIHtcbiAgICBsZXQgc2V0dGluZ3MgPSB7W2tleV06IHZhbHVlfTtcbiAgICBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoJy9hcHBpdW0vc2V0dGluZ3MnLCAnUE9TVCcsIHtzZXR0aW5nc30pO1xuICB9XG5cbiAgLy8gTmVlZCB0byBvdmVycmlkZSBhbmRyb2lkLWRyaXZlcidzIHZlcnNpb24gb2YgdGhpcyBzaW5jZSB3ZSBkb24ndCBhY3R1YWxseVxuICAvLyBoYXZlIGEgYm9vdHN0cmFwOyBpbnN0ZWFkIHdlIGp1c3QgcmVzdGFydCBhZGIgYW5kIHJlLWZvcndhcmQgdGhlIFVpQXV0b21hdG9yMlxuICAvLyBwb3J0XG4gIGFzeW5jIHdyYXBCb290c3RyYXBEaXNjb25uZWN0ICh3cmFwcGVkKSB7XG4gICAgYXdhaXQgd3JhcHBlZCgpO1xuICAgIGF3YWl0IHRoaXMuYWRiLnJlc3RhcnQoKTtcbiAgICBhd2FpdCB0aGlzLmFkYi5mb3J3YXJkUG9ydCh0aGlzLm9wdHMuc3lzdGVtUG9ydCwgREVWSUNFX1BPUlQpO1xuICB9XG5cbiAgcHJveHlBY3RpdmUgKHNlc3Npb25JZCkge1xuICAgIHN1cGVyLnByb3h5QWN0aXZlKHNlc3Npb25JZCk7XG5cbiAgICAvLyB3ZSBhbHdheXMgaGF2ZSBhbiBhY3RpdmUgcHJveHkgdG8gdGhlIFVpQXV0b21hdG9yMiBzZXJ2ZXJcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNhblByb3h5IChzZXNzaW9uSWQpIHtcbiAgICBzdXBlci5jYW5Qcm94eShzZXNzaW9uSWQpO1xuXG4gICAgLy8gd2UgY2FuIGFsd2F5cyBwcm94eSB0byB0aGUgdWlhdXRvbWF0b3IyIHNlcnZlclxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0UHJveHlBdm9pZExpc3QgKHNlc3Npb25JZCkge1xuICAgIHN1cGVyLmdldFByb3h5QXZvaWRMaXN0KHNlc3Npb25JZCk7XG4gICAgLy8gd2UgYXJlIG1haW50YWluaW5nIHR3byBzZXRzIG9mIE5PX1BST1hZIGxpc3RzLCBvbmUgZm9yIGNocm9tZWRyaXZlcihDSFJPTUVfTk9fUFJPWFkpXG4gICAgLy8gYW5kIG9uZSBmb3IgdWlhdXRvbWF0b3IyKE5PX1BST1hZKSwgYmFzZWQgb24gY3VycmVudCBjb250ZXh0IHdpbGwgcmV0dXJuIHJlbGF0ZWQgTk9fUFJPWFkgbGlzdFxuICAgIGlmICh1dGlsLmhhc1ZhbHVlKHRoaXMuY2hyb21lZHJpdmVyKSkge1xuICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgY29udGV4dCBpcyB3ZWJ2aWV3KGNocm9tZWRyaXZlciksIHRoZW4gcmV0dXJuIENIUk9NRV9OT19QUk9YWSBsaXN0XG4gICAgICB0aGlzLmp3cFByb3h5QXZvaWQgPSBDSFJPTUVfTk9fUFJPWFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuandwUHJveHlBdm9pZCA9IE5PX1BST1hZO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRzLm5hdGl2ZVdlYlNjcmVlbnNob3QpIHtcbiAgICAgIHRoaXMuandwUHJveHlBdm9pZCA9IFsuLi50aGlzLmp3cFByb3h5QXZvaWQsIFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3NjcmVlbnNob3QnKV1dO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmp3cFByb3h5QXZvaWQ7XG4gIH1cblxuICBnZXQgaXNDaHJvbWVTZXNzaW9uICgpIHtcbiAgICByZXR1cm4gaGVscGVycy5pc0Nocm9tZUJyb3dzZXIodGhpcy5vcHRzLmJyb3dzZXJOYW1lKTtcbiAgfVxufVxuXG4vLyBmaXJzdCBhZGQgdGhlIGFuZHJvaWQtZHJpdmVyIGNvbW1hbmRzIHdoaWNoIHdlIHdpbGwgZmFsbCBiYWNrIHRvXG5mb3IgKGxldCBbY21kLCBmbl0gb2YgXy50b1BhaXJzKGFuZHJvaWRDb21tYW5kcykpIHtcbiAgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlci5wcm90b3R5cGVbY21kXSA9IGZuO1xufVxuXG4vLyB0aGVuIG92ZXJ3cml0ZSB3aXRoIGFueSB1aWF1dG9tYXRvcjItc3BlY2lmaWMgY29tbWFuZHNcbmZvciAobGV0IFtjbWQsIGZuXSBvZiBfLnRvUGFpcnMoY29tbWFuZHMpKSB7XG4gIEFuZHJvaWRVaWF1dG9tYXRvcjJEcml2ZXIucHJvdG90eXBlW2NtZF0gPSBmbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlcjtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
