'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumAndroidDriver = require('appium-android-driver');

var _appiumBaseDriver = require('appium-base-driver');

var extensions = {},
    commands = {},
    helpers = {};

commands.getPageSource = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/source', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Need to override this for correct unicode support
commands.doSendKeys = function callee$0$0(params) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/keys', 'POST', params));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// uiautomator2 doesn't support metastate for keyevents
commands.keyevent = function callee$0$0(keycode, metastate) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Ignoring metastate ' + metastate);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.keyevent(keycode));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Use ADB since we don't have UiAutomator
commands.back = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.keyevent(4));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getStrings = function callee$0$0(language) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (language) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.getDeviceLanguage());

      case 3:
        language = context$1$0.sent;

        _logger2['default'].info('No language specified, returning strings for: ' + language);

      case 5:
        if (!this.apkStrings[language]) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumAndroidDriver.androidHelpers.pushStrings(language, this.adb, this.opts));

      case 9:
        this.apkStrings[language] = context$1$0.sent;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/app/strings', 'POST', {}));

      case 12:
        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// memoized in constructor
commands.getWindowSize = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/window/current/size', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// For W3C
commands.getWindowRect = function callee$0$0() {
  var _ref, width, height;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getWindowSize());

      case 2:
        _ref = context$1$0.sent;
        width = _ref.width;
        height = _ref.height;
        return context$1$0.abrupt('return', {
          width: width,
          height: height,
          x: 0,
          y: 0
        });

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

extensions.executeMobile = function callee$0$0(mobileCommand) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var mobileCommandsMapping;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        mobileCommandsMapping = {
          shell: 'mobileShell',

          scrollBackTo: 'mobileScrollBackTo',
          viewportScreenshot: 'mobileViewportScreenshot',

          deepLink: 'mobileDeepLink',

          startLogsBroadcast: 'mobileStartLogsBroadcast',
          stopLogsBroadcast: 'mobileStopLogsBroadcast',

          acceptAlert: 'mobileAcceptAlert',
          dismissAlert: 'mobileDismissAlert',

          batteryInfo: 'mobileGetBatteryInfo'
        };

        if (_lodash2['default'].has(mobileCommandsMapping, mobileCommand)) {
          context$1$0.next = 3;
          break;
        }

        throw new _appiumBaseDriver.errors.UnknownCommandError('Unknown mobile command "' + mobileCommand + '". ' + ('Only ' + _lodash2['default'].keys(mobileCommandsMapping) + ' commands are supported.'));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this[mobileCommandsMapping[mobileCommand]](opts));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.mobileScrollBackTo = function callee$0$0(opts) {
  var elementId, elementToId;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        elementId = opts.elementId;
        elementToId = opts.elementToId;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/element/' + elementId + '/scroll_to/' + elementToId, 'POST', {}));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.mobileViewportScreenshot = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getViewportScreenshot());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setUrl = function callee$0$0(url) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.startUri(url, this.opts.appPackage));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.mobileDeepLink = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var url, pkg;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        url = opts.url;
        pkg = opts['package'];
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.startUri(url, pkg));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.openNotifications = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/device/open_notifications', 'POST', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.updateSettings = function callee$0$0(settings) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/settings', 'POST', { settings: settings }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getSettings = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/settings', 'GET'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Overriding appium-android-driver's wrapBootstrapDisconnect,
 * unlike in appium-android-driver avoiding adb restarting as it intern
 * kills UiAutomator2 server running in the device.
 **/
helpers.wrapBootstrapDisconnect = function callee$0$0(wrapped) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(wrapped());

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Stop proxying to any Chromedriver and redirect to uiautomator2
helpers.suspendChromedriverProxy = function () {
  this.chromedriver = null;
  this.proxyReqRes = this.uiautomator2.proxyReqRes.bind(this.uiautomator2);
  this.jwpProxyActive = true;
};

_Object$assign(extensions, commands, helpers);

exports['default'] = extensions;
module.exports = exports['default'];

// Return cached strings

