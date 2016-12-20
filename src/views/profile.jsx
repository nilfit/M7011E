import React from 'react';
import $ from 'jquery';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      userPicture: "",
      following: []
    }
    this.loadProfile = this.loadProfile.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.followUser = this.followUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  unfollowUser(id){
    $.ajax({
      method: "POST",
      url: "/api/user/"+id+"/unfollow",
      success: (resp) => {
        console.log("unfollowed");
      }
    });
  }
  
  followUser(){
    $.ajax({
      method: "POST",
      url: "/api/user/"+this.props.params.userId+"/follow",
      success: (resp) => {
        console.log("success");
      }
    });
  }
  
  testunfollow(){
    
  }
  
  //Fetch user information and list of people the user is following
  loadProfile(id){
    //Get user information
    let userId = id;
    $.ajax({
      method: "GET",
      url: "/api/user/"+userId,
      success: (resp) => {
        this.setState({
          userName: resp.name,
          userPicture: resp.picture
        });
      }
    });
    //Get all the users the user is following
    $.ajax({
      method: "GET",
      url: "/api/user/"+userId+"/following/1",
      success: (resp) => {
        console.log(resp);
        this.setState({
          following: resp
        });
      }
    });
  }
  
  //Triggers when the component is loaded into the DOM
  componentDidMount() {
    this.loadProfile(this.props.params.userId);
  }
  
  //Triggers when the component receives new props from parent component
  componentWillReceiveProps(newProps){
    this.loadProfile(newProps);
  }
  
  handleClick() {
    event.preventDefault();
    //Fetch another 10 followed users
    /*
    if (this.state.following.length > 0){
      $.ajax({
        method: "GET",
        url: this.requestUrl+"/"+lastUploadDate,
        success: (resp) => {
          this.setState((prevState) => ({
            posts: prevState.posts.concat(resp),
          }));
        }
      });
    }else{
      console.log("No posts to get");
    }
    */
  }
  
  render() {
    const sameUser = (window.id == this.props.params.userId);
    let button = null;
    if (!sameUser){
      button = <div>
        <button onClick={this.followUser}>Follow</button>
        <button onClick={this.unfollowUser}>Unfollow</button>
        </div>
    }
    return (
      <div className="profile">
        <ul>
          <li><img src={this.state.userPicture} height="60" width="60" alt="profile picture" className="post_img"/></li>
          <li>{this.state.userName}</li>
          <li>{button}</li>
          <li><h3>Following:</h3></li>
          <li><FollowingList following={this.state.following} unfollowUser={this.unfollowUser}/></li>
          <li><input type="button" value="Load More" onClick={this.handleClick}/></li>
        </ul>
      </div>
    );
  }
}

class FollowingList extends React.Component {
  render() {
    return (
      <div>
        {this.props.following.map(item => (
          <userDisplay userInfo={item} unfollowUser={this.props.unfollowUser}/>
        ))}
      </div>
    );
  }
}

class userDisplay extends React.Component {
  render() {
    const sameUser = (window.id == this.props.userInfo.userid);
    let button = null;
    if (!sameUser){
      button = <button onClick={this.props.unfollowUser} />
    }
    return (
      <ul className="post">
        <li><img src={this.props.userInfo.userPicture} height="60" width="60" alt="profile picture" className="post_img"/></li>
        <li>{this.props.userInfo.userName}</li>
        <li><button onClick={this.props.unfollowUser} /></li>
      </ul>
    )
  }
}