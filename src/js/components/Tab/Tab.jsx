"use strict";

import React from 'react';
import TabPane from "./TabPane";
import classNames from 'classnames';

class Tab extends React.Component {

  static defaultProps = {
    className: 'tab'
  };

  constructor(prop) {
    super(prop);
  }


  getTabLink = (children) => {
    console.log(children);
    return React.Children.map(children, function (child) {
      if (child.type == TabPane) {
        return React.createElement('li', {
          className: `${this.props.prefix}${this.props.className}-link`,
          onClick: this.clickTabLinkHandler
        }, child.props.tabName)
      }
    }.bind(this))
  };

  clickTabLinkHandler = (event) => {
    console.log(event.currentTarget);

  };

  getTabPane(children) {
    return React.Children.map(children, function (child) {
      if (child.type == TabPane) {
        return React.cloneElement(child, child.props);
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
