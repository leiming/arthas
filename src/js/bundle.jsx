"use strict";

require("babel/polyfill");

import React from "react";

let prefix = 'yx-';

/**
 * Toolbar Logo
 */
import Logo from "./business/Logo";
import Chat from "./business/Chat/Chat";
import Gamezone from "./business/Gamezone/Gamezone";
import Package from "./business/Package/Package";
import UserInfo from "./business/UserInfo/UserInfo";

import Checkbox from "./components/Checkbox/Checkbox";
import Dropdown from "./components/Dropdown/Dropdown";
import Notice from "./components/Notice/Notice";
import Tab from "./components/Tab/Tab";

import classNames from 'classnames';

var TabPane = Tab.TabPane;

export default class Toolbar extends React.Component {

  static defaultProps = {
    prefix: prefix
  };

  state = {isOpen: true};

  closeHandler = (e) => {
    console.log(this.state);
    e.preventDefault();
    e.stopPropagation();
    this.setState({isOpen: !this.state.isOpen});
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
      <div className={classNames("toolbar-wrap", {visible: this.state.isOpen})}>
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
          <a href="#" className="saveid-btn">保存账号</a>
          <a href="#" className="qd-btn">签到</a>
          <ul className="ul-list">
            <li><Package/></li>
            <li><a href="#">社区</a></li>
            <li><a href="#">秀场</a></li>
            <li><a href="#">充值</a></li>
            <li><Chat/></li>
            <li><Gamezone/></li>
          </ul>
          <a href="#" className="close-btn" onClick={this.closeHandler}>关闭</a>
        </div>
      </div>
    )
  }
}

React.render(<Toolbar />, document.getElementById('toolbar'));


