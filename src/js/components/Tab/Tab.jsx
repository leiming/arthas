"use strict";

import React from 'react';
import TabPane from "./TabPane";
import classNames from 'classnames';

class Tab extends React.Component {

  static defaultProps = {
    tabCls: 'tab'
  };

  state = {
    activeIndex: 0
  };

  constructor(prop) {
    super(prop);
    this.state.activeIndex = prop.activeIndex || 0;
  }

  getTabLink = (children) => {
    const activeIndex = this.state.activeIndex;
    return React.Children.map(children, function (child, index) {
      if (child.type == TabPane) {
        return React.createElement('li', {
          className: classNames({
            [this.props.className ]: true,
            [`${this.props.prefix}${this.props.tabCls}-link`]: true,
            ['active']: (activeIndex === index)
          }),
          'data-index': index,
          onClick: this.clickTabLinkHandler.bind(this, index)
        }, child.props.tabName)
      }
    }.bind(this))
  };

  clickTabLinkHandler = (index) => {
    this.setState({'activeIndex': index});
  };

  getTabPane(children) {
    let paneProp = Object.assign({}, this.state, this.props);

    return React.Children.map(children, function (child, index) {
      if (child.type == TabPane) {
        return React.cloneElement(child, Object.assign({index: index}, paneProp, child.props));
      }
      return <span>null</span>
    })
  }

  render() {
    return <div>
      <ul>
        {this.getTabLink(this.props.children)}
      </ul>
      {this.getTabPane(this.props.children)}
    </div>;
  }
}


Tab.TabPane = TabPane;

export default Tab;
