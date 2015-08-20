"use strict";

import React from "react";
import Dropdown from "../../components/Dropdown/Dropdown";

let prefix = 'yx-';

export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);
  }

  static defaultProps = {
    prefix: prefix
  };

  state = {isOpen: true};

  render() {

    let divStyle = {
      "width": "300",
      "height": "200",
      "background": "white",
      "color": "red",
      "position": "absolute"
    };

    return (
      <Dropdown label={"礼包"} {...this.props} elementType={'label'} activeMethod={'hover'}>
        <div style={divStyle} className="custom1">
          <label></label>
          <ul>
            <li>asdf</li>
            <li>asdf</li>
            <li>ddd</li>
          </ul>
        </div>
      </Dropdown>
    );
  }

}
