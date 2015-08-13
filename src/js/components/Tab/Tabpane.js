"use strict";

import React from 'react';

export default class TabPane extends React.Component {
  constructor(prop) {
    super(prop);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
