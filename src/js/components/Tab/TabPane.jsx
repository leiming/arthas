"use strict";

import React from 'react';
import classNames from 'classnames';

export default class TabPane extends React.Component {

  static defaultProps = {
    tabPaneCls: 'pane'
  };

  render() {
    const props = this.props;
    const childrenProps = {
      className: classNames({
        [`${props.className}`]:true,
        [`${props.prefix}${props.tabCls}-${props.tabPaneCls}`]: true,
        [`active`]: (props.index === props.activeIndex)
      })
    };

    return <div {...childrenProps}>{this.props.children}</div>;
  }
}
