"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import invariant from 'invariant';
import $ from 'jquery';

export default class Dropdown extends React.Component {

  static defaultProps = {
    className: 'dropdown',
    activeMethod: 'click',
    defaultVisible: false,
    onVisibleChange: () => {}
  }

  static propTypes = {
    className: React.PropTypes.string,
    activeMethod: React.PropTypes.oneOf(['click', 'hover']),
    defaultVisible: React.PropTypes.bool,
    onVisibleChange: React.PropTypes.func
  }

  state = {isOpen: this.props.defaultVisible};

  componentDidMount() {
    // defaultVisible = true 当初次加载时，触发 change 及事件绑定
    if (this.state.isOpen === true) {
      this.props.onVisibleChange({visible: true});
      this.bindOuter()
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    const currentVisible = this.state.isOpen;
    if (nextState.isOpen !== currentVisible) {
      nextProps.onVisibleChange({visible: nextState.isOpen});
    }
  }

  getDropdownToggle = (child) => {

    const props = this.props;
    const prefix = props.prefix || '';
    const toggleProp = {
      'className': classNames([`${prefix}${props.className}-toggle`, child.props.className])
    }

    if (props.activeMethod.indexOf('click') !== -1) {
      toggleProp.onClick = this.onClick;
    }

    return (<span {...toggleProp} >{child}</span>)
  }

  getDropdownContent = (child) => {
    const props = this.props
    const prefix = props.prefix || ''
    const contentProps = {className: classNames([`${prefix}${props.className}-content`, child.props.className])}

    return (<div {...contentProps}>{child}</div>)
  }

  bindOuter = () => {
    $(document).on('click', this.onDocumentClick);
  }

  unbindOuter = () => {
    $(document).off('click', this.onDocumentClick);
  }

  onDocumentClick = (e) => {
    const componentNode = ReactDOM.findDOMNode(this);
    const isContain = componentNode.contains(e.target);
    if (!isContain) {
      this.setVisible(false);
    }
  }

  setVisible = (visibleState) => {
    const visible = !!visibleState;

    this.setState({isOpen: visible});
  }

  onClick = (e) => {
    const openState = !this.state.isOpen;

    if (openState) {
      this.bindOuter()
    } else {
      this.unbindOuter()
    }

    this.setVisible(openState);
    e.preventDefault();
    e.stopPropagation();
  }

  onMouseEnter = (e) => {
    console.log("onMouseEnter");
    this.setVisible(true);
  }

  onMouseLeave = (e) => {
    this.setVisible(false);
  }

  render() {
    const props = this.props;
    const prefix = props.prefix || '';
    const children = props.children;

    invariant(children.length === 2,
      'Dropdown is Children\'s length should be equal to 2');

    const activeMethod = props.activeMethod;

    const toggleProp = {}

    if (activeMethod.indexOf('hover') !== -1) {
      toggleProp.onMouseEnter = this.onMouseEnter;
      toggleProp.onMouseLeave = this.onMouseLeave;
    }

    return <span
      {...toggleProp}
      className={classNames(
      `${prefix}${props.className}`,
      {[`${prefix}${props.className}-hidden`]: !this.state.isOpen})}>
      {this.getDropdownToggle(children[0])}
      {this.getDropdownContent(children[1])}
    </span>
  }
}
