"use strict";

require("babel/polyfill");

import React from "react";

let prefix = 'yx-';

/**
 * Toolbar Logo
 */
import Logo from "./business/Logo";
import UserInfo from "./business/UserInfo/UserInfo";
import Checkbox from "./components/Checkbox/Checkbox";
import Dropdown from "./components/Dropdown/Dropdown";
import Notice from "./components/Notice/Notice";
import Tab from "./components/Tab/Tab";
var TabPane = Tab.TabPane;

export default class Toolbar extends React.Component {

  static defaultProps = {
    prefix: prefix
  };

  render() {
    let divStyle = {
      "width": "300",
      "height": "200",
      "background": "darkgreen",
      "color": "red",
      "position": "absolute"
    };
    return (
      <div className="toolbar-wrap">
        <div className="toolbar-l">
          <Logo/>
          <Dropdown label={"花千骨是啥"} {...this.props} elementType={'btn'}>
            <div style={divStyle} className="custom1">
              <label></label>
              <ul>
                <li>asdf</li>
                <li>asdf</li>
                <li>ddd</li>
              </ul>
            </div>
          </Dropdown>
          <Notice/>
        </div>
        <div className="toolbar-r">
          <UserInfo/>
          <a href="#" className="closeBtn">关闭</a>
        </div>
      </div>
    )
  }
}
// <Dropdown label={"晕死"} {...this.props} elementType={'btn'}>
//   <Tab  style={divStyle} prefix={prefix}>
//     <TabPane tabName="one">One</TabPane>
//     <TabPane tabName="two">Two</TabPane>
//     <TabPane tabName="three">Three</TabPane>
//   </Tab>
// </Dropdown>

//React.render(<Tab prefix={prefix}>
//  <TabPane tabName="one">One</TabPane>
//  <TabPane tabName="two">Two</TabPane>
//  <TabPane tabName="three">Three</TabPane>
//</Tab>, document.getElementById('test'));

React.render(<Toolbar />, document.getElementById('toolbar'));


