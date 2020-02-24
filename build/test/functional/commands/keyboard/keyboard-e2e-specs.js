'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _asyncbox = require('asyncbox');

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var BUTTON_CLASS = 'android.widget.Button';
var EDITTEXT_CLASS = 'android.widget.EditText';

var PACKAGE = 'io.appium.android.apis';
var TEXTFIELD_ACTIVITY = '.view.TextFields';
var KEYEVENT_ACTIVITY = '.text.KeyEventText';

var defaultAsciiCaps = _Object$assign({}, _desired.APIDEMOS_CAPS, {
  newCommandTimeout: 90,
  appPackage: PACKAGE,
  appActivity: TEXTFIELD_ACTIVITY
});

var defaultUnicodeCaps = _Object$assign({}, defaultAsciiCaps, {
  unicodeKeyboard: true,
  resetKeyboard: true
});

function deSamsungify(text) {
  // For samsung S5 text is appended with ". Editing."
  return text.replace(". Editing.", "");
}

function getElement(driver, className) {
  return _regeneratorRuntime.async(function getElement$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(process.env.TESTOBJECT_E2E_TESTS ? 100 : 10, 1000, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.elementByClassName(className));

              case 2:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function waitForText(element, expectedText) {
  return _regeneratorRuntime.async(function waitForText$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(process.env.TESTOBJECT_E2E_TESTS ? 100 : 10, 1000, function callee$1$0() {
          var text;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(element.text());

              case 2:
                text = context$2$0.sent;

                if (!(text !== expectedText)) {
                  context$2$0.next = 5;
                  break;
                }

                throw new Error('Unexpected element text. Actual: "' + text + '". Expected: "' + expectedText + '"');

              case 5:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runTextEditTest(driver, testText) {
  var keys = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var el;
  return _regeneratorRuntime.async(function runTextEditTest$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getElement(driver, EDITTEXT_CLASS));

      case 2:
        el = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(el.clear());

      case 5:
        if (!keys) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(driver.keys([testText]));

      case 8:
        context$1$0.next = 12;
        break;

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(el.sendKeys(testText));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(process.env.TESTOBJECT_E2E_TESTS ? 100 : 10, 1000, function callee$1$0() {
          var text;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(el.text());

              case 2:
                text = context$2$0.sent;

                deSamsungify(text).should.be.equal(testText);

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3);
        }));

      case 14:
        return context$1$0.abrupt('return', el);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/*
 * The key event page needs to be cleared between runs, or else we get false
 * positives from previously run tests. The page has a single button that
 * removes all text from within the main TextView.
 */
function clearKeyEvents(driver) {
  var el;
  return _regeneratorRuntime.async(function clearKeyEvents$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getElement(driver, BUTTON_CLASS));

      case 2:
        el = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(el.click());

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(500));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function keyEventTest(driver, keyCode, metaState, expectedTextArray) {
  var runTest, text, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, expectedText;

  return _regeneratorRuntime.async(function keyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        runTest = function runTest() {
          var el;
          return _regeneratorRuntime.async(function runTest$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.pressKeycode(keyCode, metaState));

              case 2:
                el = driver.elementById('io.appium.android.apis:id/text');
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(el.text());

              case 5:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 6:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        };

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(clearKeyEvents(driver));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(runTest());

      case 5:
        text = context$1$0.sent;

        if (text) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(runTest());

      case 9:
        text = context$1$0.sent;

      case 10:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 13;

        for (_iterator = _getIterator(expectedTextArray); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          expectedText = _step.value;

          text.should.include(expectedText);
        }
        context$1$0.next = 21;
        break;

      case 17:
        context$1$0.prev = 17;
        context$1$0.t0 = context$1$0['catch'](13);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 21:
        context$1$0.prev = 21;
        context$1$0.prev = 22;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 24:
        context$1$0.prev = 24;

        if (!_didIteratorError) {
          context$1$0.next = 27;
          break;
        }

        throw _iteratorError;

      case 27:
        return context$1$0.finish(24);

      case 28:
        return context$1$0.finish(21);

      case 29:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[13, 17, 21, 29], [22,, 24, 28]]);
}

function runCombinationKeyEventTest(driver) {
  return _regeneratorRuntime.async(function runCombinationKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(keyEventTest(driver, 29, 193, ['keyCode=KEYCODE_A', 'metaState=META_SHIFT_ON']));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runKeyEventTest(driver) {
  return _regeneratorRuntime.async(function runKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(keyEventTest(driver, 82, undefined, ['[keycode=82]', 'keyCode=KEYCODE_MENU']));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var tests = [{ label: 'editing a text field', text: 'Life, the Universe and Everything.' }, { label: 'sending \'&-\'', text: '&-' }, { label: 'sending \'&\' and \'-\' in other text', text: 'In the mid-1990s he ate fish & chips as mayor-elect.' }, { label: 'sending \'-\' in text', text: 'Super-test.' }, { label: 'sending numbers', text: '0123456789' }];

var unicodeTests = [{ label: 'should be able to send \'-\' in unicode text', text: 'परीक्षा-परीक्षण' }, { label: 'should be able to send \'&\' in text', text: 'Fish & chips' }, { label: 'should be able to send \'&\' in unicode text', text: 'Mīna & chips' }, { label: 'should be able to send roman characters with diacritics', text: 'Áé Œ ù ḍ' }, { label: 'should be able to send a \'u\' with an umlaut', text: 'ü' }];

var languageTests = [{ label: 'should be able to send Tamil', text: 'சோதனை' }, { label: 'should be able to send Gujarati', text: 'પરીક્ષણ' }, { label: 'should be able to send Chinese', text: '测试' }, { label: 'should be able to send Russian', text: 'тестирование' }, { label: 'should be able to send Arabic', text: 'تجريب' }, { label: 'should be able to send Hebrew', text: 'בדיקות' }];

describe('keyboard', function () {
  describe('ascii', function () {
    var driver = undefined;
    before(function callee$2$0() {
      var engines, selectedEngine, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, engine;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(defaultAsciiCaps));

          case 2:
            driver = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.availableIMEEngines());

          case 5:
            engines = context$3$0.sent;
            selectedEngine = _lodash2['default'].first(engines);
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$3$0.prev = 10;

            for (_iterator2 = _getIterator(engines); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              engine = _step2.value;

              // it seems that the latin ime has `android.inputmethod` in its package name
              if (engine.indexOf('android.inputmethod') !== -1) {
                selectedEngine = engine;
              }
            }
            context$3$0.next = 18;
            break;

          case 14:
            context$3$0.prev = 14;
            context$3$0.t0 = context$3$0['catch'](10);
            _didIteratorError2 = true;
            _iteratorError2 = context$3$0.t0;

          case 18:
            context$3$0.prev = 18;
            context$3$0.prev = 19;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 21:
            context$3$0.prev = 21;

            if (!_didIteratorError2) {
              context$3$0.next = 24;
              break;
            }

            throw _iteratorError2;

          case 24:
            return context$3$0.finish(21);

          case 25:
            return context$3$0.finish(18);

          case 26:
            context$3$0.next = 28;
            return _regeneratorRuntime.awrap(driver.activateIMEEngine(selectedEngine));

          case 28:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[10, 14, 18, 26], [19,, 21, 25]]);
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

    describe('editing a text field', function () {
      var els = undefined;
      beforeEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(5, 1000, function callee$4$0() {
                var els;
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap(driver.elementsByClassName(EDITTEXT_CLASS));

                    case 2:
                      els = context$5$0.sent;

                      els.should.have.length.at.least(1);
                      return context$5$0.abrupt('return', els);

                    case 5:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, this);
              }));

            case 2:
              els = context$4$0.sent;

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        var _loop = function () {
          var test = _step3.value;

          describe(test.label, function () {
            it('should work with setValue', function callee$5$0() {
              return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                while (1) switch (context$6$0.prev = context$6$0.next) {
                  case 0:
                    context$6$0.next = 2;
                    return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text));

                  case 2:
                  case 'end':
                    return context$6$0.stop();
                }
              }, null, this);
            });
            it('should work with keys', function callee$5$0() {
              return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                while (1) switch (context$6$0.prev = context$6$0.next) {
                  case 0:
                    context$6$0.next = 2;
                    return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text, true));

                  case 2:
                  case 'end':
                    return context$6$0.stop();
                }
              }, null, this);
            });
          });
        };

        for (var _iterator3 = _getIterator(tests), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          _loop();
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

      it('should be able to clear a password field', function callee$3$0() {
        var password, passwordTextField, passwordOutput;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              // this test is flakey
              this.retries(4);

              // there is currently no way to directly assert anything about the contents
              // of a password field, since there is no way to access the contents
              password = 'super-duper password';
              passwordTextField = els[1];
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(driver.elementById('io.appium.android.apis:id/edit1Text'));

            case 5:
              passwordOutput = context$4$0.sent;
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(passwordTextField.sendKeys(password));

            case 8:
              context$4$0.next = 10;
              return _regeneratorRuntime.awrap(waitForText(passwordOutput, password));

            case 10:
              context$4$0.next = 12;
              return _regeneratorRuntime.awrap(passwordTextField.clear());

            case 12:
              context$4$0.next = 14;
              return _regeneratorRuntime.awrap(waitForText(passwordOutput, ''));

            case 14:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should be able to type in length-limited field', function callee$3$0() {
        var adb, el, text;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              if (process.env.TESTOBJECT_E2E_TESTS) {
                context$4$0.next = 8;
                break;
              }

              adb = new _appiumAdb2['default']();
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.getApiLevel());

            case 4:
              context$4$0.t0 = context$4$0.sent;
              context$4$0.t1 = parseInt(context$4$0.t0, 10);

              if (!(context$4$0.t1 < 24)) {
                context$4$0.next = 8;
                break;
              }

              return context$4$0.abrupt('return', this.skip());

            case 8:
              el = els[3];
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(el.setImmediateValue('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));

            case 11:
              context$4$0.next = 13;
              return _regeneratorRuntime.awrap(el.text());

            case 13:
              text = context$4$0.sent;

              text.should.eql('0123456789a');

            case 15:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });

    describe('sending a key event', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: PACKAGE, appActivity: KEYEVENT_ACTIVITY }));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(500));

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should be able to send combination keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runCombinationKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should be able to send keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
  });

  describe('unicode', function () {
    var adb = undefined;
    if (!process.env.TESTOBJECT_E2E_TESTS) {
      adb = new _appiumAdb2['default']();
    }
    var initialIME = undefined;
    var driver = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (!adb) {
              context$3$0.next = 5;
              break;
            }

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.defaultIME());

          case 3:
            initialIME = context$3$0.sent;

            initialIME.should.not.eql('io.appium.android.ime/.UnicodeIME');

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(defaultUnicodeCaps));

          case 7:
            driver = context$3$0.sent;

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      var ime;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.quit());

          case 2:
            if (!adb) {
              context$3$0.next = 8;
              break;
            }

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.defaultIME());

          case 5:
            ime = context$3$0.sent;

            ime.should.eql(initialIME);
            ime.should.not.eql('io.appium.android.ime/.UnicodeIME');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    describe('editing a text field', function () {
      var _arr = [tests, unicodeTests, languageTests];

      for (var _i = 0; _i < _arr.length; _i++) {
        var testSet = _arr[_i];var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          var _loop2 = function () {
            var test = _step4.value;

            describe(test.label, function () {
              it('should work with setValue', function callee$5$0() {
                return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                  while (1) switch (context$6$0.prev = context$6$0.next) {
                    case 0:
                      context$6$0.next = 2;
                      return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text));

                    case 2:
                    case 'end':
                      return context$6$0.stop();
                  }
                }, null, this);
              });
              it('should work with keys', function callee$5$0() {
                return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                  while (1) switch (context$6$0.prev = context$6$0.next) {
                    case 0:
                      context$6$0.next = 2;
                      return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text, true));

                    case 2:
                    case 'end':
                      return context$6$0.stop();
                  }
                }, null, this);
              });
            });
          };

          for (var _iterator4 = _getIterator(testSet), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4['return']) {
              _iterator4['return']();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
    });

    describe('sending a key event', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: PACKAGE, appActivity: KEYEVENT_ACTIVITY }));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should be able to send combination keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runCombinationKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should be able to send keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
  });
});

