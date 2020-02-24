"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var commands = {};

commands.getScreenshot = function callee$0$0() {
  var data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.mjpegStream) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.mjpegStream.lastChunkPNGBase64());

      case 3:
        data = context$1$0.sent;

        if (!data) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt("return", data);

      case 6:
        _logger2["default"].warn("Tried to get screenshot from active MJPEG stream, but there " + "was no data yet. Falling back to regular screenshot methods.");

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/screenshot', 'GET'));

      case 9:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 10:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

exports["default"] = commands;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9zY3JlZW5zaG90LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7c0JBQW1CLFdBQVc7Ozs7QUFFOUIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUVsQixRQUFRLENBQUMsYUFBYSxHQUFHO01BRWYsSUFBSTs7OzthQURSLElBQUksQ0FBQyxXQUFXOzs7Ozs7eUNBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRTs7O0FBQWxELFlBQUk7O2FBQ04sSUFBSTs7Ozs7NENBQ0MsSUFBSTs7O0FBRWIsNEJBQU8sSUFBSSxDQUFDLDhEQUE4RCxHQUM5RCw4REFBOEQsQ0FBQyxDQUFDOzs7O3lDQUVqRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQzs7Ozs7Ozs7OztDQUNyRSxDQUFDOztxQkFFYSxRQUFRIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9zY3JlZW5zaG90LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9sb2dnZXInO1xuXG5sZXQgY29tbWFuZHMgPSB7fTtcblxuY29tbWFuZHMuZ2V0U2NyZWVuc2hvdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMubWpwZWdTdHJlYW0pIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5tanBlZ1N0cmVhbS5sYXN0Q2h1bmtQTkdCYXNlNjQoKTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGxvZ2dlci53YXJuKFwiVHJpZWQgdG8gZ2V0IHNjcmVlbnNob3QgZnJvbSBhY3RpdmUgTUpQRUcgc3RyZWFtLCBidXQgdGhlcmUgXCIgK1xuICAgICAgICAgICAgICAgIFwid2FzIG5vIGRhdGEgeWV0LiBGYWxsaW5nIGJhY2sgdG8gcmVndWxhciBzY3JlZW5zaG90IG1ldGhvZHMuXCIpO1xuICB9XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoJy9zY3JlZW5zaG90JywgJ0dFVCcpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
