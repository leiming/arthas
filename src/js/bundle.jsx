"use strict";

import React from "react";
import ReactDOM from 'react-dom';

let prefix = 'yx-';

import Checkbox from "./components/Checkbox/Checkbox";
import Dropdown from "./components/Dropdown/Dropdown";
import Tab from "./components/Tab/Tab";

import classNames from 'classnames';

var TabPane = Tab.TabPane;

export default class Sample extends React.Component {

  static defaultProps = {
    prefix: prefix
  };

  state = {isOpen: true};

  onClick = () => {
    this.setState({isOpen: !this.state.isOpen})
  };

  render() {
    return (
      <Dropdown activeMethod='click'>
        <a className={'customToggle'}>aaaa
          <i>11</i>
        </a>
        <div className={'customContent'}>
          <ul>
            <li>aaa</li>
            <li>bbb</li>
            <li>ccc</li>
          </ul>
        </div>
      </Dropdown>
    )
  }
}


class SampleEvent extends React.Component {

  myClick = e => {
    console.log('myClick');
    console.log(this);
    console.log(this.props);
  };

  render() {
    return <div>
      <button onClick={this.myClick}>myClick</button>
    </div>
  }
}

ReactDOM.render(<Sample />, document.getElementById('sample'));
//ReactDOM.render(<SampleEvent />, document.getElementById('sample2'));
