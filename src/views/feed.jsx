import React from 'react';
import Post from '../components/post.jsx';

export default class Feed extends React.Component {
  render() {
    return (
      <div className="feed">
        <Post name="birdboy94" audio="./marmot" img="./bird.png"/>
        <Post name="someDude" audio="./liketwitter" img="./face.png"/>
        <Post name="birdboy94" audio="./marmot" img="./bird.png"/>
      </div>
    );
  }
}