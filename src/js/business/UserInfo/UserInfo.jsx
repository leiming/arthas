import React from 'react';
import classNames from 'classnames';


export default class UserInfo extends React.Component {

  state = {};

  static defaultProps = {
    userType: 'yx'
  };

  componentDidMount() {
    var data = {
      avatar: 'http://www.lai0791.com/SJM/youxi/index/logo.png',
      uid: '1101'
    };

    this.setState(data);
  }

  render() {
    return (
      <span className="toolbar-userInfo">
        <img src={this.state.avatar} width="20" alt={this.state.uid}/>
        <i>{this.state.uid}</i>
      </span>
    );
  }
}
