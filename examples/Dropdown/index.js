import React from "react";
import ReactDOM from 'react-dom';

import Dropdown from "../../src/js/components/Dropdown/Dropdown";

export default class Sample extends React.Component {
  onVisibleChange = () => {

  }

  render() {
    return (
      <Dropdown activeMethod='click' defaultVisible={true}>
        <span className={'customToggle'} onVisibleChange={this.onVisibleChange}>
          <span>toggle</span>
        </span>
        <div className={'customContent'}>
          <span className="dropdown-close">close</span>
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

ReactDOM.render(<Sample />, document.getElementById('root'));
