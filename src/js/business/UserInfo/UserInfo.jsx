import React from 'react';
import classNames from 'classnames';


export default class UserInfo extends React.Component {

  state = {};

  static defaultProps = {
    userType: 'yx'
  };

  componentDidMount() {
    $.get('/users/uid123sfsf', function (data) {
      this.setState(data);
    }.bind(this))
  }

  render() {
    return <span><img src={this.state.avatar} width="20" alt={this.state.uid}/> {this.state.uid}</span>;
  }
}
