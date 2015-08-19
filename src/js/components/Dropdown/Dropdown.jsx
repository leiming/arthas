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

  bindOuter = () => {
    $(document).on('click', this.onDocumentClick);
  };

  unbindOuter = () => {
    $(document).off('click', this.onDocumentClick);
  };

  onDocumentClick = (e) => {
    const componentNode = React.findDOMNode(this);
    const isContain = componentNode.contains(e.target);
    if (!isContain) {
      this.setVisible(false);
    }
  };

  setVisible = (visible) => {
    this.setState({isOpen: !!visible});
  };

  clickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    /***
     * @BUG 连续点击（如三击）导致多触发
     */
    const openState = !this.state.isOpen;
    if (openState) {
      this.bindOuter()
    } else {
      this.unbindOuter()
    }
    this.setVisible(openState);
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
