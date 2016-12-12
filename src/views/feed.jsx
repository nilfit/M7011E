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
      url: "/api/feed/0",
      success: function( resp) {
        alert("success");
        console.log(resp);
        //Do something with the returned JSON
        
        //componentDidMount always fetches the first page
        this.setState({pageNumber: 1});
      }
    });
  }
  
  handleClick(event){
    event.preventDefault();
    //Fetch another 10 posts
    
    $.ajax({
      method: "GET",
      url: "/api/feed/"+this.state.pageNumber,
      success: function( resp) {
        alert("success");
        console.log(resp);
        //Do something with the returned JSON
        
        //Increment pageNumber by one
        this.setState({pageNumber: this.state.pageNumber + 1});
      }
    });
    
  }
  
  render() {
    //Temporary stuff for testing
    var currentDate = new Date();
    this.date = "Date: " + currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate();
    var tagArray = ["Hello","World", "no", "mytag", "help","imtrappedinatagfactory", "yourtag", "bird"];
    
    return (
      <div>
        <PostCreator/>
        <h2>Feed</h2>
        <div className="feed">
          <Post name="birdboy94" audio="./marmot" img="./bird.png" date={this.date} tags={tagArray}/>
          <Post name="someDude" audio="./liketwitter" img="./face.png" date={this.date} tags={tagArray}/>
          <Post name="birdboy94" audio="./marmot" img="./bird.png" date={this.date} tags={tagArray}/>
          <input type="button" value="Load More" onClick={this.handleClick}/>
        </div>
      </div>
    );
  }
}
/*
class FeedList extends React.Component {
  render() {
    return (
      <div className="feed">
        {this.props.posts.map(item => (
          <Post name={/* something? i have to get name} img={/*someimg} audio={/*someurl?} tags={/*sometag} date={/*somedate}/>
        ))}
      </div>
    );
  }
}
*/