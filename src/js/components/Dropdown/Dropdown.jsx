"use strict";

import React from 'react';
import classNames from 'classnames';

export default class Dropdown extends React.Component {

  static defaultProps = {
    className: 'dropdown'
  };

  constructor(props) {
    super(props);
  }

  state = {isOpen: false};

  getDropdownContent = (children) => {

    let child = React.Children.only(children);

    const childProps = {
      className: classNames(`${this.props.prefix}${this.props.className}-content`, {
        hidden: !this.state.isOpen
      }),
      style: child.props.style
    };

    return React.cloneElement(child, childProps);
  };


  clickHandler = (e) => {
    /***
     * @BUG 连续点击（如三击）导致多触发
     */
    console.log(this.state);
    e.preventDefault();
    e.stopPropagation();
    this.setState({isOpen: !this.state.isOpen});
  };

  render() {
    let label = React.createElement('a', {
      className: `${this.props.prefix}${this.props.className}-${this.props.elementType || 'label'}`,
      onClick: this.clickHandler
    }, this.props.label);

    return <span
      className={classNames(`${this.props.prefix}${this.props.className}` ,{
      visible: this.state.isOpen})}
      >
      {label}
      {this.getDropdownContent(this.props.children)}
    </span>
  }
}
