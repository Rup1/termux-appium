'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _ = require('../../..');

var _libLogger = require('../../../lib/logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

var _wd = require('wd');

var _wd2 = _interopRequireDefault(_wd);

function initDriver(caps, adbPort) {
  var adb, driver, okBtn;
  return _regeneratorRuntime.async(function initDriver$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!process.env.TRAVIS) {
          context$1$0.next = 13;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB({ adbPort: adbPort }));

      case 3:
        adb = context$1$0.sent;
        context$1$0.prev = 4;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(adb.forceStop('com.android.inputmethod.latin'));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(adb.shell(['pm', 'clear', 'com.android.inputmethod.latin']));

      case 9:
        context$1$0.next = 13;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](4);

      case 13:

        // Create a WD driver
        _libLogger2['default'].debug('Starting session on ' + _.DEFAULT_HOST + ':' + _.DEFAULT_PORT);
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(_wd2['default'].promiseChainRemote(_.DEFAULT_HOST, _.DEFAULT_PORT));

      case 16:
        driver = context$1$0.sent;
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(driver.init(caps));

      case 19:
        if (!process.env.CI) {
          context$1$0.next = 36;
          break;
        }

        context$1$0.prev = 20;
        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(driver.elementById('android:id/button1'));

      case 23:
        okBtn = context$1$0.sent;

        _libLogger2['default'].warn('*******************************************************');
        _libLogger2['default'].warn('*******************************************************');
        _libLogger2['default'].warn('*******************************************************');
        _libLogger2['default'].warn('Alert found on session startup. Trying to dismiss alert');
        context$1$0.next = 30;
        return _regeneratorRuntime.awrap(okBtn.click());

      case 30:
        context$1$0.next = 32;
        return _regeneratorRuntime.awrap(driver.startActivity(caps));

      case 32:
        context$1$0.next = 36;
        break;

      case 34:
        context$1$0.prev = 34;
        context$1$0.t1 = context$1$0['catch'](20);

      case 36:
        return context$1$0.abrupt('return', driver);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 11], [20, 34]]);
}

exports.initDriver = initDriver;

// on Travis, sometimes we get the keyboard dying and the screen stuck

// In Travis, there is sometimes a popup
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9oZWxwZXJzL3Nlc3Npb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozt5QkFBZ0IsWUFBWTs7OztnQkFDZSxVQUFVOzt5QkFDbEMscUJBQXFCOzs7O2tCQUN6QixJQUFJOzs7O0FBR25CLFNBQWUsVUFBVSxDQUFFLElBQUksRUFBRSxPQUFPO01BRWhDLEdBQUcsRUFVTCxNQUFNLEVBTUEsS0FBSzs7OzthQWpCWCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU07Ozs7Ozt5Q0FDSix1QkFBSSxTQUFTLENBQUMsRUFBQyxPQUFPLEVBQVAsT0FBTyxFQUFDLENBQUM7OztBQUFwQyxXQUFHOzs7eUNBR0MsR0FBRyxDQUFDLFNBQVMsQ0FBQywrQkFBK0IsQ0FBQzs7Ozt5Q0FDOUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsK0JBQStCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUtyRSwrQkFBTyxLQUFLLGdFQUF1RCxDQUFDOzt5Q0FDakQsZ0JBQUcsa0JBQWtCLGdDQUE0Qjs7O0FBQWhFLGNBQU07O3lDQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7YUFHbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzs7Ozs7O3lDQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7OztBQUF0RCxhQUFLOztBQUNYLCtCQUFPLElBQUksQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0FBQ3ZFLCtCQUFPLElBQUksQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0FBQ3ZFLCtCQUFPLElBQUksQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0FBQ3ZFLCtCQUFPLElBQUksQ0FBQyx5REFBeUQsQ0FBQyxDQUFDOzt5Q0FDakUsS0FBSyxDQUFDLEtBQUssRUFBRTs7Ozt5Q0FDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7NENBSTdCLE1BQU07Ozs7Ozs7Q0FDZDs7UUFFUSxVQUFVLEdBQVYsVUFBVSIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvaGVscGVycy9zZXNzaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCB7IERFRkFVTFRfSE9TVCwgREVGQVVMVF9QT1JUIH0gZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi8uLi8uLi9saWIvbG9nZ2VyJztcbmltcG9ydCB3ZCBmcm9tICd3ZCc7XG5cblxuYXN5bmMgZnVuY3Rpb24gaW5pdERyaXZlciAoY2FwcywgYWRiUG9ydCkge1xuICBpZiAocHJvY2Vzcy5lbnYuVFJBVklTKSB7XG4gICAgbGV0IGFkYiA9IGF3YWl0IEFEQi5jcmVhdGVBREIoe2FkYlBvcnR9KTtcbiAgICB0cnkge1xuICAgICAgLy8gb24gVHJhdmlzLCBzb21ldGltZXMgd2UgZ2V0IHRoZSBrZXlib2FyZCBkeWluZyBhbmQgdGhlIHNjcmVlbiBzdHVja1xuICAgICAgYXdhaXQgYWRiLmZvcmNlU3RvcCgnY29tLmFuZHJvaWQuaW5wdXRtZXRob2QubGF0aW4nKTtcbiAgICAgIGF3YWl0IGFkYi5zaGVsbChbJ3BtJywgJ2NsZWFyJywgJ2NvbS5hbmRyb2lkLmlucHV0bWV0aG9kLmxhdGluJ10pO1xuICAgIH0gY2F0Y2ggKGlnbikge31cbiAgfVxuXG4gIC8vIENyZWF0ZSBhIFdEIGRyaXZlclxuICBsb2dnZXIuZGVidWcoYFN0YXJ0aW5nIHNlc3Npb24gb24gJHtERUZBVUxUX0hPU1R9OiR7REVGQVVMVF9QT1JUfWApO1xuICBsZXQgZHJpdmVyID0gYXdhaXQgd2QucHJvbWlzZUNoYWluUmVtb3RlKERFRkFVTFRfSE9TVCwgREVGQVVMVF9QT1JUKTtcbiAgYXdhaXQgZHJpdmVyLmluaXQoY2Fwcyk7XG5cbiAgLy8gSW4gVHJhdmlzLCB0aGVyZSBpcyBzb21ldGltZXMgYSBwb3B1cFxuICBpZiAocHJvY2Vzcy5lbnYuQ0kpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgb2tCdG4gPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5SWQoJ2FuZHJvaWQ6aWQvYnV0dG9uMScpO1xuICAgICAgbG9nZ2VyLndhcm4oJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKTtcbiAgICAgIGxvZ2dlci53YXJuKCcqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XG4gICAgICBsb2dnZXIud2FybignKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKicpO1xuICAgICAgbG9nZ2VyLndhcm4oJ0FsZXJ0IGZvdW5kIG9uIHNlc3Npb24gc3RhcnR1cC4gVHJ5aW5nIHRvIGRpc21pc3MgYWxlcnQnKTtcbiAgICAgIGF3YWl0IG9rQnRuLmNsaWNrKCk7XG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShjYXBzKTtcbiAgICB9IGNhdGNoIChpZ24pIHt9XG4gIH1cblxuICByZXR1cm4gZHJpdmVyO1xufVxuXG5leHBvcnQgeyBpbml0RHJpdmVyIH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
