import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.page = 0;
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
  
  unfollowUser(){
    $.ajax({
      method: "POST",
      url: "/api/user/"+this.props.params.userId+"/unfollow",
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
        console.log("followed");
      }
    });
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
      url: "/api/user/"+userId+"/following/"+this.page,
      success: (resp) => {
        this.page = this.page + 1;
        this.setState({
          following: resp,
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
    if (newProps.userId !== 'undefined'){
      this.page = 0;
      this.loadProfile(newProps.params.userId);
    }
  }
  
  handleClick() {
    event.preventDefault();
    console.log("handleclickerino");
    //Fetch another 10 followed users
    if (this.state.following.length > 0){
      $.ajax({
        method: "GET",
        url: "/api/user/"+this.props.params.userId+"/following/"+this.page,
        success: (resp) => {
          console.log("more posts success");
          console.log(resp);
          this.page = this.page + 1;
          this.setState((prevState) => ({
            following: prevState.following.concat(resp),
          }));
        }
      });
    }else{
      console.log("No posts to get");
    }
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
          <li><FollowingList following={this.state.following}/></li>
          <li><input type="button" value="Load More" onClick={this.handleClick}/></li>
        </ul>
      </div>
    );
  }
}

class FollowingList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.following.map(item => (
          <li key={item._id}><UserDisplay userInfo={item}/></li>
        ))}
      </ul>
    );
  }
}

class UserDisplay extends React.Component {
  render() {
    return (
      <ul>
        <li><img src={this.props.userInfo.picture} height="60" width="60" alt="profile picture" className="post_img"/></li>
        <li><Link to={"/profile/"+this.props.userInfo._id}>{this.props.userInfo.name}</Link></li>
      </ul>
    )
  }
}