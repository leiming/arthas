"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TabPane = require("./TabPane");

var _TabPane2 = _interopRequireDefault(_TabPane);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Tab = (function (_React$Component) {
  _inherits(Tab, _React$Component);

  _createClass(Tab, null, [{
    key: "defaultProps",
    value: {
      tabCls: 'tab'
    },
    enumerable: true
  }]);

  function Tab(prop) {
    var _this = this;

    _classCallCheck(this, Tab);

    _get(Object.getPrototypeOf(Tab.prototype), "constructor", this).call(this, prop);
    this.state = {
      activeIndex: 0
    };

    this.getTabLink = function (children) {
      var activeIndex = _this.state.activeIndex;
      return _react2["default"].Children.map(children, (function (child, index) {
        if (child.type == _TabPane2["default"]) {
          var _classNames;

          return _react2["default"].createElement('li', {
            className: (0, _classnames2["default"])((_classNames = {}, _defineProperty(_classNames, "" + this.props.className, this.props.className), _defineProperty(_classNames, this.props.prefix + this.props.tabCls + '-link', true), _defineProperty(_classNames, 'active', activeIndex === index), _classNames)),
            'data-index': index,
            onClick: this.clickTabLinkHandler.bind(this, index)
          }, child.props.tabName);
        }
      }).bind(_this));
    };

    this.clickTabLinkHandler = function (index) {
      _this.setState({ 'activeIndex': index });
    };

    this.getTabPane = function (children) {
      var paneProp = Object.assign({}, _this.state, _this.props);
      return _react2["default"].Children.map(children, function (child, index) {
        if (child.type == _TabPane2["default"]) {
          if (child.props.children) {
            return _react2["default"].cloneElement(child, Object.assign({ index: index }, paneProp, child.props));
          }
          return _react2["default"].createElement(_TabPane2["default"], Object.assign({ index: index }, paneProp, child.props), child);
        }
      });
    };

    this.state.activeIndex = prop.activeIndex || 0;
  }

  _createClass(Tab, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        { className: this.props.className, style: this.props.style },
        _react2["default"].createElement(
          "ul",
          { className: this.props.className + " " + this.props.prefix + this.props.tabCls + "-link-container" },
          this.getTabLink(this.props.children)
        ),
        this.getTabPane(this.props.children)
      );
    }
  }]);

  return Tab;
})(_react2["default"].Component);

Tab.TabPane = _TabPane2["default"];

exports["default"] = Tab;
module.exports = exports["default"];