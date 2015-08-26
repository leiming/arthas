"use strict";

import React from 'react';
import classNames from 'classnames';

export default class Dropdown extends React.Component {

  static defaultProps = {
    className: 'dropdown',
    activeMethod: 'click',
    elementType: 'label'
  };

  constructor(props) {
    super(props);
  }

  state = {isOpen: this.props.isOpen};

  getDropdownContent = (children) => {

    let child = React.Children.only(children);
    const props = this.props;
    const prefix = props.prefix || '';

    const childProps = {
      className: classNames(
        `${prefix}${props.className}-content`,
        {hidden: !this.state.isOpen},
        [child.props.className]
      ),
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

  onClick = (e) => {
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
    e.preventDefault();
    e.stopPropagation();
  };

  onMouseEnter = (e) => {
    this.setVisible(true);
  };

  onMouseLeave = (e) => {
    this.setVisible(false);
  };

  render() {

    const props = this.props;
    const prefix = props.prefix || '';

    let labelProp = {
      className: `${prefix}${props.className}-${props.elementType}`
    };

    const activeMethod = props.activeMethod;
    const containerProps = {};

    if (activeMethod.indexOf('click') !== -1) {
      labelProp.onClick = this.onClick;
    }

    if (activeMethod.indexOf('hover') !== -1) {
      containerProps.onMouseEnter = this.onMouseEnter;
      containerProps.onMouseLeave = this.onMouseLeave;
    }

    const label = React.createElement('a', labelProp, props.label);
    return <div
      className={classNames(
      `${prefix}${props.className}`,{
      visible: this.state.isOpen})} {...containerProps} >
      {label}
      {this.getDropdownContent(this.props.children)}
    </div>
  }
}
