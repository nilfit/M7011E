import React from 'react';

//Component logs the user out
export default class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignOut() {
    // tell google, then the LoginControl component
    gapi.auth2.getAuthInstance().signOut().then( () => this.props.unsetLogin());
    // tell the server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/auth/logout');
    xhr.onload = () => {
      if (xhr.status == 200) {
        // logout successful
      } else {
        // TODO retry?
      }
    };
    xhr.send();
  }

  render() {
    return (
      <button onClick={this.onSignOut}>
        Logout
      </button>
    );
  }
}
