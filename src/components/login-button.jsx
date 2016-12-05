import React from 'react';

export default class LoginButton extends React.Component {
  onSignIn(googleUser) {
    alert("onSignIn was called!");
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/auth/google/callback');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status == 200) {
        // login successful
        var birdsongId = xhr.responseText;
        console.log('Signed in as: ' + birdsongId);
        // TODO decide what to actually do
        window.birdsongId = birdsongId;
        this.setLogin(birdsongId);
      } else {
        // TODO retry?
      }
    };
    xhr.send('idtoken=' + id_token);
  }

  renderGoogleLoginButton(){
    gapi.signin2.render('my-signin2', {
      'scope': 'openid',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      // 'onsuccess': ()=>alert('test')
      'onsuccess': this.onSignIn
    });
  }

  componentDidMount(){
    if (window.gapi) {
      this.renderGoogleLoginButton();
    } else {
      window.addEventListener('google-loaded',this.renderGoogleLoginButton);
    }
  }

  render() {
    return (
      <div>
        <div id='my-signin2'></div>
      </div>
    );
  }
}
