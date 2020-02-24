'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumAndroidDriver = require('appium-android-driver');

var uiautomatorCapConstraints = {
  app: {
    presence: true,
    isString: true
  },
  automationName: {
    isString: true
  },
  browserName: {
    isString: true
  },
  launchTimeout: {
    isNumber: true
  },
  skipUnlock: {
    isBoolean: true
  },
  uiautomator2ServerLaunchTimeout: {
    isNumber: true
  },
  uiautomator2ServerInstallTimeout: {
    isNumber: true
  },
  disableWindowAnimation: {
    isBoolean: true
  },
  systemPort: {
    isNumber: true
  },
  mjpegScreenshotUrl: {
    isString: true
  }
};

var desiredCapConstraints = {};
_Object$assign(desiredCapConstraints, uiautomatorCapConstraints, _appiumAndroidDriver.commonCapConstraints);

exports['default'] = desiredCapConstraints;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kZXNpcmVkLWNhcHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7bUNBQXFDLHVCQUF1Qjs7QUFFNUQsSUFBSSx5QkFBeUIsR0FBRztBQUM5QixLQUFHLEVBQUU7QUFDSCxZQUFRLEVBQUUsSUFBSTtBQUNkLFlBQVEsRUFBRSxJQUFJO0dBQ2Y7QUFDRCxnQkFBYyxFQUFFO0FBQ2QsWUFBUSxFQUFFLElBQUk7R0FDZjtBQUNELGFBQVcsRUFBRTtBQUNYLFlBQVEsRUFBRSxJQUFJO0dBQ2Y7QUFDRCxlQUFhLEVBQUU7QUFDYixZQUFRLEVBQUUsSUFBSTtHQUNmO0FBQ0QsWUFBVSxFQUFFO0FBQ1YsYUFBUyxFQUFFLElBQUk7R0FDaEI7QUFDRCxpQ0FBK0IsRUFBRTtBQUMvQixZQUFRLEVBQUUsSUFBSTtHQUNmO0FBQ0Qsa0NBQWdDLEVBQUU7QUFDaEMsWUFBUSxFQUFFLElBQUk7R0FDZjtBQUNELHdCQUFzQixFQUFFO0FBQ3RCLGFBQVMsRUFBRSxJQUFJO0dBQ2hCO0FBQ0QsWUFBVSxFQUFFO0FBQ1YsWUFBUSxFQUFFLElBQUk7R0FDZjtBQUNELG9CQUFrQixFQUFFO0FBQ2xCLFlBQVEsRUFBRSxJQUFJO0dBQ2Y7Q0FDRixDQUFDOztBQUVGLElBQUkscUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBQy9CLGVBQWMscUJBQXFCLEVBQUUseUJBQXlCLDRDQUMzQixDQUFDOztxQkFFckIscUJBQXFCIiwiZmlsZSI6ImxpYi9kZXNpcmVkLWNhcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21tb25DYXBDb25zdHJhaW50cyB9IGZyb20gJ2FwcGl1bS1hbmRyb2lkLWRyaXZlcic7XG5cbmxldCB1aWF1dG9tYXRvckNhcENvbnN0cmFpbnRzID0ge1xuICBhcHA6IHtcbiAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICBpc1N0cmluZzogdHJ1ZSxcbiAgfSxcbiAgYXV0b21hdGlvbk5hbWU6IHtcbiAgICBpc1N0cmluZzogdHJ1ZSxcbiAgfSxcbiAgYnJvd3Nlck5hbWU6IHtcbiAgICBpc1N0cmluZzogdHJ1ZVxuICB9LFxuICBsYXVuY2hUaW1lb3V0OiB7XG4gICAgaXNOdW1iZXI6IHRydWVcbiAgfSxcbiAgc2tpcFVubG9jazoge1xuICAgIGlzQm9vbGVhbjogdHJ1ZVxuICB9LFxuICB1aWF1dG9tYXRvcjJTZXJ2ZXJMYXVuY2hUaW1lb3V0OiB7XG4gICAgaXNOdW1iZXI6IHRydWVcbiAgfSxcbiAgdWlhdXRvbWF0b3IyU2VydmVySW5zdGFsbFRpbWVvdXQ6IHtcbiAgICBpc051bWJlcjogdHJ1ZVxuICB9LFxuICBkaXNhYmxlV2luZG93QW5pbWF0aW9uOiB7XG4gICAgaXNCb29sZWFuOiB0cnVlXG4gIH0sXG4gIHN5c3RlbVBvcnQ6IHtcbiAgICBpc051bWJlcjogdHJ1ZVxuICB9LFxuICBtanBlZ1NjcmVlbnNob3RVcmw6IHtcbiAgICBpc1N0cmluZzogdHJ1ZSxcbiAgfSxcbn07XG5cbmxldCBkZXNpcmVkQ2FwQ29uc3RyYWludHMgPSB7fTtcbk9iamVjdC5hc3NpZ24oZGVzaXJlZENhcENvbnN0cmFpbnRzLCB1aWF1dG9tYXRvckNhcENvbnN0cmFpbnRzLFxuICAgICAgICAgICAgICBjb21tb25DYXBDb25zdHJhaW50cyk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlc2lyZWRDYXBDb25zdHJhaW50cztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
