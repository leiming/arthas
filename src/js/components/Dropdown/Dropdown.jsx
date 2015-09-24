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
      style: child.props.style,
      ref: 'dropdown-content',
      tabIndex: -1,
      hideFocus: true
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

  setVisible = (visible, callback) => {
    if (this.state.isOpen !== !!visible) {
      this.emitChange();
    }

    const visibleObj = {isOpen: !!visible};

    this.setState(visibleObj, ()=> {
      typeof callback === 'function' && callback(visibleObj)
    });

  };

  onClick = (e) => {

    const openState = !this.state.isOpen;

    if (openState) {
      this.bindOuter()
    } else {
      this.unbindOuter()
    }

    const content = React.findDOMNode(this.refs['dropdown-content']);
    console.log(content);

    $(content).on('focus', function (e) {
      console.log(e.type);
    });

    $(content).on('blur', function (e) {
      console.log(e.type);
    });

    this.setVisible(openState, ()=> {
      $(content).focus();
    });

    $(content).focus();
    e.preventDefault();
    e.stopPropagation();
  };

  onMouseEnter = (e) => {
    this.setVisible(true);
  };

  onMouseLeave = (e) => {
    this.setVisible(false);
  };

  emitChange = () => {
    if (typeof this.props.onVisibleChange === 'function') {
      this.props.onVisibleChange({isOpen: this.state.isOpen});
    }
  };


  componentDidMount = () => {
    const cancelBtn = $ && $(React.findDOMNode(this)).find('.cancel');
    if (cancelBtn.length) {
      $(cancelBtn).click((e)=> {
        this.setVisible(false);
      })
    }
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

    containerProps.onFocus = () => {
      console.log('focus');
    };

    containerProps.onBlur = () => {
      console.log('blur');
    };

    const label = <a {...labelProp}>{props.label}
      <i className={`${prefix}${props.className}-ico`}></i></a>;

    //const dropdownProps = Object.assign({}, {className: classNames(
    //  `${prefix}${props.className}`, {visible: this.state.isOpen})}, containerProps);
    //
    //return React.cloneElement('div', dropdownProps, [label, this.getDropdownContent(this.props.children)]);

    const content = this.getDropdownContent(this.props.children);

    return <div
      className={classNames(
      `${prefix}${props.className}`,{
      visible: this.state.isOpen})}>
      {label}
      {React.cloneElement(content, containerProps)}
    </div>
  }
}
