import React from 'react';
import LoginButton from './login-button.jsx';
import LogoutButton from './logout-button.jsx';

export default class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);
    this.unsetLogin = this.unsetLogin.bind(this);
    this.state = {loginId: null};
  }

  setLogin(id) {
    this.setState({loginId: id});
  }
  unsetLogin() {
    this.setState({loginId: null});
  }

  render() {
    const isLoggedIn = (this.state.loginId != null);
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton unsetLogin={this.unsetLogin} />;
    } else {
      button = <LoginButton setLogin={this.setLogin} />;
    }
    return button;
  }
}
