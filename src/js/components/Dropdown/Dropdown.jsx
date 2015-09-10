"use strict";

import React from 'react';
import classNames from 'classnames';

export default class Dropdown extends React.Component {

  static defaultProps = {
    className: 'dropdown',
    activeMethod: 'click',
    elementType: 'label',
    isOpen: false,
    setSwitch: false
  };

  static propTypes = {
    className: React.PropTypes.string,
    activeMethod: React.PropTypes.oneOf(['click', 'hover']),
    elementType: React.PropTypes.oneOf(['label', 'btn']),
    isOpen: React.PropTypes.bool,
    setSwitch: React.PropTypes.bool
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
    if (typeof this.props.onVisibleChange === 'function') {
      if (this.state.isOpen !== !!visible) {
        this.props.onVisibleChange({visible: !!visible});
      }
    }
    this.setState({isOpen: !!visible});
  };

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

    const label = <a {...labelProp}>{props.label}
      <i className={`${prefix}${props.className}-ico`}></i></a>;

    return <div
      className={classNames(
      `${prefix}${props.className}`,{
      visible: this.state.isOpen})} {...containerProps} >
      {label}
      {this.getDropdownContent(this.props.children)}
    </div>
  }
}
