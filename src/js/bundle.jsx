"use strict";

require("babel/polyfill");

import React from "react";

let prefix = 'yx-';

/**
 * Toolbar Logo
 */
import Logo from "./components/Logo";
import Checkbox from "./components/Checkbox/Checkbox";
import Dropdown from "./components/Dropdown/Dropdown";
import Tab from "./components/Tab/Tab";
var TabPane = Tab.TabPane;

export default class Toolbar extends React.Component {

  static defaultProps = {
    prefix: prefix
  };

  outerOnChange(event) {
    console.log(event.target.checked);
  }

  render() {
    let divStyle = {
      "width": "300",
      "height": "200",
      "background": "darkgreen",
      "color": "red"
    };
    return (
      <div>Toolbar
        <Logo/>
        <Checkbox defaultChecked={true} onChange={this.outerOnChange}/>
        <Dropdown label={"出息"} {...this.props} elementType={'btn'}>
          <div style={divStyle} className="custom1">
            <ul>
              <li>asdf</li>
              <li>asdf</li>
              <li>ddd</li>
            </ul>
            dddd
          </div>
        </Dropdown>
      </div>
    )
  }
}

React.render(<Tab prefix={prefix}>
  <TabPane tabName="one">One</TabPane>
  <TabPane tabName="two">Two</TabPane>
  <TabPane tabName="three">Three</TabPane>
</Tab>, document.getElementById('test'));

React.render(<Toolbar />, document.getElementById('toolbar'));


