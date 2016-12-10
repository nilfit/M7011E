import React from 'react';
import Post from '../components/post.jsx';
import AudioRecorder from '../components/audiorecorder.jsx';

export default class Feed extends React.Component {
  
  constructor() {
    super();
    this.state = {
      posts:[]
    };
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    //Do some stuff here with the api
    
  }
  
  handleClick(event){
    event.preventDefault();
    //Load more posts
  }
  
  render() {
    return (
      <div>
        <AudioRecorder/>
        <h2>Feed</h2>
        <div className="feed">
          <Post name="birdboy94" audio="./marmot" img="./bird.png"/>
          <Post name="someDude" audio="./liketwitter" img="./face.png"/>
          <Post name="birdboy94" audio="./marmot" img="./bird.png"/>
          <input type="button" value="Load More" onClick={this.handleClick}/>
        </div>
      </div>
    );
  }
}