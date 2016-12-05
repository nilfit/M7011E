import React from 'react';

export default class LogoutButton extends React.Component {
  onSignOut() {
    // tell google, then the LoginControl component
    gapi.auth2.getAuthInstance().signOut().then( () => this.unsetLogin());
    // tell the server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/auth/logout');
    xhr.onload = function() {
      if (xhr.status == 200) {
        // logout successful
        // TODO decide what to actually do
        window.birdsongId = null;
        // this.setLogin();
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
