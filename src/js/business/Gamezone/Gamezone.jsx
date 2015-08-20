"use strict";

import React from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import Tab from "../../components/Tab/Tab";
import TabPane from "../../components/Tab/TabPane";

let prefix = 'yx-';

export default class Checkbox extends React.Component {

  static defaultProps = {
    prefix: prefix,
    className: 'gamezone'
  };

  constructor(props) {
    super(props);
  }

  state = {isOpen: false};

  render() {

    let divStyle = {
      "width": "436",
      "height": "243",
      "position": "absolute",
      "left": 0
    };

    return (
      <Tab style={divStyle} {...this.props}>
        <TabPane tabName="精品游戏"></TabPane>
        <TabPane tabName="端游">Two</TabPane>
        <TabPane tabName="小游戏">Three</TabPane>
      </Tab>
    );
  }

}
