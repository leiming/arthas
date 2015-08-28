"use strict";

require("babel/polyfill");
//require('./components/utils/addEventListener-polyfill');

import React from "react";

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
      <div>
        <ul>
          <li>
            <div>
              <div className="hd">Checkbox</div>
              <div className="bd">
                <Checkbox/>
              </div>
            </div>
          </li>
          <li>
            <div>
              <div className="hd">Dropdown          <button onClick={this.onClick}>setDropdown</button></div>
              <div className="bd">
                <Dropdown label="Dropdown" setSwitch={this.state.isOpen}>
                  <div>
                    <ul>
                      <li>aaa</li>
                      <li>bbb</li>
                      <li>ccc</li>
                    </ul>
                  </div>
                </Dropdown>
              <li></li>
              </div>
            </div>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    )
  }
}


React.render(<Sample />, document.getElementById('sample'));


