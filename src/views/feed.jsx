import React from 'react';
import Post from '../components/post.jsx';
import PostCreator from '../components/post-creator.jsx';

export default class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      posts:[],
      pageNumber: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    //Fetch the first 10 posts
    $.ajax({
      method: "GET",
      url: "/api/feed/",
      success: (resp) => {
        this.setState((prevState) => ({
          posts: prevState.posts.concat(resp),
          pageNumber: prevState.pageNumber + 1
        }));
      }
    });
  }
  
  handleClick(event){
    event.preventDefault();
    //Fetch another 10 posts
    var lastUploadDate = this.state.posts[this.state.posts.length-1].uploadDate;
    $.ajax({
      method: "GET",
      url: "/api/feed/"+lastUploadDate,
      success: (resp) => {
        this.setState((prevState) => ({
          posts: prevState.posts.concat(resp),
          pageNumber: prevState.pageNumber + 1
        }));
      }
    });
  }
  
  render() {
    return (
      <div>
        <PostCreator/>
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