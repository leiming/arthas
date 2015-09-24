"use strict";

require("babel/polyfill");
// require('./components/utils/addEventListener-polyfill');

import React from "react";
require('react/addons');

import Checkbox from "./components/Checkbox/Checkbox";
import Dropdown from "./components/Dropdown/Dropdown";
import Tab from "./components/Tab/Tab";

import classNames from 'classnames';

var TabPane = Tab.TabPane;

class Outer extends React.Component {

  static defaultProps = {};

  state = {outerStatus: true};

  onClick = () => {
    console.log(this.state.outerStatus);
    this.setState({outerStatus: !this.state.outerStatus})
  };

  onChange(state) {
    console.log('--outer onChange--');
    console.log(state);
  }

  render() {
    return (
      <div>
        <Dropdown label="a" onVisibleChange={this.onChange}>
          <div>
            <button className="cancel">close</button>
            asdfasdfasdfas
          </div>
        </Dropdown>
      </div>
    );
  }
}


class DropdownOne extends React.Component {

  state = {count: 0};

  render() {

    const newChildProps = {};

    newChildProps.onFocus = (e) => {
      console.log('focus');
    };

    newChildProps.onBlur = (e) => {
      console.log('blur');
    };

    newChildProps.onClick = (e) => {
      console.log(this.state.count);
      this.setState({count: ++this.state.count});
    };

    return <span>
      {React.cloneElement(React.Children.only(this.props.children), newChildProps)}
    </span>
  }
}

class DropdownTwo extends React.Component {

  state = {count: 0};

  render() {
    console.log('renderTwo');

    const newChildProps = {};

    newChildProps.onFocus = (e) => {
      console.log('focus');
    };

    newChildProps.onBlur = (e) => {
      console.log('blur');
    };

    newChildProps.onClick = (e) => {
      console.log(this.state.count);
      this.setState({count: ++this.state.count});
    };

    return <span>
      <button {...newChildProps}>two</button>
    </span>
  }
}

React.render(<DropdownOne>
  <button>one</button>
</DropdownOne>, document.getElementById('one'));

React.render(<DropdownTwo></DropdownTwo>, document.getElementById('two'));

React.render(<Outer />, document.getElementById('sample'));
