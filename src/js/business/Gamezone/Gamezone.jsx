"use strict";

import React from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import Tab from "../../components/Tab/Tab";
import TabPane from "../../components/Tab/TabPane";

let prefix = 'yx-';

export default class Checkbox extends React.Component {
  
  static defaultProps = {
    prefix: prefix
  };

  constructor(props) {
    super(props);
  }
  
  state = {isOpen: false};

  render() {

    let divStyle = {
      "width": "300",
      "height": "200",
      "background": "darkgreen",
      "color": "red",
      "position": "absolute"
    };

    return (
      <Dropdown label={"全部游戏"} {...this.props} elementType={'btn'}>
          <Tab style={divStyle} >
            <TabPane tabName="one">One</TabPane>
            <TabPane tabName="two">Two</TabPane>
            <TabPane tabName="three">Three</TabPane>
          </Tab>
      </Dropdown>
    );
  }

}