// TODO: This is mutating the current language, but it's how appium currently works
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7O3NCQUNOLFdBQVc7Ozs7bUNBQ0ksdUJBQXVCOztnQ0FDL0Isb0JBQW9COztBQUUzQyxJQUFJLFVBQVUsR0FBRyxFQUFFO0lBQ2YsUUFBUSxHQUFHLEVBQUU7SUFDYixPQUFPLEdBQUcsRUFBRSxDQUFDOztBQUVqQixRQUFRLENBQUMsYUFBYSxHQUFHOzs7Ozt5Q0FDVixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Q0FDckUsQ0FBQzs7O0FBR0YsUUFBUSxDQUFDLFVBQVUsR0FBRyxvQkFBZ0IsTUFBTTs7Ozs7eUNBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQzs7Ozs7OztDQUNqRSxDQUFDOzs7QUFHRixRQUFRLENBQUMsUUFBUSxHQUFHLG9CQUFnQixPQUFPLEVBQUUsU0FBUzs7OztBQUNwRCw0QkFBSSxLQUFLLHlCQUF1QixTQUFTLENBQUcsQ0FBQzs7eUNBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQzs7Ozs7OztDQUNqQyxDQUFDOzs7QUFHRixRQUFRLENBQUMsSUFBSSxHQUFHOzs7Ozt5Q0FDUixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Q0FDM0IsQ0FBQzs7QUFFRixRQUFRLENBQUMsVUFBVSxHQUFHLG9CQUFnQixRQUFROzs7O1lBQ3ZDLFFBQVE7Ozs7Ozt5Q0FDTSxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFOzs7QUFBN0MsZ0JBQVE7O0FBQ1IsNEJBQUksSUFBSSxvREFBa0QsUUFBUSxDQUFHLENBQUM7OzthQUdwRSxJQUFJLENBQUMsVUFBVSxD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QUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7Ozs7Ozs7Q0FDekMsQ0FBQzs7QUFFRixRQUFRLENBQUMsaUJBQWlCLEdBQUc7Ozs7O3lDQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDOzs7Ozs7Ozs7O0NBQ2hHLENBQUM7O0FBRUYsUUFBUSxDQUFDLGNBQWMsR0FBRyxvQkFBZ0IsUUFBUTs7Ozs7eUNBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsRUFBQyxRQUFRLEVBQVIsUUFBUSxFQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDdkYsQ0FBQzs7QUFFRixRQUFRLENBQUMsV0FBVyxHQUFHOzs7Ozt5Q0FDUixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDOzs7Ozs7Ozs7O0NBQzFFLENBQUM7Ozs7Ozs7QUFPRixPQUFPLENBQUMsdUJBQXVCLEdBQUcsb0JBQWdCLE9BQU87Ozs7O3lDQUNqRCxPQUFPLEVBQUU7Ozs7Ozs7Q0FDaEIsQ0FBQzs7O0FBR0YsT0FBTyxDQUFDLHdCQUF3QixHQUFHLFlBQVk7QUFDN0MsTUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDekIsTUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3pFLE1BQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0NBQzVCLENBQUM7O0FBRUYsZUFBYyxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztxQkFFOUIsVUFBVSIsImZpbGUiOiJsaWIvY29tbWFuZHMvZ2VuZXJhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgeyBhbmRyb2lkSGVscGVycyB9IGZyb20gJ2FwcGl1bS1hbmRyb2lkLWRyaXZlcic7XG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuXG5sZXQgZXh0ZW5zaW9ucyA9IHt9LFxuICAgIGNvbW1hbmRzID0ge30sXG4gICAgaGVscGVycyA9IHt9O1xuXG5jb21tYW5kcy5nZXRQYWdlU291cmNlID0gYXN5bmMgZnVuY3Rpb24gICgpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZCgnL3NvdXJjZScsICdHRVQnLCB7fSk7XG59O1xuXG4vLyBOZWVkIHRvIG92ZXJyaWRlIHRoaXMgZm9yIGNvcnJlY3QgdW5pY29kZSBzdXBwb3J0XG5jb21tYW5kcy5kb1NlbmRLZXlzID0gYXN5bmMgZnVuY3Rpb24gKHBhcmFtcykge1xuICBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoJy9rZXlzJywgJ1BPU1QnLCBwYXJhbXMpO1xufTtcblxuLy8gdWlhdXRvbWF0b3IyIGRvZXNuJ3Qgc3VwcG9ydCBtZXRhc3RhdGUgZm9yIGtleWV2ZW50c1xuY29tbWFuZHMua2V5ZXZlbnQgPSBhc3luYyBmdW5jdGlvbiAoa2V5Y29kZSwgbWV0YXN0YXRlKSB7XG4gIGxvZy5kZWJ1ZyhgSWdub3JpbmcgbWV0YXN0YXRlICR7bWV0YXN0YXRlfWApO1xuICBhd2FpdCB0aGlzLmFkYi5rZXlldmVudChrZXljb2RlKTtcbn07XG5cbi8vIFVzZSBBREIgc2luY2Ugd2UgZG9uJ3QgaGF2ZSBVaUF1dG9tYXRvclxuY29tbWFuZHMuYmFjayA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgYXdhaXQgdGhpcy5hZGIua2V5ZXZlbnQoNCk7XG59O1xuXG5jb21tYW5kcy5nZXRTdHJpbmdzID0gYXN5bmMgZnVuY3Rpb24gKGxhbmd1YWdlKSB7XG4gIGlmICghbGFuZ3VhZ2UpIHtcbiAgICBsYW5ndWFnZSA9IGF3YWl0IHRoaXMuYWRiLmdldERldmljZUxhbmd1YWdlKCk7XG4gICAgbG9nLmluZm8oYE5vIGxhbmd1YWdlIHNwZWNpZmllZCwgcmV0dXJuaW5nIHN0cmluZ3MgZm9yOiAke2xhbmd1YWdlfWApO1xuICB9XG5cbiAgaWYgKHRoaXMuYXBrU3RyaW5nc1tsYW5ndWFnZV0pIHtcbiAgICAvLyBSZXR1cm4gY2FjaGVkIHN0cmluZ3NcbiAgICByZXR1cm4gdGhpcy5hcGtTdHJpbmdzW2xhbmd1YWdlXTtcbiAgfVxuXG4gIC8vIFRPRE86IFRoaXMgaXMgbXV0YXRpbmcgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UsIGJ1dCBpdCdzIGhvdyBhcHBpdW0gY3VycmVudGx5IHdvcmtzXG4gIHRoaXMuYXBrU3RyaW5nc1tsYW5ndWFnZV0gPSBhd2FpdCBhbmRyb2lkSGVscGVycy5wdXNoU3RyaW5ncyhsYW5ndWFnZSwgdGhpcy5hZGIsIHRoaXMub3B0cyk7XG4gIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZChgL2FwcGl1bS9hcHAvc3RyaW5nc2AsICdQT1NUJywge30pO1xuXG4gIHJldHVybiB0aGlzLmFwa1N0cmluZ3NbbGFuZ3VhZ2VdO1xufTtcblxuLy8gbWVtb2l6ZWQgaW4gY29uc3RydWN0b3JcbmNvbW1hbmRzLmdldFdpbmRvd1NpemUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoJy93aW5kb3cvY3VycmVudC9zaXplJywgJ0dFVCcsIHt9KTtcbn07XG5cbi8vIEZvciBXM0NcbmNvbW1hbmRzLmdldFdpbmRvd1JlY3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IGF3YWl0IHRoaXMuZ2V0V2luZG93U2l6ZSgpO1xuICByZXR1cm4ge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICB4OiAwLFxuICAgIHk6IDAsXG4gIH07XG59O1xuXG5leHRlbnNpb25zLmV4ZWN1dGVNb2JpbGUgPSBhc3luYyBmdW5jdGlvbiAobW9iaWxlQ29tbWFuZCwgb3B0cyA9IHt9KSB7XG4gIGNvbnN0IG1vYmlsZUNvbW1hbmRzTWFwcGluZyA9IHtcbiAgICBzaGVsbDogJ21vYmlsZVNoZWxsJyxcblxuICAgIHNjcm9sbEJhY2tUbzogJ21vYmlsZVNjcm9sbEJhY2tUbycsXG4gICAgdmlld3BvcnRTY3JlZW5zaG90OiAnbW9iaWxlVmlld3BvcnRTY3JlZW5zaG90JyxcblxuICAgIGRlZXBMaW5rOiAnbW9iaWxlRGVlcExpbmsnLFxuXG4gICAgc3RhcnRMb2dzQnJvYWRjYXN0OiAnbW9iaWxlU3RhcnRMb2dzQnJvYWRjYXN0JyxcbiAgICBzdG9wTG9nc0Jyb2FkY2FzdDogJ21vYmlsZVN0b3BMb2dzQnJvYWRjYXN0JyxcblxuICAgIGFjY2VwdEFsZXJ0OiAnbW9iaWxlQWNjZXB0QWxlcnQnLFxuICAgIGRpc21pc3NBbGVydDogJ21vYmlsZURpc21pc3NBbGVydCcsXG5cbiAgICBiYXR0ZXJ5SW5mbzogJ21vYmlsZUdldEJhdHRlcnlJbmZvJyxcbiAgfTtcblxuICBpZiAoIV8uaGFzKG1vYmlsZUNvbW1hbmRzTWFwcGluZywgbW9iaWxlQ29tbWFuZCkpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLlVua25vd25Db21tYW5kRXJyb3IoYFVua25vd24gbW9iaWxlIGNvbW1hbmQgXCIke21vYmlsZUNvbW1hbmR9XCIuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgT25seSAke18ua2V5cyhtb2JpbGVDb21tYW5kc01hcHBpbmcpfSBjb21tYW5kcyBhcmUgc3VwcG9ydGVkLmApO1xuICB9XG4gIHJldHVybiBhd2FpdCB0aGlzW21vYmlsZUNvbW1hbmRzTWFwcGluZ1ttb2JpbGVDb21tYW5kXV0ob3B0cyk7XG59O1xuXG5jb21tYW5kcy5tb2JpbGVTY3JvbGxCYWNrVG8gPSBhc3luYyBmdW5jdGlvbiAob3B0cykge1xuICBjb25zdCB7ZWxlbWVudElkLCBlbGVtZW50VG9JZH0gPSBvcHRzO1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKGAvYXBwaXVtL2VsZW1lbnQvJHtlbGVtZW50SWR9L3Njcm9sbF90by8ke2VsZW1lbnRUb0lkfWAsICdQT1NUJywge30pO1xufTtcblxuY29tbWFuZHMubW9iaWxlVmlld3BvcnRTY3JlZW5zaG90ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5nZXRWaWV3cG9ydFNjcmVlbnNob3QoKTtcbn07XG5cbmNvbW1hbmRzLnNldFVybCA9IGFzeW5jIGZ1bmN0aW9uICh1cmwpIHtcbiAgYXdhaXQgdGhpcy5hZGIuc3RhcnRVcmkodXJsLCB0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG59O1xuXG5jb21tYW5kcy5tb2JpbGVEZWVwTGluayA9IGFzeW5jIGZ1bmN0aW9uIChvcHRzID0ge30pIHtcbiAgY29uc3Qge3VybCwgcGFja2FnZTpwa2d9ID0gb3B0cztcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYWRiLnN0YXJ0VXJpKHVybCwgcGtnKTtcbn07XG5cbmNvbW1hbmRzLm9wZW5Ob3RpZmljYXRpb25zID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKCcvYXBwaXVtL2RldmljZS9vcGVuX25vdGlmaWNhdGlvbnMnLCAnUE9TVCcsIHt9KTtcbn07XG5cbmNvbW1hbmRzLnVwZGF0ZVNldHRpbmdzID0gYXN5bmMgZnVuY3Rpb24gKHNldHRpbmdzKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoJy9hcHBpdW0vc2V0dGluZ3MnLCAnUE9TVCcsIHtzZXR0aW5nc30pO1xufTtcblxuY29tbWFuZHMuZ2V0U2V0dGluZ3MgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoJy9hcHBpdW0vc2V0dGluZ3MnLCAnR0VUJyk7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRpbmcgYXBwaXVtLWFuZHJvaWQtZHJpdmVyJ3Mgd3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QsXG4gKiB1bmxpa2UgaW4gYXBwaXVtLWFuZHJvaWQtZHJpdmVyIGF2b2lkaW5nIGFkYiByZXN0YXJ0aW5nIGFzIGl0IGludGVyblxuICoga2lsbHMgVWlBdXRvbWF0b3IyIHNlcnZlciBydW5uaW5nIGluIHRoZSBkZXZpY2UuXG4gKiovXG5oZWxwZXJzLndyYXBCb290c3RyYXBEaXNjb25uZWN0ID0gYXN5bmMgZnVuY3Rpb24gKHdyYXBwZWQpICB7XG4gIGF3YWl0IHdyYXBwZWQoKTtcbn07XG5cbi8vIFN0b3AgcHJveHlpbmcgdG8gYW55IENocm9tZWRyaXZlciBhbmQgcmVkaXJlY3QgdG8gdWlhdXRvbWF0b3IyXG5oZWxwZXJzLnN1c3BlbmRDaHJvbWVkcml2ZXJQcm94eSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jaHJvbWVkcml2ZXIgPSBudWxsO1xuICB0aGlzLnByb3h5UmVxUmVzID0gdGhpcy51aWF1dG9tYXRvcjIucHJveHlSZXFSZXMuYmluZCh0aGlzLnVpYXV0b21hdG9yMik7XG4gIHRoaXMuandwUHJveHlBY3RpdmUgPSB0cnVlO1xufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
