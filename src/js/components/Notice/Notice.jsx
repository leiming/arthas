"use strict";


import React from 'react';
import classNames from 'classnames';

export default class Dropdown extends React.Component {

  static defaultProps = {
    className: 'dropdown'
  };

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    let data = {
      "msg": [
        {"href": "#", "cont": "【炼身隐藏属性大曝光】谁说我鸡肋？"},
        {"href": "#", "cont": "【炼身隐藏属性大曝光】谁说我鸡肋？"},
        {"href": "#", "cont": "【炼身隐藏属性大曝光】谁说我鸡肋？"},
        {"href": "#", "cont": "【炼身隐藏属性大曝光】谁说我鸡肋？"}
      ]
    };
    this.setState(data);
  }

  state = {isOpen: false, msg: []};

  render() {
    let msg = this.state.msg;
    let msgItems = msg.map(function (msg, key) {
      return <li><a href="{msg.href}">{msg.cont}</a></li>;
    });
    return (
      <div className="toolbar-notice">
        <i className="notice-icon">公告</i>
        <ul className="notice-ul">
          {msgItems}
        </ul>
      </div>
    );
  }
}
