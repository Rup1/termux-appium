'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumSupport = require('appium-support');

var extensions = {},
    commands = {};

// memoized in constructor
commands.getStatusBarHeight = function callee$0$0() {
  var _ref, statusBar;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/device/system_bars', 'GET', {}));

      case 2:
        _ref = context$1$0.sent;
        statusBar = _ref.statusBar;
        return context$1$0.abrupt('return', statusBar);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// memoized in constructor
commands.getDevicePixelRatio = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/device/pixel_ratio', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getViewportScreenshot = function callee$0$0() {
  var screenshot, rect;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getScreenshot());

      case 2:
        screenshot = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.getViewPortRect());

      case 5:
        rect = context$1$0.sent;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_appiumSupport.imageUtil.cropBase64Image(screenshot, rect));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getViewPortRect = function callee$0$0() {
  var windowSize, statusBarHeight;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getWindowSize());

      case 2:
        windowSize = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.getStatusBarHeight());

      case 5:
        statusBarHeight = context$1$0.sent;
        return context$1$0.abrupt('return', {
          left: 0,
          top: statusBarHeight,
          width: windowSize.width,
          height: windowSize.height - statusBarHeight
        });

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands);
exports.commands = commands;
exports['default'] = extensions;

// android returns the upscaled window size, so to get the true size of the
// rect we have to downscale
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy92aWV3cG9ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzZCQUEwQixnQkFBZ0I7O0FBRzFDLElBQUksVUFBVSxHQUFHLEVBQUU7SUFBRSxRQUFRLEdBQUcsRUFBRSxDQUFDOzs7QUFHbkMsUUFBUSxDQUFDLGtCQUFrQixHQUFHO1lBQ3JCLFNBQVM7Ozs7Ozt5Q0FBVSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLCtCQUErQixLQUFLLEVBQUUsRUFBRSxDQUFDOzs7O0FBQTdGLGlCQUFTLFFBQVQsU0FBUzs0Q0FDVCxTQUFTOzs7Ozs7O0NBQ2pCLENBQUM7OztBQUdGLFFBQVEsQ0FBQyxtQkFBbUIsR0FBRzs7Ozs7eUNBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDOzs7Ozs7Ozs7O0NBQ3hGLENBQUM7O0FBRUYsUUFBUSxDQUFDLHFCQUFxQixHQUFHO01BQ3pCLFVBQVUsRUFDVixJQUFJOzs7Ozt5Q0FEZSxJQUFJLENBQUMsYUFBYSxFQUFFOzs7QUFBdkMsa0JBQVU7O3lDQUNHLElBQUksQ0FBQyxlQUFlLEVBQUU7OztBQUFuQyxZQUFJOzt5Q0FDRyx5QkFBVSxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQzs7Ozs7Ozs7OztDQUN6RCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxlQUFlLEdBQUc7TUFDbkIsVUFBVSxFQUNWLGVBQWU7Ozs7O3lDQURJLElBQUksQ0FBQyxhQUFhLEVBQUU7OztBQUF2QyxrQkFBVTs7eUNBQ2MsSUFBSSxDQUFDLGtCQUFrQixFQUFFOzs7QUFBakQsdUJBQWU7NENBR2Q7QUFDTCxjQUFJLEVBQUUsQ0FBQztBQUNQLGFBQUcsRUFBRSxlQUFlO0FBQ3BCLGVBQUssRUFBRSxVQUFVLENBQUMsS0FBSztBQUN2QixnQkFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLEdBQUcsZUFBZTtTQUM1Qzs7Ozs7OztDQUNGLENBQUM7O0FBRUYsZUFBYyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0IsUUFBUSxHQUFSLFFBQVE7cUJBQ0YsVUFBVSIsImZpbGUiOiJsaWIvY29tbWFuZHMvdmlld3BvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbWFnZVV0aWwgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5cblxubGV0IGV4dGVuc2lvbnMgPSB7fSwgY29tbWFuZHMgPSB7fTtcblxuLy8gbWVtb2l6ZWQgaW4gY29uc3RydWN0b3JcbmNvbW1hbmRzLmdldFN0YXR1c0JhckhlaWdodCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qge3N0YXR1c0Jhcn0gPSBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoYC9hcHBpdW0vZGV2aWNlL3N5c3RlbV9iYXJzYCwgJ0dFVCcsIHt9KTtcbiAgcmV0dXJuIHN0YXR1c0Jhcjtcbn07XG5cbi8vIG1lbW9pemVkIGluIGNvbnN0cnVjdG9yXG5jb21tYW5kcy5nZXREZXZpY2VQaXhlbFJhdGlvID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKCcvYXBwaXVtL2RldmljZS9waXhlbF9yYXRpbycsICdHRVQnLCB7fSk7XG59O1xuXG5jb21tYW5kcy5nZXRWaWV3cG9ydFNjcmVlbnNob3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNjcmVlbnNob3QgPSBhd2FpdCB0aGlzLmdldFNjcmVlbnNob3QoKTtcbiAgY29uc3QgcmVjdCA9IGF3YWl0IHRoaXMuZ2V0Vmlld1BvcnRSZWN0KCk7XG4gIHJldHVybiBhd2FpdCBpbWFnZVV0aWwuY3JvcEJhc2U2NEltYWdlKHNjcmVlbnNob3QsIHJlY3QpO1xufTtcblxuY29tbWFuZHMuZ2V0Vmlld1BvcnRSZWN0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBjb25zdCB3aW5kb3dTaXplID0gYXdhaXQgdGhpcy5nZXRXaW5kb3dTaXplKCk7XG4gIGNvbnN0IHN0YXR1c0JhckhlaWdodCA9IGF3YWl0IHRoaXMuZ2V0U3RhdHVzQmFySGVpZ2h0KCk7XG4gIC8vIGFuZHJvaWQgcmV0dXJucyB0aGUgdXBzY2FsZWQgd2luZG93IHNpemUsIHNvIHRvIGdldCB0aGUgdHJ1ZSBzaXplIG9mIHRoZVxuICAvLyByZWN0IHdlIGhhdmUgdG8gZG93bnNjYWxlXG4gIHJldHVybiB7XG4gICAgbGVmdDogMCxcbiAgICB0b3A6IHN0YXR1c0JhckhlaWdodCxcbiAgICB3aWR0aDogd2luZG93U2l6ZS53aWR0aCxcbiAgICBoZWlnaHQ6IHdpbmRvd1NpemUuaGVpZ2h0IC0gc3RhdHVzQmFySGVpZ2h0XG4gIH07XG59O1xuXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzKTtcbmV4cG9ydCB7IGNvbW1hbmRzIH07XG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
