'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _pngjs = require('pngjs');

var _desired = require('../desired');

var _helpersSession = require('../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;

describe('testViewportCommands', function () {
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.SCROLL_CAPS));

        case 2:
          driver = context$2$0.sent;

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!driver) {
            context$2$0.next = 3;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.quit());

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should get device pixel ratio, status bar height, and viewport rect', function callee$1$0() {
    var _ref, viewportRect, statBarHeight, pixelRatio;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.sessionCapabilities());

        case 2:
          _ref = context$2$0.sent;
          viewportRect = _ref.viewportRect;
          statBarHeight = _ref.statBarHeight;
          pixelRatio = _ref.pixelRatio;

          pixelRatio.should.exist;
          pixelRatio.should.not.equal(0);
          statBarHeight.should.exist;
          statBarHeight.should.not.equal(0);
          viewportRect.should.exist;
          viewportRect.left.should.exist;
          viewportRect.top.should.exist;
          viewportRect.width.should.exist;
          viewportRect.height.should.exist;

        case 15:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should get scrollable element', function callee$1$0() {
    var scrollableEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//*[@scrollable="true"]'));

        case 2:
          scrollableEl = context$2$0.sent;

          scrollableEl.should.exist;

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should get content size from scrollable element found as uiobject', function callee$1$0() {
    var scrollableEl, contentSize;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//*[@scrollable="true"]'));

        case 2:
          scrollableEl = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(scrollableEl.getAttribute("contentSize"));

        case 5:
          contentSize = context$2$0.sent;

          contentSize.should.exist;
          JSON.parse(contentSize).scrollableOffset.should.exist;

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should get content size from scrollable element found as uiobject2', function callee$1$0() {
    var scrollableEl, contentSize;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//android.widget.ScrollView'));

        case 2:
          scrollableEl = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(scrollableEl.getAttribute("contentSize"));

        case 5:
          contentSize = context$2$0.sent;

          contentSize.should.exist;
          JSON.parse(contentSize).scrollableOffset.should.exist;

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should get first element from scrollable element', function callee$1$0() {
    var scrollableEl, element;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//*[@scrollable="true"]'));

        case 2:
          scrollableEl = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(scrollableEl.elementByXPath('/*[@firstVisible="true"]'));

        case 5:
          element = context$2$0.sent;

          element.should.exist;

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should get a cropped screenshot of the viewport without statusbar', function callee$1$0() {
    var _ref2, viewportRect, statBarHeight, fullScreen, viewScreen, fullB64, viewB64, fullImg, viewImg;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!process.env.CI) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.sessionCapabilities());

        case 4:
          _ref2 = context$2$0.sent;
          viewportRect = _ref2.viewportRect;
          statBarHeight = _ref2.statBarHeight;
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.takeScreenshot());

        case 9:
          fullScreen = context$2$0.sent;
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(driver.execute("mobile: viewportScreenshot"));

        case 12:
          viewScreen = context$2$0.sent;
          fullB64 = Buffer.from(fullScreen, 'base64');
          viewB64 = Buffer.from(viewScreen, 'base64');
          fullImg = new _pngjs.PNG({ filterType: 4 });
          context$2$0.next = 18;
          return _regeneratorRuntime.awrap(_bluebird2['default'].promisify(fullImg.parse).call(fullImg, fullB64));

        case 18:
          viewImg = new _pngjs.PNG({ filterType: 4 });
          context$2$0.next = 21;
          return _regeneratorRuntime.awrap(_bluebird2['default'].promisify(viewImg.parse).call(viewImg, viewB64));

        case 21:
          viewportRect.top.should.eql(statBarHeight);
          viewImg.height.should.eql(viewportRect.height);
          viewImg.width.should.eql(fullImg.width);
          fullImg.height.should.be.above(viewImg.height);

        case 25:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// TODO: fails on CI with a `Does the current view have 'secure' flag set?` error
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy92aWV3cG9ydC1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozt3QkFDL0IsVUFBVTs7OztxQkFDSixPQUFPOzt1QkFDQyxZQUFZOzs4QkFDYixvQkFBb0I7O0FBRS9DLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQzs7QUFFWCxRQUFRLENBQUMsc0JBQXNCLEVBQUUsWUFBWTtBQUMzQyxRQUFNLENBQUM7Ozs7OzJDQUNVLHFEQUF1Qjs7O0FBQXRDLGdCQUFNOzs7Ozs7O0dBQ1AsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7O2VBQ0EsTUFBTTs7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7R0FFdEIsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyxxRUFBcUUsRUFBRTtjQUNqRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFVBQVU7Ozs7OzsyQ0FBVSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7Ozs7QUFBN0Usc0JBQVksUUFBWixZQUFZO0FBQUUsdUJBQWEsUUFBYixhQUFhO0FBQUUsb0JBQVUsUUFBVixVQUFVOztBQUM5QyxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDeEIsb0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQix1QkFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDM0IsdUJBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDMUIsc0JBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUMvQixzQkFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQzlCLHNCQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDaEMsc0JBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUNsQyxDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLCtCQUErQixFQUFFO1FBQzlCLFlBQVk7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQUM7OztBQUFyRSxzQkFBWTs7QUFDaEIsc0JBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0dBQzNCLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsbUVBQW1FLEVBQUU7UUFDbEUsWUFBWSxFQUNaLFdBQVc7Ozs7OzJDQURVLE1BQU0sQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQUM7OztBQUFyRSxzQkFBWTs7MkNBQ1EsWUFBWSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7OztBQUE1RCxxQkFBVzs7QUFDZixxQkFBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDekIsY0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0dBQ3ZELENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsb0VBQW9FLEVBQUU7UUFDbkUsWUFBWSxFQUNaLFdBQVc7Ozs7OzJDQURVLE1BQU0sQ0FBQyxjQUFjLENBQUMsNkJBQTZCLENBQUM7OztBQUF6RSxzQkFBWTs7MkNBQ1EsWUFBWSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7OztBQUE1RCxxQkFBVzs7QUFDZixxQkFBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDekIsY0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0dBQ3ZELENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsa0RBQWtELEVBQUU7UUFDakQsWUFBWSxFQUNaLE9BQU87Ozs7OzJDQURjLE1BQU0sQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQUM7OztBQUFyRSxzQkFBWTs7MkNBQ0ksWUFBWSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQzs7O0FBQXZFLGlCQUFPOztBQUNYLGlCQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUN0QixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLG1FQUFtRSxFQUFFO2VBSy9ELFlBQVksRUFBRSxhQUFhLEVBQzVCLFVBQVUsRUFDVixVQUFVLEVBQ1YsT0FBTyxFQUNQLE9BQU8sRUFDUCxPQUFPLEVBRVAsT0FBTzs7Ozs7ZUFWVCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Ozs7OzhDQUNULElBQUksQ0FBQyxJQUFJLEVBQUU7Ozs7MkNBRXdCLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTs7OztBQUFqRSxzQkFBWSxTQUFaLFlBQVk7QUFBRSx1QkFBYSxTQUFiLGFBQWE7OzJDQUNULE1BQU0sQ0FBQyxjQUFjLEVBQUU7OztBQUExQyxvQkFBVTs7MkNBQ1MsTUFBTSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQzs7O0FBQS9ELG9CQUFVO0FBQ1YsaUJBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7QUFDM0MsaUJBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7QUFDM0MsaUJBQU8sR0FBRyxlQUFRLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBQyxDQUFDOzsyQ0FDbEMsc0JBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQzs7O0FBQ2pELGlCQUFPLEdBQUcsZUFBUSxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUMsQ0FBQzs7MkNBQ2xDLHNCQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7OztBQUN2RCxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLGlCQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9DLGlCQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLGlCQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7OztHQUNoRCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL3ZpZXdwb3J0LWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgUE5HIH0gZnJvbSAncG5nanMnO1xuaW1wb3J0IHsgU0NST0xMX0NBUFMgfSBmcm9tICcuLi9kZXNpcmVkJztcbmltcG9ydCB7IGluaXREcml2ZXIgfSBmcm9tICcuLi9oZWxwZXJzL3Nlc3Npb24nO1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgZHJpdmVyO1xuXG5kZXNjcmliZSgndGVzdFZpZXdwb3J0Q29tbWFuZHMnLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihTQ1JPTExfQ0FQUyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRyaXZlcikge1xuICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZ2V0IGRldmljZSBwaXhlbCByYXRpbywgc3RhdHVzIGJhciBoZWlnaHQsIGFuZCB2aWV3cG9ydCByZWN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHt2aWV3cG9ydFJlY3QsIHN0YXRCYXJIZWlnaHQsIHBpeGVsUmF0aW99ID0gYXdhaXQgZHJpdmVyLnNlc3Npb25DYXBhYmlsaXRpZXMoKTtcbiAgICBwaXhlbFJhdGlvLnNob3VsZC5leGlzdDtcbiAgICBwaXhlbFJhdGlvLnNob3VsZC5ub3QuZXF1YWwoMCk7XG4gICAgc3RhdEJhckhlaWdodC5zaG91bGQuZXhpc3Q7XG4gICAgc3RhdEJhckhlaWdodC5zaG91bGQubm90LmVxdWFsKDApO1xuICAgIHZpZXdwb3J0UmVjdC5zaG91bGQuZXhpc3Q7XG4gICAgdmlld3BvcnRSZWN0LmxlZnQuc2hvdWxkLmV4aXN0O1xuICAgIHZpZXdwb3J0UmVjdC50b3Auc2hvdWxkLmV4aXN0O1xuICAgIHZpZXdwb3J0UmVjdC53aWR0aC5zaG91bGQuZXhpc3Q7XG4gICAgdmlld3BvcnRSZWN0LmhlaWdodC5zaG91bGQuZXhpc3Q7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZ2V0IHNjcm9sbGFibGUgZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2Nyb2xsYWJsZUVsID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRCeVhQYXRoKCcvLypbQHNjcm9sbGFibGU9XCJ0cnVlXCJdJyk7XG4gICAgc2Nyb2xsYWJsZUVsLnNob3VsZC5leGlzdDtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBnZXQgY29udGVudCBzaXplIGZyb20gc2Nyb2xsYWJsZSBlbGVtZW50IGZvdW5kIGFzIHVpb2JqZWN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBzY3JvbGxhYmxlRWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5WFBhdGgoJy8vKltAc2Nyb2xsYWJsZT1cInRydWVcIl0nKTtcbiAgICBsZXQgY29udGVudFNpemUgPSBhd2FpdCBzY3JvbGxhYmxlRWwuZ2V0QXR0cmlidXRlKFwiY29udGVudFNpemVcIik7XG4gICAgY29udGVudFNpemUuc2hvdWxkLmV4aXN0O1xuICAgIEpTT04ucGFyc2UoY29udGVudFNpemUpLnNjcm9sbGFibGVPZmZzZXQuc2hvdWxkLmV4aXN0O1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGdldCBjb250ZW50IHNpemUgZnJvbSBzY3JvbGxhYmxlIGVsZW1lbnQgZm91bmQgYXMgdWlvYmplY3QyJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBzY3JvbGxhYmxlRWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5WFBhdGgoJy8vYW5kcm9pZC53aWRnZXQuU2Nyb2xsVmlldycpO1xuICAgIGxldCBjb250ZW50U2l6ZSA9IGF3YWl0IHNjcm9sbGFibGVFbC5nZXRBdHRyaWJ1dGUoXCJjb250ZW50U2l6ZVwiKTtcbiAgICBjb250ZW50U2l6ZS5zaG91bGQuZXhpc3Q7XG4gICAgSlNPTi5wYXJzZShjb250ZW50U2l6ZSkuc2Nyb2xsYWJsZU9mZnNldC5zaG91bGQuZXhpc3Q7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZ2V0IGZpcnN0IGVsZW1lbnQgZnJvbSBzY3JvbGxhYmxlIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHNjcm9sbGFibGVFbCA9IGF3YWl0IGRyaXZlci5lbGVtZW50QnlYUGF0aCgnLy8qW0BzY3JvbGxhYmxlPVwidHJ1ZVwiXScpO1xuICAgIGxldCBlbGVtZW50ID0gYXdhaXQgc2Nyb2xsYWJsZUVsLmVsZW1lbnRCeVhQYXRoKCcvKltAZmlyc3RWaXNpYmxlPVwidHJ1ZVwiXScpO1xuICAgIGVsZW1lbnQuc2hvdWxkLmV4aXN0O1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGdldCBhIGNyb3BwZWQgc2NyZWVuc2hvdCBvZiB0aGUgdmlld3BvcnQgd2l0aG91dCBzdGF0dXNiYXInLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVE9ETzogZmFpbHMgb24gQ0kgd2l0aCBhIGBEb2VzIHRoZSBjdXJyZW50IHZpZXcgaGF2ZSAnc2VjdXJlJyBmbGFnIHNldD9gIGVycm9yXG4gICAgaWYgKHByb2Nlc3MuZW52LkNJKSB7XG4gICAgICByZXR1cm4gdGhpcy5za2lwKCk7XG4gICAgfVxuICAgIGNvbnN0IHt2aWV3cG9ydFJlY3QsIHN0YXRCYXJIZWlnaHR9ID0gYXdhaXQgZHJpdmVyLnNlc3Npb25DYXBhYmlsaXRpZXMoKTtcbiAgICBjb25zdCBmdWxsU2NyZWVuID0gYXdhaXQgZHJpdmVyLnRha2VTY3JlZW5zaG90KCk7XG4gICAgY29uc3Qgdmlld1NjcmVlbiA9IGF3YWl0IGRyaXZlci5leGVjdXRlKFwibW9iaWxlOiB2aWV3cG9ydFNjcmVlbnNob3RcIik7XG4gICAgY29uc3QgZnVsbEI2NCA9IEJ1ZmZlci5mcm9tKGZ1bGxTY3JlZW4sICdiYXNlNjQnKTtcbiAgICBjb25zdCB2aWV3QjY0ID0gQnVmZmVyLmZyb20odmlld1NjcmVlbiwgJ2Jhc2U2NCcpO1xuICAgIGNvbnN0IGZ1bGxJbWcgPSBuZXcgUE5HKHtmaWx0ZXJUeXBlOiA0fSk7XG4gICAgYXdhaXQgQi5wcm9taXNpZnkoZnVsbEltZy5wYXJzZSkuY2FsbChmdWxsSW1nLCBmdWxsQjY0KTtcbiAgICBjb25zdCB2aWV3SW1nID0gbmV3IFBORyh7ZmlsdGVyVHlwZTogNH0pO1xuICAgIGF3YWl0IEIucHJvbWlzaWZ5KHZpZXdJbWcucGFyc2UpLmNhbGwodmlld0ltZywgdmlld0I2NCk7XG4gICAgdmlld3BvcnRSZWN0LnRvcC5zaG91bGQuZXFsKHN0YXRCYXJIZWlnaHQpO1xuICAgIHZpZXdJbWcuaGVpZ2h0LnNob3VsZC5lcWwodmlld3BvcnRSZWN0LmhlaWdodCk7XG4gICAgdmlld0ltZy53aWR0aC5zaG91bGQuZXFsKGZ1bGxJbWcud2lkdGgpO1xuICAgIGZ1bGxJbWcuaGVpZ2h0LnNob3VsZC5iZS5hYm92ZSh2aWV3SW1nLmhlaWdodCk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
