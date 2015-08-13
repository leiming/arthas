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

  /**
   * 获取内容元素
   * @param children
   * @returns {*}
   */
  getDropdownContent = (children) => {

    let child = React.Children.only(children);
    let styleName = Object.assign({
      position: "absolute"
    }, child.props.style);

    let childProps = {
      className: classNames(`${this.props.prefix}${this.props.className}-content`, {
        visible: !!this.state.isOpen
      }),
      style: styleName
    };

    return React.cloneElement(child, childProps);
  };

  setVisible = (isVisible) => {
    this.setState({isOpen: !!isVisible})
  };

  /**
   * render
   * @returns {XML}
   */
  render() {
    console.log(this.props);
    let label = React.createElement('a', {
      className: `${this.props.prefix}${this.props.className}-${this.props.elementType || 'label'}`,
      onClick: (e) => {
        e.preventDefault();
        this.setVisible(!this.state.isOpen);
      }
    }, this.props.label);

    let styleName = {position: "relative", display: 'inline-block'};
    return <div
      style={styleName}
      className={classNames(`${this.props.prefix}${this.props.className}` ,{
      visible: this.state.isOpen})}
      >
      {label}
      {this.getDropdownContent(this.props.children)}
    </div>
  }
}
