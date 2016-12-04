import React from 'react';

export default class Login extends React.Component {
  onSignIn(googleUser) {
    googleUser.grantOfflineAccess({'scope': 'openid', 'redirect_uri': 'postmessage'}).then( function(resp) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
          console.log("POST request successful");
        }
      };
      xhttp.open("POST", "/auth/google/callback", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("code=" + resp.code);
      
      console.log('resp:' + resp.code);
    });
    
    
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }
  
  renderGoogleLoginButton(){
    gapi.signin2.render('my-signin2', {
      'scope': 'openid',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn
    });
  }
  
  componentDidMount(){
    if (window.gapi) {
      this.renderGoogleLoginButton();
    }else {
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