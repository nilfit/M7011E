import React from 'react';

//Renders a simply homepage
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Birdsong!</h1>
        <p> 
          Please sign in to access the website.
        </p>
      </div>
    );
  }
}