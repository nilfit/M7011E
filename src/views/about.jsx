import React from 'react';

//Renders a simple about page
export default class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About Birdsong</h1>
        <p> 
          Birdsong is a social media website 
          designed for those who prefer listening to people instead of reading!
          Instead of posting boring text messages or pictures, Birdsong takes
          social interactions to the next level by allowing users to record and upload
          audio clips for their followers to listen to.
        </p>
        <p> 
          Birdsong was built using modern technologies such as React, an open-source
          JavaScript library for creating interactive user interfaces.
        </p>
      </div>
    );
  }
}