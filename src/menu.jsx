import React from 'react';
import {Link, IndexLink} from 'react-router'

export default class Menu extends React.Component{
  render() {
    return (
      <div className="menu">
        <ul>
          <li><h1>Birdsong</h1></li>
          <li><Link to="/login">Sign in</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/profile/1">Profile</Link></li> {/*Should link to the current user's profile. '1' is a test value*/}
          <li><Link to="/feed">Feed</Link></li>
        </ul>
      </div>
    )
  }
}