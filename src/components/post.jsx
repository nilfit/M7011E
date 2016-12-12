import React from 'react';
import {Link} from 'react-router';

export default class Post extends React.Component {
  
  constructor(props){
    super(props);
    this.audio = this.props.audio;
    this.img = this.props.img;
    this.name = this.props.name;
    this.tags = this.props.tags;
    this.date = this.props.date;
  }
  
  render() {
    return (
      <div className="post">
        <ul>
          <li><img src={this.img} height="60" width="60" alt="profile picture" className="post_img"/></li>
          <li><Link to="/profile">{this.name}</Link></li>
        </ul>
        <ul>
          <li>
            <audio controls>
              <source src={this.audio+".ogg"} type="audio/ogg"/>
              <source src={this.audio+".mp3"} type="audio/mpeg"/>
              <source src={this.audio+".wav"} type="audio/wav"/>
              Your browser does not support the audio element.
            </audio>
          </li>
          <li>{this.date}</li>
          <li>{this.tags.toString()}</li>
        </ul>
      </div>
    );
  }
}