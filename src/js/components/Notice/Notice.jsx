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

  render() {

    return <div className="toolbar-notice">notice</div>
  }
}
