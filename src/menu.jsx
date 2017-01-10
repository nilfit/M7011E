import React from 'react';
import {Link, IndexLink} from 'react-router';
import LoginButton from './components/login-button.jsx';
import LogoutButton from './components/logout-button.jsx';

//Renders the menu bar at the top of the page.
export default class Menu extends React.Component{
  render() {
    const isLoggedIn = (this.props.loginId != null);
    let buttons = null;
    if (isLoggedIn) {
      buttons =
        <ul>
          <li><LogoutButton unsetLogin={this.props.unsetLogin} /></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to={"/profile/"+this.props.loginId}>Profile</Link></li>
          <li><Link to="/feed">Feed</Link></li>
        </ul>;
    } else {
      buttons =
        <ul>
          <li><LoginButton setLogin={this.props.setLogin} /></li>
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