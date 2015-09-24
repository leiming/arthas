"use strict";

import React from "react";

export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);

    // http://babeljs.io/blog/2015/06/07/react-on-es6-plus/

    let checked = false;
    if ('checked' in props) {
      checked = !!props.checked;
    } else if ('defaultChecked' in props) {
      checked = !!props.defaultChecked;
    }

    this.state = {checked}
  }

  handleChange = (event) => {
    if (!('checked' in this.props)) {
      this.setState({
        checked: event.target.checked
      });
    }
    this.props.onChange && this.props.onChange(event);
  };

  render() {
    return <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}/>;
  }

}
