'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumSupport = require('appium-support');

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var MJPEG_SERVER_PORT = 8589;
var MJPEG_SERVER_URL = 'http://localhost:' + MJPEG_SERVER_PORT;

describe('screenshot - mjpeg server', function () {
  var driver = undefined,
      mjpegServer = undefined;

  before(function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mjpegServer = _appiumSupport.mjpeg.initMJpegServer(MJPEG_SERVER_PORT);
          caps = _extends({}, _desired.APIDEMOS_CAPS, { mjpegScreenshotUrl: MJPEG_SERVER_URL });
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(caps));

        case 4:
          driver = context$2$0.sent;

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.quit());

        case 2:
          mjpegServer.close();

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should get the screenshot via an mjpeg server if requested', function callee$1$0() {
    var img;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.takeScreenshot());

        case 2:
          img = context$2$0.sent;

          img.indexOf('iVBOR').should.eql(0);
          img.length.should.be.above(400);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL3NjcmVlbnNob3QtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozs2QkFDdkIsZ0JBQWdCOzt1QkFDUixlQUFlOzs4QkFDbEIsdUJBQXVCOztBQUdsRCxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQy9CLElBQU0sZ0JBQWdCLHlCQUF1QixpQkFBaUIsQUFBRSxDQUFDOztBQUVqRSxRQUFRLENBQUMsMkJBQTJCLEVBQUUsWUFBWTtBQUNoRCxNQUFJLE1BQU0sWUFBQTtNQUFFLFdBQVcsWUFBQSxDQUFDOztBQUV4QixRQUFNLENBQUM7UUFFQyxJQUFJOzs7O0FBRFYscUJBQVcsR0FBRyxxQkFBTSxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNqRCxjQUFJLDBDQUFzQixrQkFBa0IsRUFBRSxnQkFBZ0I7OzJDQUNyRCxnQ0FBVyxJQUFJLENBQUM7OztBQUEvQixnQkFBTTs7Ozs7OztHQUNQLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLElBQUksRUFBRTs7O0FBQ25CLHFCQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7Ozs7Ozs7R0FDckIsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDREQUE0RCxFQUFFO1FBQ3pELEdBQUc7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxjQUFjLEVBQUU7OztBQUFuQyxhQUFHOztBQUNULGFBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxhQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZ2VuZXJhbC9zY3JlZW5zaG90LWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHsgbWpwZWcgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyBBUElERU1PU19DQVBTIH0gZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5pbXBvcnQgeyBpbml0RHJpdmVyIH0gZnJvbSAnLi4vLi4vaGVscGVycy9zZXNzaW9uJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCBNSlBFR19TRVJWRVJfUE9SVCA9IDg1ODk7XG5jb25zdCBNSlBFR19TRVJWRVJfVVJMID0gYGh0dHA6Ly9sb2NhbGhvc3Q6JHtNSlBFR19TRVJWRVJfUE9SVH1gO1xuXG5kZXNjcmliZSgnc2NyZWVuc2hvdCAtIG1qcGVnIHNlcnZlcicsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlciwgbWpwZWdTZXJ2ZXI7XG5cbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBtanBlZ1NlcnZlciA9IG1qcGVnLmluaXRNSnBlZ1NlcnZlcihNSlBFR19TRVJWRVJfUE9SVCk7XG4gICAgY29uc3QgY2FwcyA9IHsuLi5BUElERU1PU19DQVBTLCBtanBlZ1NjcmVlbnNob3RVcmw6IE1KUEVHX1NFUlZFUl9VUkx9O1xuICAgIGRyaXZlciA9IGF3YWl0IGluaXREcml2ZXIoY2Fwcyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICBtanBlZ1NlcnZlci5jbG9zZSgpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBnZXQgdGhlIHNjcmVlbnNob3QgdmlhIGFuIG1qcGVnIHNlcnZlciBpZiByZXF1ZXN0ZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaW1nID0gYXdhaXQgZHJpdmVyLnRha2VTY3JlZW5zaG90KCk7XG4gICAgaW1nLmluZGV4T2YoJ2lWQk9SJykuc2hvdWxkLmVxbCgwKTtcbiAgICBpbWcubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSg0MDApO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
