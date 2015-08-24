"use strict";

import React from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import Tab from "../../components/Tab/Tab";
import TabPane from "../../components/Tab/TabPane";

import JingpinGame from "./JingpinGame"


let prefix = 'yx-';

export default class AllGame extends React.Component {

  static defaultProps = {
    prefix: prefix,
    className: 'allgame'
  };

  constructor(props) {
    super(props);
  }

  state = {isOpen: false};

  render() {

    let divStyle = {
      "width": "436",
      "height": "200",
      "position": "absolute",
      "left": 0
    };

    return (
      <Tab style={divStyle} {...this.props}>
        <TabPane tabName="精品游戏">
          <JingpinGame />
        </TabPane>
        <TabPane tabName="端游">Two</TabPane>
        <TabPane tabName="小游戏">Three</TabPane>
      </Tab>
    );
  }

}
