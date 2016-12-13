import React from 'react';
import Post from '../components/post.jsx';
import PostCreator from '../components/post-creator.jsx';

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
  }
  
  updateUrl(tag){
    //If the tag param is undefined (not set), we get the global feed, else the tag specific feed
    if (typeof tag != 'undefined'){
      this.requestUrl = "/api/tag/"+tag;
    }else{
      this.requestUrl = "/api/feed";
    }
  }
  
  
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
  
  handleClick(event){
    event.preventDefault();
    //Fetch another 10 posts
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
  }
  
  render() {
    return (
      <div>
        <PostCreator getFeed={this.getFeed}/>
        <h2>Feed</h2>
        <div className="feed">
          <FeedList posts={this.state.posts}/>
          <input type="button" value="Load More" onClick={this.handleClick}/>
        </div>
      </div>
    );
  }
}

class FeedList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.posts.map(item => (
          <li key={item.postid}><Post postInfo={item}/></li>
        ))}
      </ul>
    );
  }
}