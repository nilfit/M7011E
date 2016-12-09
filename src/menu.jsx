import React from 'react';
import {Link, IndexLink} from 'react-router';
import LoginButton from './components/login-button.jsx';
import LogoutButton from './components/logout-button.jsx';

export default class Menu extends React.Component{
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
    let buttons = null;
    if (isLoggedIn) {
      buttons =
        <ul>
          <li><LogoutButton unsetLogin={this.unsetLogin} /></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/profile/1">Profile</Link></li> {/*Should link to the current user's profile. '1' is a test value*/}
          <li><Link to="/feed">Feed</Link></li>
        </ul>;
    } else {
      buttons =
        <ul>
          <li><LoginButton setLogin={this.setLogin} /></li>
          <li><Link to="/about">About</Link></li>
        </ul>;
    }
    return (
      <div className="menu">
        <h1>Birdsong</h1>
        {buttons}
      </div>
    )
  }
}