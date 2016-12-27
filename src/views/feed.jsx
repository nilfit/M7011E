import React from 'react';
import Post from '../components/post.jsx';
import PostCreator from '../components/post-creator.jsx';
import $ from 'jquery';

export default class Feed extends React.Component {
  constructor() {
    super();
    this.requestUrl = "/api/feed/";
    this.state = {
      posts:[],
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.getFeed = this.getFeed.bind(this);
    this.getFollowingFeed = this.getFollowingFeed.bind(this);
    this.getGlobalFeed = this.getGlobalFeed.bind(this);
  }
  
  //Updates the request url
  updateUrl(tag){
    //If the tag param is undefined (not set), we get the global feed, else the tag specific feed
    if (typeof tag != 'undefined'){
      this.requestUrl = "/api/tag/"+tag;
    }else{
      this.requestUrl = "/api/feed";
    }
  }
  
  //Get the feed using the set url.
  getFeed() {
    $.ajax({
      method: "GET",
      url: this.requestUrl,
      success: (resp) => {
        this.setState({
          posts: resp
        });
      }
    });
  }
  
  //Gets the global feed
  getGlobalFeed() {
    event.preventDefault();
    this.requestUrl = "/api/feed";
    this.getFeed();
  }
  
  //Gets the Following feed
  getFollowingFeed() {
    event.preventDefault();
    this.requestUrl = "api/user/"+localStorage.id+"/feed";
    this.getFeed();
  }
  
  //When the component is mounted (loaded into the HTML DOM), fetch the newest posts
  componentDidMount() {
    this.updateUrl(this.props.params.tag);
    //Fetch the first 10 posts
    $.ajax({
      method: "GET",
      url: this.requestUrl,
      success: (resp) => {
        this.setState((prevState) => ({
          posts: prevState.posts.concat(resp),
        }));
      }
    });
  }
  
  //When the component receives new props (for example on a page refresh), fetch the newest posts
  componentWillReceiveProps(nextProps){
    if (nextProps.params.tag != this.props.params.tag){
      //Component received new props. Empty the post list get the new posts
      this.updateUrl(nextProps.params.tag);
      $.ajax({
        method: "GET",
        url: this.requestUrl,
        success: (resp) => {
          this.setState({
            posts: resp
          });
        }
      });
    }
  }
  
  //Fetch the next posts
  handleClick(event){
    event.preventDefault();
    //Fetch another 10 posts (depends on how many posts each page consists of)
    if (this.state.posts.length > 0){
      var lastUploadDate = this.state.posts[this.state.posts.length-1].uploadDate;
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
  }
  
  render() {
    return (
      <div>
        <PostCreator getFeed={this.getFeed}/>
        <h2>Feed</h2>
        <button onClick={this.getGlobalFeed}>Global</button>
        <button onClick={this.getFollowingFeed}>Following</button>
        <div className="feed">
          <FeedList posts={this.state.posts} handleClick={this.handleClick}/>
        </div>
      </div>
    );
  }
}

//The component maps a list of posts to an unordered list of Post components
class FeedList extends React.Component {
  render() {
    let list = null;
    if (this.props.posts.length == 0){
      list = <p>No one has chirped anything.</p>
    }else{
      list = 
        <div>
          <ul>
            {this.props.posts.map(item => (
              <li key={item.postid}><Post postInfo={item}/></li>
            ))}
          </ul>
          <input type="button" value="Load More" onClick={this.props.handleClick}/>
        </div>
    }
    return (
      <div>
        {list}
      </div>
    );
  }
}