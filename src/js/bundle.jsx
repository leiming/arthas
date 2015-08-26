"use strict";

require("babel/polyfill");
//require('./components/utils/addEventListener-polyfill');

import React from "react";

let prefix = 'yx-';

import Logo from "./business/Logo";
import Chat from "./business/Chat/Chat";
import AllGame from "./business/AllGame/AllGame";
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
    let gamezoneStyle = {
      "width": "436",
      "height": "200",
      "position": "absolute",
      "right": 0
    };

    return (
      <div className={classNames("toolbar-wrap", {visible: this.state.isOpen})}>
        <div className="toolbar-l">
          <Logo/>
          <Dropdown label={"花千骨——不删档15服"} isOpen={false} {...this.props} elementType={'btn'}>
            <div className="gamezone-list">
              <div className="gamezone-section">
                <label className="title">最近登录</label>
                <ul>
                  <li className="list-item active"><a href="#">双线977服-福寿齐天</a></li>
                  <li className="list-item"><a href="#">双线931服-一劳永逸</a></li>
                </ul>
              </div>
              <hr className="divide"/>
              <div className="gamezone-section">
                <label className="title">最新开服</label>
                <ul>
                  <li className="list-item"><a href="#">双线977服-如雷灌耳</a></li>
                  <li className="list-item"><a href="#">双线931服-生龙活虎</a></li>
                  <li className="list-item"><a href="#">双线931服-生龙活虎</a></li>
                  <li className="list-item"><a href="#">双线931服-生龙活虎</a></li>
                </ul>
              </div>
              <div className="gamezone-section allzones">
                <a href="#">全部服务器 ></a>
              </div>
            </div>
          </Dropdown>
          <Notice/>
        </div>
        <div className="toolbar-r">
          <UserInfo/>
          <div className="user-opt">
            <a href="#" className="saveid-btn">保存账号</a>
            <a href="#" className="qd-btn">签到</a>
          </div>
          <ul className="ul-list">
            <li><Package/></li>
            <li><a href="#">社区</a></li>
            <li><a href="#">秀场</a></li>
            <li><a href="#">充值</a></li>
            <li><Chat/></li>
            <li className="allgame">
              <AllGame />
             </li>
          </ul>
          <div className="actions">
            <a href="#" className="close-btn" onClick={this.closeHandler}>关闭</a>
          </div>
        </div>
      </div>
    )
  }
}

// React.render(<AllGame/>, document.getElementById('test'));

React.render(<Toolbar />, document.getElementById('toolbar'));