// wait a moment for the clearing to occur, lest we too quickly try to enter more text

// the test is flakey... try again

// sometimes the default ime is not what we are using

// below Android 7.0 (API level 24) typing too many characters in a
// length-limited field will either throw a NullPointerException or
// crash the app

// expect first 11 characters (limit of the field) to be in the field

// save the initial ime so we can make sure it is restored

// make sure the IME has been restored
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9rZXlib2FyZC9rZXlib2FyZC1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQy9CLFFBQVE7Ozs7d0JBQ1IsVUFBVTs7Ozt3QkFDTSxVQUFVOzt1QkFDVixlQUFlOzs4QkFDbEIsdUJBQXVCOzt5QkFDbEMsWUFBWTs7OztBQUc1QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0sWUFBWSxHQUFHLHVCQUF1QixDQUFDO0FBQzdDLElBQU0sY0FBYyxHQUFHLHlCQUF5QixDQUFDOztBQUVqRCxJQUFNLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztBQUN6QyxJQUFNLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQzlDLElBQU0saUJBQWlCLEdBQUcsb0JBQW9CLENBQUM7O0FBRS9DLElBQUksZ0JBQWdCLEdBQUcsZUFBYyxFQUFFLDBCQUFpQjtBQUN0RCxtQkFBaUIsRUFBRSxFQUFFO0FBQ3JCLFlBQVUsRUFBRSxPQUFPO0FBQ25CLGFBQVcsRUFBRSxrQkFBa0I7Q0FDaEMsQ0FBQyxDQUFDOztBQUVILElBQUksa0JBQWtCLEdBQUcsZUFBYyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUU7QUFDM0QsaUJBQWUsRUFBRSxJQUFJO0FBQ3JCLGVBQWEsRUFBRSxJQUFJO0NBQ3BCLENBQUMsQ0FBQzs7QUFFSCxTQUFTLFlBQVksQ0FBRSxJQUFJLEVBQUU7O0FBRTNCLFNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDdkM7O0FBRUQsU0FBZSxVQUFVLENBQUUsTUFBTSxFQUFFLFNBQVM7Ozs7Ozs7eUNBQzdCLDZCQUFjLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUU7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Q0FBQyxxQkFBcUIsRUFBRSxZQUFZO0FBQzFDLFlBQU0sQ0FBQzs7Ozs7K0NBQ0MsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFDLENBQUM7Ozs7Ozs7T0FDbEYsQ0FBQyxDQUFDOztBQUVILFFBQUUsQ0FBQyw4Q0FBOEMsRUFBRTs7Ozs7K0NBQzNDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQzs7Ozs7OztPQUN6QyxDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsa0NBQWtDLEVBQUU7Ozs7OytDQUMvQixlQUFlLENBQUMsTUFBTSxDQUFDOzs7Ozs7O09BQzlCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMva2V5Ym9hcmQva2V5Ym9hcmQtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcbmltcG9ydCB7IEFQSURFTU9TX0NBUFMgfSBmcm9tICcuLi8uLi9kZXNpcmVkJztcbmltcG9ydCB7IGluaXREcml2ZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3Nlc3Npb24nO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCBCVVRUT05fQ0xBU1MgPSAnYW5kcm9pZC53aWRnZXQuQnV0dG9uJztcbmNvbnN0IEVESVRURVhUX0NMQVNTID0gJ2FuZHJvaWQud2lkZ2V0LkVkaXRUZXh0JztcblxuY29uc3QgUEFDS0FHRSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbmNvbnN0IFRFWFRGSUVMRF9BQ1RJVklUWSA9ICcudmlldy5UZXh0RmllbGRzJztcbmNvbnN0IEtFWUVWRU5UX0FDVElWSVRZID0gJy50ZXh0LktleUV2ZW50VGV4dCc7XG5cbmxldCBkZWZhdWx0QXNjaWlDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgQVBJREVNT1NfQ0FQUywge1xuICBuZXdDb21tYW5kVGltZW91dDogOTAsXG4gIGFwcFBhY2thZ2U6IFBBQ0tBR0UsXG4gIGFwcEFjdGl2aXR5OiBURVhURklFTERfQUNUSVZJVFlcbn0pO1xuXG5sZXQgZGVmYXVsdFVuaWNvZGVDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdEFzY2lpQ2Fwcywge1xuICB1bmljb2RlS2V5Ym9hcmQ6IHRydWUsXG4gIHJlc2V0S2V5Ym9hcmQ6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBkZVNhbXN1bmdpZnkgKHRleHQpIHtcbiAgLy8gRm9yIHNhbXN1bmcgUzUgdGV4dCBpcyBhcHBlbmRlZCB3aXRoIFwiLiBFZGl0aW5nLlwiXG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoXCIuIEVkaXRpbmcuXCIsIFwiXCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRFbGVtZW50IChkcml2ZXIsIGNsYXNzTmFtZSkge1xuICByZXR1cm4gYXdhaXQgcmV0cnlJbnRlcnZhbChwcm9jZXNzLmVudi5URVNUT0JKRUNUX0UyRV9URVNUUyA/IDEwMCA6IDEwLCAxMDAwLCBhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IGRyaXZlci5lbGVtZW50QnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHdhaXRGb3JUZXh0IChlbGVtZW50LCBleHBlY3RlZFRleHQpIHtcbiAgcmV0dXJuIGF3YWl0IHJldHJ5SW50ZXJ2YWwocHJvY2Vzcy5lbnYuVEVTVE9CSkVDVF9FMkVfVEVTVFMgPyAxMDAgOiAxMCwgMTAwMCwgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBhd2FpdCBlbGVtZW50LnRleHQoKTtcbiAgICBpZiAodGV4dCAhPT0gZXhwZWN0ZWRUZXh0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgZWxlbWVudCB0ZXh0LiBBY3R1YWw6IFwiJHt0ZXh0fVwiLiBFeHBlY3RlZDogXCIke2V4cGVjdGVkVGV4dH1cImApO1xuICAgIH1cbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1blRleHRFZGl0VGVzdCAoZHJpdmVyLCB0ZXN0VGV4dCwga2V5cyA9IGZhbHNlKSB7XG4gIGxldCBlbCA9IGF3YWl0IGdldEVsZW1lbnQoZHJpdmVyLCBFRElUVEVYVF9DTEFTUyk7XG4gIGF3YWl0IGVsLmNsZWFyKCk7XG5cbiAgaWYgKGtleXMpIHtcbiAgICBhd2FpdCBkcml2ZXIua2V5cyhbdGVzdFRleHRdKTtcbiAgfSBlbHNlIHtcbiAgICBhd2FpdCBlbC5zZW5kS2V5cyh0ZXN0VGV4dCk7XG4gIH1cblxuICBhd2FpdCByZXRyeUludGVydmFsKHByb2Nlc3MuZW52LlRFU1RPQkpFQ1RfRTJFX1RFU1RTID8gMTAwIDogMTAsIDEwMDAsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgdGV4dCA9IGF3YWl0IGVsLnRleHQoKTtcbiAgICBkZVNhbXN1bmdpZnkodGV4dCkuc2hvdWxkLmJlLmVxdWFsKHRlc3RUZXh0KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGVsO1xufVxuXG4vKlxuICogVGhlIGtleSBldmVudCBwYWdlIG5lZWRzIHRvIGJlIGNsZWFyZWQgYmV0d2VlbiBydW5zLCBvciBlbHNlIHdlIGdldCBmYWxzZVxuICogcG9zaXRpdmVzIGZyb20gcHJldmlvdXNseSBydW4gdGVzdHMuIFRoZSBwYWdlIGhhcyBhIHNpbmdsZSBidXR0b24gdGhhdFxuICogcmVtb3ZlcyBhbGwgdGV4dCBmcm9tIHdpdGhpbiB0aGUgbWFpbiBUZXh0Vmlldy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY2xlYXJLZXlFdmVudHMgKGRyaXZlcikge1xuICBsZXQgZWwgPSBhd2FpdCBnZXRFbGVtZW50KGRyaXZlciwgQlVUVE9OX0NMQVNTKTtcbiAgYXdhaXQgZWwuY2xpY2soKTtcblxuICAvLyB3YWl0IGEgbW9tZW50IGZvciB0aGUgY2xlYXJpbmcgdG8gb2NjdXIsIGxlc3Qgd2UgdG9vIHF1aWNrbHkgdHJ5IHRvIGVudGVyIG1vcmUgdGV4dFxuICBhd2FpdCBCLmRlbGF5KDUwMCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGtleUV2ZW50VGVzdCAoZHJpdmVyLCBrZXlDb2RlLCBtZXRhU3RhdGUsIGV4cGVjdGVkVGV4dEFycmF5KSB7XG4gIGxldCBydW5UZXN0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5wcmVzc0tleWNvZGUoa2V5Q29kZSwgbWV0YVN0YXRlKTtcbiAgICBsZXQgZWwgPSBkcml2ZXIuZWxlbWVudEJ5SWQoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvdGV4dCcpO1xuICAgIHJldHVybiBhd2FpdCBlbC50ZXh0KCk7XG4gIH07XG5cbiAgYXdhaXQgY2xlYXJLZXlFdmVudHMoZHJpdmVyKTtcblxuICBsZXQgdGV4dCA9IGF3YWl0IHJ1blRlc3QoKTtcbiAgaWYgKCF0ZXh0KSB7XG4gICAgLy8gdGhlIHRlc3QgaXMgZmxha2V5Li4uIHRyeSBhZ2FpblxuICAgIHRleHQgPSBhd2FpdCBydW5UZXN0KCk7XG4gIH1cbiAgZm9yIChsZXQgZXhwZWN0ZWRUZXh0IG9mIGV4cGVjdGVkVGV4dEFycmF5KSB7XG4gICAgdGV4dC5zaG91bGQuaW5jbHVkZShleHBlY3RlZFRleHQpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bkNvbWJpbmF0aW9uS2V5RXZlbnRUZXN0IChkcml2ZXIpIHtcbiAgYXdhaXQga2V5RXZlbnRUZXN0KGRyaXZlciwgMjksIDE5MywgWydrZXlDb2RlPUtFWUNPREVfQScsICdtZXRhU3RhdGU9TUVUQV9TSElGVF9PTiddKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuS2V5RXZlbnRUZXN0IChkcml2ZXIpIHtcbiAgYXdhaXQga2V5RXZlbnRUZXN0KGRyaXZlciwgODIsIHVuZGVmaW5lZCwgWydba2V5Y29kZT04Ml0nLCAna2V5Q29kZT1LRVlDT0RFX01FTlUnXSk7XG59XG5cbmxldCB0ZXN0cyA9IFtcbiAgeyBsYWJlbDogJ2VkaXRpbmcgYSB0ZXh0IGZpZWxkJywgdGV4dDogJ0xpZmUsIHRoZSBVbml2ZXJzZSBhbmQgRXZlcnl0aGluZy4nIH0sXG4gIHsgbGFiZWw6ICdzZW5kaW5nIFxcJyYtXFwnJywgdGV4dDogJyYtJyB9LFxuICB7IGxhYmVsOiAnc2VuZGluZyBcXCcmXFwnIGFuZCBcXCctXFwnIGluIG90aGVyIHRleHQnLCB0ZXh0OiAnSW4gdGhlIG1pZC0xOTkwcyBoZSBhdGUgZmlzaCAmIGNoaXBzIGFzIG1heW9yLWVsZWN0LicgfSxcbiAgeyBsYWJlbDogJ3NlbmRpbmcgXFwnLVxcJyBpbiB0ZXh0JywgdGV4dDogJ1N1cGVyLXRlc3QuJyB9LFxuICB7IGxhYmVsOiAnc2VuZGluZyBudW1iZXJzJywgdGV4dDogJzAxMjM0NTY3ODknfSxcbl07XG5cbmxldCB1bmljb2RlVGVzdHMgPSBbXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFxcJy1cXCcgaW4gdW5pY29kZSB0ZXh0JywgdGV4dDogJ+CkquCksOClgOCkleCljeCkt+Ckvi3gpKrgpLDgpYDgpJXgpY3gpLfgpKMnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFxcJyZcXCcgaW4gdGV4dCcsIHRleHQ6ICdGaXNoICYgY2hpcHMnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFxcJyZcXCcgaW4gdW5pY29kZSB0ZXh0JywgdGV4dDogJ03Eq25hICYgY2hpcHMnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIHJvbWFuIGNoYXJhY3RlcnMgd2l0aCBkaWFjcml0aWNzJywgdGV4dDogJ8OBw6kgxZIgw7kg4biNJyB9LFxuICB7IGxhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBhIFxcJ3VcXCcgd2l0aCBhbiB1bWxhdXQnLCB0ZXh0OiAnw7wnIH0sXG5dO1xuXG5sZXQgbGFuZ3VhZ2VUZXN0cyA9IFtcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgVGFtaWwnLCB0ZXh0OiAn4K6a4K+H4K6+4K6k4K6p4K+IJyB9LFxuICB7IGxhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBHdWphcmF0aScsIHRleHQ6ICfgqqrgqrDgq4DgqpXgq43gqrfgqqMnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIENoaW5lc2UnLCB0ZXh0OiAn5rWL6K+VJyB9LFxuICB7IGxhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBSdXNzaWFuJywgdGV4dDogJ9GC0LXRgdGC0LjRgNC+0LLQsNC90LjQtScgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgQXJhYmljJywgdGV4dDogJ9iq2KzYsdmK2KgnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIEhlYnJldycsIHRleHQ6ICfXkdeT15nXp9eV16onIH0sXG5dO1xuXG5kZXNjcmliZSgna2V5Ym9hcmQnLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKCdhc2NpaScsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZHJpdmVyO1xuICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKGRlZmF1bHRBc2NpaUNhcHMpO1xuXG4gICAgICAvLyBzb21ldGltZXMgdGhlIGRlZmF1bHQgaW1lIGlzIG5vdCB3aGF0IHdlIGFyZSB1c2luZ1xuICAgICAgbGV0IGVuZ2luZXMgPSBhd2FpdCBkcml2ZXIuYXZhaWxhYmxlSU1FRW5naW5lcygpO1xuICAgICAgbGV0IHNlbGVjdGVkRW5naW5lID0gXy5maXJzdChlbmdpbmVzKTtcbiAgICAgIGZvciAobGV0IGVuZ2luZSBvZiBlbmdpbmVzKSB7XG4gICAgICAgIC8vIGl0IHNlZW1zIHRoYXQgdGhlIGxhdGluIGltZSBoYXMgYGFuZHJvaWQuaW5wdXRtZXRob2RgIGluIGl0cyBwYWNrYWdlIG5hbWVcbiAgICAgICAgaWYgKGVuZ2luZS5pbmRleE9mKCdhbmRyb2lkLmlucHV0bWV0aG9kJykgIT09IC0xKSB7XG4gICAgICAgICAgc2VsZWN0ZWRFbmdpbmUgPSBlbmdpbmU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGF3YWl0IGRyaXZlci5hY3RpdmF0ZUlNRUVuZ2luZShzZWxlY3RlZEVuZ2luZSk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdlZGl0aW5nIGEgdGV4dCBmaWVsZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBlbHM7XG4gICAgICBiZWZvcmVFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWxzID0gYXdhaXQgcmV0cnlJbnRlcnZhbCg1LCAxMDAwLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc3QgZWxzID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlDbGFzc05hbWUoRURJVFRFWFRfQ0xBU1MpO1xuICAgICAgICAgIGVscy5zaG91bGQuaGF2ZS5sZW5ndGguYXQubGVhc3QoMSk7XG4gICAgICAgICAgcmV0dXJuIGVscztcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGZvciAobGV0IHRlc3Qgb2YgdGVzdHMpIHtcbiAgICAgICAgZGVzY3JpYmUodGVzdC5sYWJlbCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGl0KCdzaG91bGQgd29yayB3aXRoIHNldFZhbHVlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXdhaXQgcnVuVGV4dEVkaXRUZXN0KGRyaXZlciwgdGVzdC50ZXh0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpdCgnc2hvdWxkIHdvcmsgd2l0aCBrZXlzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXdhaXQgcnVuVGV4dEVkaXRUZXN0KGRyaXZlciwgdGVzdC50ZXh0LCB0cnVlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBjbGVhciBhIHBhc3N3b3JkIGZpZWxkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB0aGlzIHRlc3QgaXMgZmxha2V5XG4gICAgICAgIHRoaXMucmV0cmllcyg0KTtcblxuICAgICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gd2F5IHRvIGRpcmVjdGx5IGFzc2VydCBhbnl0aGluZyBhYm91dCB0aGUgY29udGVudHNcbiAgICAgICAgLy8gb2YgYSBwYXNzd29yZCBmaWVsZCwgc2luY2UgdGhlcmUgaXMgbm8gd2F5IHRvIGFjY2VzcyB0aGUgY29udGVudHNcbiAgICAgICAgY29uc3QgcGFzc3dvcmQgPSAnc3VwZXItZHVwZXIgcGFzc3dvcmQnO1xuICAgICAgICBsZXQgcGFzc3dvcmRUZXh0RmllbGQgPSBlbHNbMV07XG4gICAgICAgIGxldCBwYXNzd29yZE91dHB1dCA9IGF3YWl0IGRyaXZlci5lbGVtZW50QnlJZCgnaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9lZGl0MVRleHQnKTtcbiAgICAgICAgYXdhaXQgcGFzc3dvcmRUZXh0RmllbGQuc2VuZEtleXMocGFzc3dvcmQpO1xuICAgICAgICBhd2FpdCB3YWl0Rm9yVGV4dChwYXNzd29yZE91dHB1dCwgcGFzc3dvcmQpO1xuICAgICAgICBhd2FpdCBwYXNzd29yZFRleHRGaWVsZC5jbGVhcigpO1xuICAgICAgICBhd2FpdCB3YWl0Rm9yVGV4dChwYXNzd29yZE91dHB1dCwgJycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byB0eXBlIGluIGxlbmd0aC1saW1pdGVkIGZpZWxkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXByb2Nlc3MuZW52LlRFU1RPQkpFQ1RfRTJFX1RFU1RTKSB7XG4gICAgICAgICAgbGV0IGFkYiA9IG5ldyBBREIoKTtcbiAgICAgICAgICBpZiAocGFyc2VJbnQoYXdhaXQgYWRiLmdldEFwaUxldmVsKCksIDEwKSA8IDI0KSB7XG4gICAgICAgICAgICAvLyBiZWxvdyBBbmRyb2lkIDcuMCAoQVBJIGxldmVsIDI0KSB0eXBpbmcgdG9vIG1hbnkgY2hhcmFjdGVycyBpbiBhXG4gICAgICAgICAgICAvLyBsZW5ndGgtbGltaXRlZCBmaWVsZCB3aWxsIGVpdGhlciB0aHJvdyBhIE51bGxQb2ludGVyRXhjZXB0aW9uIG9yXG4gICAgICAgICAgICAvLyBjcmFzaCB0aGUgYXBwXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5za2lwKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBlbCA9IGVsc1szXTtcbiAgICAgICAgYXdhaXQgZWwuc2V0SW1tZWRpYXRlVmFsdWUoJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJyk7XG5cbiAgICAgICAgLy8gZXhwZWN0IGZpcnN0IDExIGNoYXJhY3RlcnMgKGxpbWl0IG9mIHRoZSBmaWVsZCkgdG8gYmUgaW4gdGhlIGZpZWxkXG4gICAgICAgIGxldCB0ZXh0ID0gYXdhaXQgZWwudGV4dCgpO1xuICAgICAgICB0ZXh0LnNob3VsZC5lcWwoJzAxMjM0NTY3ODlhJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZW5kaW5nIGEga2V5IGV2ZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoe2FwcFBhY2thZ2U6IFBBQ0tBR0UsIGFwcEFjdGl2aXR5OiBLRVlFVkVOVF9BQ1RJVklUWX0pO1xuICAgICAgICBhd2FpdCBCLmRlbGF5KDUwMCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgY29tYmluYXRpb24ga2V5ZXZlbnRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBydW5Db21iaW5hdGlvbktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBrZXlldmVudHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IHJ1bktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd1bmljb2RlJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBhZGI7XG4gICAgaWYgKCFwcm9jZXNzLmVudi5URVNUT0JKRUNUX0UyRV9URVNUUykge1xuICAgICAgYWRiID0gbmV3IEFEQigpO1xuICAgIH1cbiAgICBsZXQgaW5pdGlhbElNRTtcbiAgICBsZXQgZHJpdmVyO1xuICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzYXZlIHRoZSBpbml0aWFsIGltZSBzbyB3ZSBjYW4gbWFrZSBzdXJlIGl0IGlzIHJlc3RvcmVkXG4gICAgICBpZiAoYWRiKSB7XG4gICAgICAgIGluaXRpYWxJTUUgPSBhd2FpdCBhZGIuZGVmYXVsdElNRSgpO1xuICAgICAgICBpbml0aWFsSU1FLnNob3VsZC5ub3QuZXFsKCdpby5hcHBpdW0uYW5kcm9pZC5pbWUvLlVuaWNvZGVJTUUnKTtcbiAgICAgIH1cblxuICAgICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihkZWZhdWx0VW5pY29kZUNhcHMpO1xuICAgIH0pO1xuICAgIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgSU1FIGhhcyBiZWVuIHJlc3RvcmVkXG4gICAgICBpZiAoYWRiKSB7XG4gICAgICAgIGxldCBpbWUgPSBhd2FpdCBhZGIuZGVmYXVsdElNRSgpO1xuICAgICAgICBpbWUuc2hvdWxkLmVxbChpbml0aWFsSU1FKTtcbiAgICAgICAgaW1lLnNob3VsZC5ub3QuZXFsKCdpby5hcHBpdW0uYW5kcm9pZC5pbWUvLlVuaWNvZGVJTUUnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdlZGl0aW5nIGEgdGV4dCBmaWVsZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAobGV0IHRlc3RTZXQgb2YgW3Rlc3RzLCB1bmljb2RlVGVzdHMsIGxhbmd1YWdlVGVzdHNdKSB7XG4gICAgICAgIGZvciAobGV0IHRlc3Qgb2YgdGVzdFNldCkge1xuICAgICAgICAgIGRlc2NyaWJlKHRlc3QubGFiZWwsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgd29yayB3aXRoIHNldFZhbHVlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBhd2FpdCBydW5UZXh0RWRpdFRlc3QoZHJpdmVyLCB0ZXN0LnRleHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHdvcmsgd2l0aCBrZXlzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBhd2FpdCBydW5UZXh0RWRpdFRlc3QoZHJpdmVyLCB0ZXN0LnRleHQsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZW5kaW5nIGEga2V5IGV2ZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoe2FwcFBhY2thZ2U6IFBBQ0tBR0UsIGFwcEFjdGl2aXR5OiBLRVlFVkVOVF9BQ1RJVklUWX0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzZW5kIGNvbWJpbmF0aW9uIGtleWV2ZW50cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXdhaXQgcnVuQ29tYmluYXRpb25LZXlFdmVudFRlc3QoZHJpdmVyKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQga2V5ZXZlbnRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBydW5LZXlFdmVudFRlc3QoZHJpdmVyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
