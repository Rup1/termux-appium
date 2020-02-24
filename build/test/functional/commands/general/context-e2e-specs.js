'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.WebView1',
  showChromedriverLog: true
}, _desired.APIDEMOS_CAPS);

var WEBVIEW = 'WEBVIEW_io.appium.android.apis';
var NATIVE = 'NATIVE_APP';
var NATIVE_LOCATOR = "//*[@class='android.widget.TextView']";
var WEBVIEW_LOCATOR = "//*[text()='This page is a Selenium sandbox']";

describe('apidemo - context @skip-ci', function () {
  describe('general', function () {
    var driver = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(caps));

          case 2:
            driver = context$3$0.sent;

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.quit());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should find webview context', function callee$2$0() {
      var contexts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.contexts());

          case 2:
            contexts = context$3$0.sent;

            contexts.length.should.be.at.least(2);

            // make sure the process was found, otherwise it comes out as "undefined"
            contexts.join('').should.not.include('undefined');
            contexts.join('').should.include(WEBVIEW);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should go into the webview', function callee$2$0() {
      var contexts;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // TODO: Fix this on TestObject. Chromedriver does not exist error
            if (process.env.TESTOBJECT_E2E_TESTS) {
              this.skip();
            }
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.contexts());

          case 3:
            contexts = context$3$0.sent;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.context(contexts[1]));

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to go into native context and interact with it after restarting app', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.closeApp());

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.launchApp());

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.context(NATIVE));

          case 6:
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.elementByXPath(NATIVE_LOCATOR));

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to go into native context and interact with it after resetting app', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.resetApp());

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.context(NATIVE));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.elementByXPath(NATIVE_LOCATOR));

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to go into webview context and interact with it after restarting app', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // TODO: Fix this on TestObject. Chromedriver does not exist error
            if (process.env.TESTOBJECT_E2E_TESTS) {
              this.skip();
            }
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.closeApp());

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.launchApp());

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.context(WEBVIEW));

          case 7:
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.elementByXPath(WEBVIEW_LOCATOR));

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to go into webview context and interact with it after resetting app', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // TODO: Fix this on TestObject. Chromedriver does not exist error
            if (process.env.TESTOBJECT_E2E_TESTS) {
              this.skip();
            }
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.resetApp());

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.context(WEBVIEW));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.elementByXPath(WEBVIEW_LOCATOR));

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('autoWebview', function () {
    var driver = undefined;
    afterEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.quit());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should enter into the webview', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, caps, {
              autoWebview: true,
              autoWebviewTimeout: 20000
            })));

          case 2:
            driver = context$3$0.sent;

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL2NvbnRleHQtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozt1QkFDZixlQUFlOzs4QkFDbEIsdUJBQXVCOztzQkFDcEMsUUFBUTs7OztBQUd0QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0sSUFBSSxHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUN0QixZQUFVLEVBQUUsd0JBQXdCO0FBQ3BDLGFBQVcsRUFBRSxnQkFBZ0I7QUFDN0IscUJBQW1CLEVBQUUsSUFBSTtDQUMxQix5QkFBZ0IsQ0FBQzs7QUFFbEIsSUFBTSxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7QUFDakQsSUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDO0FBQzVCLElBQU0sY0FBYyxHQUFHLHVDQUF1QyxDQUFDO0FBQy9ELElBQU0sZUFBZSxHQUFHLCtDQUErQyxDQUFDOztBQUV4RSxRQUFRLENBQUMsNEJBQTRCLEVBQUUsWUFBWTtBQUNqRCxVQUFRLENBQUMsU0FBUyxFQUFFLFlBQVk7QUFDOUIsUUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFVBQU0sQ0FBQzs7Ozs7NkNBQ1UsZ0NBQVcsSUFBSSxDQUFDOzs7QUFBL0Isa0JBQU07Ozs7Ozs7S0FDUCxDQUFDLENBQUM7QUFDSCxTQUFLLENBQUM7Ozs7OzZDQUNFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLDZCQUE2QixFQUFFO1VBQzVCLFFBQVE7Ozs7OzZDQUFTLE1BQU0sQ0FBQyxRQUFRLEVBQUU7OztBQUFsQyxvQkFBUTs7QUFDWixvQkFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUd0QyxvQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsRCxvQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7O0tBQzNDLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyw0QkFBNEIsRUFBRTtVQUszQixRQUFROzs7OztBQUhaLGdCQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUU7QUFDcEMsa0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNiOzs2Q0FDb0IsTUFBTSxDQUFDLFFBQVEsRUFBRTs7O0FBQWxDLG9CQUFROzs2Q0FDTixNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztLQUNsQyxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsb0ZBQW9GLEVBQUU7Ozs7OzZDQUNqRixNQUFNLENBQUMsUUFBUSxFQUFFOzs7OzZDQUNqQixNQUFNLENBQUMsU0FBUyxFQUFFOzs7OzZDQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7Ozs2Q0FDdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7Ozs7Ozs7S0FDNUMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG1GQUFtRixFQUFFOzs7Ozs2Q0FDaEYsTUFBTSxDQUFDLFFBQVEsRUFBRTs7Ozs2Q0FDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Ozs7NkNBQ3RCLE1BQU0sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDOzs7Ozs7O0tBQzVDLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxxRkFBcUYsRUFBRTs7Ozs7QUFFeEYsZ0JBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTtBQUNwQyxrQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2I7OzZDQUNLLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Ozs7NkNBQ2pCLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Ozs7NkNBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDOzs7OzZDQUN2QixNQUFNLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQzs7Ozs7OztLQUM3QyxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsb0ZBQW9GLEVBQUU7Ozs7O0FBRXZGLGdCQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUU7QUFDcEMsa0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNiOzs2Q0FDSyxNQUFNLENBQUMsUUFBUSxFQUFFOzs7OzZDQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzs7Ozs2Q0FDdkIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUM7Ozs7Ozs7S0FDN0MsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILFVBQVEsQ0FBQyxhQUFhLEVBQUUsWUFBWTtBQUNsQyxRQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsYUFBUyxDQUFDOzs7Ozs2Q0FDRixNQUFNLENBQUMsSUFBSSxFQUFFOzs7Ozs7O0tBQ3BCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQywrQkFBK0IsRUFBRTs7Ozs7NkNBQ25CLGdDQUFXLGVBQWMsRUFBRSxFQUFFLElBQUksRUFBRTtBQUNoRCx5QkFBVyxFQUFFLElBQUk7QUFDakIsZ0NBQWtCLEVBQUUsS0FBSzthQUMxQixDQUFDLENBQUM7OztBQUhILGtCQUFNOzs7Ozs7O0tBSVAsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL2NvbnRleHQtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBBUElERU1PU19DQVBTIH0gZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5pbXBvcnQgeyBpbml0RHJpdmVyIH0gZnJvbSAnLi4vLi4vaGVscGVycy9zZXNzaW9uJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuY29uc3QgY2FwcyA9IF8uZGVmYXVsdHMoe1xuICBhcHBQYWNrYWdlOiAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsXG4gIGFwcEFjdGl2aXR5OiAnLnZpZXcuV2ViVmlldzEnLFxuICBzaG93Q2hyb21lZHJpdmVyTG9nOiB0cnVlLFxufSwgQVBJREVNT1NfQ0FQUyk7XG5cbmNvbnN0IFdFQlZJRVcgPSAnV0VCVklFV19pby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbmNvbnN0IE5BVElWRSA9ICdOQVRJVkVfQVBQJztcbmNvbnN0IE5BVElWRV9MT0NBVE9SID0gXCIvLypbQGNsYXNzPSdhbmRyb2lkLndpZGdldC5UZXh0VmlldyddXCI7XG5jb25zdCBXRUJWSUVXX0xPQ0FUT1IgPSBcIi8vKlt0ZXh0KCk9J1RoaXMgcGFnZSBpcyBhIFNlbGVuaXVtIHNhbmRib3gnXVwiO1xuXG5kZXNjcmliZSgnYXBpZGVtbyAtIGNvbnRleHQgQHNraXAtY2knLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKCdnZW5lcmFsJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBkcml2ZXI7XG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlciA9IGF3YWl0IGluaXREcml2ZXIoY2Fwcyk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGZpbmQgd2VidmlldyBjb250ZXh0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGNvbnRleHRzID0gYXdhaXQgZHJpdmVyLmNvbnRleHRzKCk7XG4gICAgICBjb250ZXh0cy5sZW5ndGguc2hvdWxkLmJlLmF0LmxlYXN0KDIpO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgdGhlIHByb2Nlc3Mgd2FzIGZvdW5kLCBvdGhlcndpc2UgaXQgY29tZXMgb3V0IGFzIFwidW5kZWZpbmVkXCJcbiAgICAgIGNvbnRleHRzLmpvaW4oJycpLnNob3VsZC5ub3QuaW5jbHVkZSgndW5kZWZpbmVkJyk7XG4gICAgICBjb250ZXh0cy5qb2luKCcnKS5zaG91bGQuaW5jbHVkZShXRUJWSUVXKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdvIGludG8gdGhlIHdlYnZpZXcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBUT0RPOiBGaXggdGhpcyBvbiBUZXN0T2JqZWN0LiBDaHJvbWVkcml2ZXIgZG9lcyBub3QgZXhpc3QgZXJyb3JcbiAgICAgIGlmIChwcm9jZXNzLmVudi5URVNUT0JKRUNUX0UyRV9URVNUUykge1xuICAgICAgICB0aGlzLnNraXAoKTtcbiAgICAgIH1cbiAgICAgIGxldCBjb250ZXh0cyA9IGF3YWl0IGRyaXZlci5jb250ZXh0cygpO1xuICAgICAgYXdhaXQgZHJpdmVyLmNvbnRleHQoY29udGV4dHNbMV0pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBnbyBpbnRvIG5hdGl2ZSBjb250ZXh0IGFuZCBpbnRlcmFjdCB3aXRoIGl0IGFmdGVyIHJlc3RhcnRpbmcgYXBwJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLmNsb3NlQXBwKCk7XG4gICAgICBhd2FpdCBkcml2ZXIubGF1bmNoQXBwKCk7XG4gICAgICBhd2FpdCBkcml2ZXIuY29udGV4dChOQVRJVkUpO1xuICAgICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRCeVhQYXRoKE5BVElWRV9MT0NBVE9SKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ28gaW50byBuYXRpdmUgY29udGV4dCBhbmQgaW50ZXJhY3Qgd2l0aCBpdCBhZnRlciByZXNldHRpbmcgYXBwJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnJlc2V0QXBwKCk7XG4gICAgICBhd2FpdCBkcml2ZXIuY29udGV4dChOQVRJVkUpO1xuICAgICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRCeVhQYXRoKE5BVElWRV9MT0NBVE9SKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ28gaW50byB3ZWJ2aWV3IGNvbnRleHQgYW5kIGludGVyYWN0IHdpdGggaXQgYWZ0ZXIgcmVzdGFydGluZyBhcHAnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBUT0RPOiBGaXggdGhpcyBvbiBUZXN0T2JqZWN0LiBDaHJvbWVkcml2ZXIgZG9lcyBub3QgZXhpc3QgZXJyb3JcbiAgICAgIGlmIChwcm9jZXNzLmVudi5URVNUT0JKRUNUX0UyRV9URVNUUykge1xuICAgICAgICB0aGlzLnNraXAoKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGRyaXZlci5jbG9zZUFwcCgpO1xuICAgICAgYXdhaXQgZHJpdmVyLmxhdW5jaEFwcCgpO1xuICAgICAgYXdhaXQgZHJpdmVyLmNvbnRleHQoV0VCVklFVyk7XG4gICAgICBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5WFBhdGgoV0VCVklFV19MT0NBVE9SKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ28gaW50byB3ZWJ2aWV3IGNvbnRleHQgYW5kIGludGVyYWN0IHdpdGggaXQgYWZ0ZXIgcmVzZXR0aW5nIGFwcCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFRPRE86IEZpeCB0aGlzIG9uIFRlc3RPYmplY3QuIENocm9tZWRyaXZlciBkb2VzIG5vdCBleGlzdCBlcnJvclxuICAgICAgaWYgKHByb2Nlc3MuZW52LlRFU1RPQkpFQ1RfRTJFX1RFU1RTKSB7XG4gICAgICAgIHRoaXMuc2tpcCgpO1xuICAgICAgfVxuICAgICAgYXdhaXQgZHJpdmVyLnJlc2V0QXBwKCk7XG4gICAgICBhd2FpdCBkcml2ZXIuY29udGV4dChXRUJWSUVXKTtcbiAgICAgIGF3YWl0IGRyaXZlci5lbGVtZW50QnlYUGF0aChXRUJWSUVXX0xPQ0FUT1IpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnYXV0b1dlYnZpZXcnLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGRyaXZlcjtcbiAgICBhZnRlckVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGVudGVyIGludG8gdGhlIHdlYnZpZXcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKE9iamVjdC5hc3NpZ24oe30sIGNhcHMsIHtcbiAgICAgICAgYXV0b1dlYnZpZXc6IHRydWUsXG4gICAgICAgIGF1dG9XZWJ2aWV3VGltZW91dDogMjAwMDAsXG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
