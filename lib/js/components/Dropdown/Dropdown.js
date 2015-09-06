"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Dropdown = (function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  _createClass(Dropdown, null, [{
    key: 'defaultProps',
    value: {
      className: 'dropdown',
      activeMethod: 'click',
      elementType: 'label'
    },
    enumerable: true
  }]);

  function Dropdown(props) {
    var _this = this;

    _classCallCheck(this, Dropdown);

    _get(Object.getPrototypeOf(Dropdown.prototype), 'constructor', this).call(this, props);

    this.componentWillReceiveProps = function () {
      _this.setVisible(!!_this.props.setSwitch);
    };

    this.state = { isOpen: this.props.isOpen };

    this.getDropdownContent = function (children) {

      var child = _react2['default'].Children.only(children);
      var props = _this.props;
      var prefix = props.prefix || '';

      var childProps = {
        className: (0, _classnames2['default'])('' + prefix + props.className + '-content', { hidden: !_this.state.isOpen }, [child.props.className]),
        style: child.props.style
      };

      return _react2['default'].cloneElement(child, childProps);
    };

    this.bindOuter = function () {
      $(document).on('click', _this.onDocumentClick);
    };

    this.unbindOuter = function () {
      $(document).off('click', _this.onDocumentClick);
    };

    this.onDocumentClick = function (e) {
      var componentNode = _react2['default'].findDOMNode(_this);
      var isContain = componentNode.contains(e.target);
      if (!isContain) {
        _this.setVisible(false);
      }
    };

    this.setVisible = function (visible) {
      _this.setState({ isOpen: !!visible });
    };

    this.onClick = function (e) {
      /***
       * @BUG 连续点击（如三击）导致多触发
       */
      var openState = !_this.state.isOpen;

      if (openState) {
        _this.bindOuter();
      } else {
        _this.unbindOuter();
      }

      _this.setVisible(openState);
      e.preventDefault();
      e.stopPropagation();
    };

    this.onMouseEnter = function (e) {
      _this.setVisible(true);
    };

    this.onMouseLeave = function (e) {
      _this.setVisible(false);
    };
  }

  _createClass(Dropdown, [{
    key: 'render',
    value: function render() {

      var props = this.props;
      var prefix = props.prefix || '';

      var labelProp = {
        className: '' + prefix + props.className + '-' + props.elementType
      };

      var activeMethod = props.activeMethod;
      var containerProps = {};

      if (activeMethod.indexOf('click') !== -1) {
        labelProp.onClick = this.onClick;
      }

      if (activeMethod.indexOf('hover') !== -1) {
        containerProps.onMouseEnter = this.onMouseEnter;
        containerProps.onMouseLeave = this.onMouseLeave;
      }

      var label = _react2['default'].createElement('a', labelProp, props.label);
      return _react2['default'].createElement(
        'div',
        _extends({
          className: (0, _classnames2['default'])('' + prefix + props.className, {
            visible: this.state.isOpen }) }, containerProps),
        label,
        this.getDropdownContent(this.props.children)
      );
    }
  }]);

  return Dropdown;
})(_react2['default'].Component);

exports['default'] = Dropdown;
module.exports = exports['default'];