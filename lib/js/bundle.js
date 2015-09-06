"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//require('./components/utils/addEventListener-polyfill');

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _componentsCheckboxCheckbox = require("./components/Checkbox/Checkbox");

var _componentsCheckboxCheckbox2 = _interopRequireDefault(_componentsCheckboxCheckbox);

var _componentsDropdownDropdown = require("./components/Dropdown/Dropdown");

var _componentsDropdownDropdown2 = _interopRequireDefault(_componentsDropdownDropdown);

var _componentsTabTab = require("./components/Tab/Tab");

var _componentsTabTab2 = _interopRequireDefault(_componentsTabTab);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require("babel/polyfill");

var prefix = 'yx-';

var TabPane = _componentsTabTab2["default"].TabPane;

var Sample = (function (_React$Component) {
  _inherits(Sample, _React$Component);

  function Sample() {
    var _this = this;

    _classCallCheck(this, Sample);

    _get(Object.getPrototypeOf(Sample.prototype), "constructor", this).apply(this, arguments);

    this.state = { isOpen: true };

    this.onClick = function () {
      _this.setState({ isOpen: !_this.state.isOpen });
    };
  }

  _createClass(Sample, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        null,
        _react2["default"].createElement(
          "ul",
          null,
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "div",
              null,
              _react2["default"].createElement(
                "div",
                { className: "hd" },
                "Checkbox"
              ),
              _react2["default"].createElement(
                "div",
                { className: "bd" },
                _react2["default"].createElement(_componentsCheckboxCheckbox2["default"], null)
              )
            )
          ),
          _react2["default"].createElement(
            "li",
            null,
            _react2["default"].createElement(
              "div",
              null,
              _react2["default"].createElement(
                "div",
                { className: "hd" },
                "Dropdown          ",
                _react2["default"].createElement(
                  "button",
                  { onClick: this.onClick },
                  "setDropdown"
                )
              ),
              _react2["default"].createElement(
                "div",
                { className: "bd" },
                _react2["default"].createElement(
                  _componentsDropdownDropdown2["default"],
                  { label: "Dropdown", setSwitch: this.state.isOpen },
                  _react2["default"].createElement(
                    "div",
                    null,
                    _react2["default"].createElement(
                      "ul",
                      null,
                      _react2["default"].createElement(
                        "li",
                        null,
                        "aaa"
                      ),
                      _react2["default"].createElement(
                        "li",
                        null,
                        "bbb"
                      ),
                      _react2["default"].createElement(
                        "li",
                        null,
                        "ccc"
                      )
                    )
                  )
                ),
                _react2["default"].createElement("li", null)
              )
            )
          ),
          _react2["default"].createElement("li", null),
          _react2["default"].createElement("li", null),
          _react2["default"].createElement("li", null)
        )
      );
    }
  }], [{
    key: "defaultProps",
    value: {
      prefix: prefix
    },
    enumerable: true
  }]);

  return Sample;
})(_react2["default"].Component);

exports["default"] = Sample;

_react2["default"].render(_react2["default"].createElement(Sample, null), document.getElementById('sample'));
module.exports = exports["default"];