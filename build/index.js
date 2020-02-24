require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _asyncbox = require('asyncbox');

var _libDriver = require('./lib/driver');

var _libDriver2 = _interopRequireDefault(_libDriver);

var _libServer = require('./lib/server');

var _libServer2 = _interopRequireDefault(_libServer);

var DEFAULT_HOST = "localhost";
exports.DEFAULT_HOST = DEFAULT_HOST;
var DEFAULT_PORT = process.env.TESTOBJECT_E2E_TESTS ? 4723 : 4884;

exports.DEFAULT_PORT = DEFAULT_PORT;
function main() {
  var port, host;
  return _regeneratorRuntime.async(function main$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        port = DEFAULT_PORT;
        host = DEFAULT_HOST;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _libServer2['default'])(port, host));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

if (require.main === module) {
  (0, _asyncbox.asyncify)(main);
}

exports.AndroidUiautomator2Driver = _libDriver2['default'];
exports.startServer = _libServer2['default'];
exports['default'] = _libDriver2['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt3QkFFeUIsVUFBVTs7eUJBQ0csY0FBYzs7Ozt5QkFDNUIsY0FBYzs7OztBQUcvQixJQUFNLFlBQVksR0FBRyxXQUFXLENBQUM7O0FBQ2pDLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQzs7O0FBRTNFLFNBQWUsSUFBSTtNQUNiLElBQUksRUFDSixJQUFJOzs7O0FBREosWUFBSSxHQUFHLFlBQVk7QUFDbkIsWUFBSSxHQUFHLFlBQVk7O3lDQUNWLDRCQUFZLElBQUksRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7Q0FDckM7O0FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtBQUMzQiwwQkFBUyxJQUFJLENBQUMsQ0FBQztDQUNoQjs7UUFFUSx5QkFBeUI7UUFBRSxXQUFXIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1haW5cblxuaW1wb3J0IHsgYXN5bmNpZnkgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlciBmcm9tICcuL2xpYi9kcml2ZXInO1xuaW1wb3J0IHN0YXJ0U2VydmVyIGZyb20gJy4vbGliL3NlcnZlcic7XG5cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfSE9TVCA9IFwibG9jYWxob3N0XCI7XG5leHBvcnQgY29uc3QgREVGQVVMVF9QT1JUID0gcHJvY2Vzcy5lbnYuVEVTVE9CSkVDVF9FMkVfVEVTVFMgPyA0NzIzIDogNDg4NDtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbiAoKSB7XG4gIGxldCBwb3J0ID0gREVGQVVMVF9QT1JUO1xuICBsZXQgaG9zdCA9IERFRkFVTFRfSE9TVDtcbiAgcmV0dXJuIGF3YWl0IHN0YXJ0U2VydmVyKHBvcnQsIGhvc3QpO1xufVxuXG5pZiAocmVxdWlyZS5tYWluID09PSBtb2R1bGUpIHtcbiAgYXN5bmNpZnkobWFpbik7XG59XG5cbmV4cG9ydCB7IEFuZHJvaWRVaWF1dG9tYXRvcjJEcml2ZXIsIHN0YXJ0U2VydmVyIH07XG5leHBvcnQgZGVmYXVsdCBBbmRyb2lkVWlhdXRvbWF0b3IyRHJpdmVyO1xuXG4iXSwic291cmNlUm9vdCI6Ii4uIn0=
