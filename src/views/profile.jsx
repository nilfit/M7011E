import React from 'react';

export default class ProfileWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      userName: "",
      userDescription: "",
      userImage: ""
    }
  }
  
  componentDidMount() {
    //Do some stuff here with the api
  }
  
  componentWillReceiveProps(newProps){
    //Do some stuff here with the api
  }
  
  render() {
    return (
      <div>
        <Profile userName="birdboy" userDescription="Hello my name is birdboy" userImage="./bird.png"/>{/*testvalue*/}
      </div>
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <ul>
          <li><img src={this.props.userImage} height="60" width="60" alt="profile picture" className="post_img"/></li>
          <li>{this.props.userName}</li>
          <li><h3>Description:</h3><p>{this.props.userDescription}</p></li>
        </ul>
      </div>
    );
  }
}