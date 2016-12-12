import React from 'react';
import {Link} from 'react-router';

export default class Post extends React.Component {
  constructor(props){
    super(props);
    this.audioType = this.props.postInfo.contentType;
    this.audioUrl = "api/post/"+this.props.postInfo.postid;
    //this.pic = this.propspostInfo.pic;
    //this.name = this.propspostInfo.name;
    this.pic = "./bird.png";
    this.name = "birdboy";
    this.tags = this.props.postInfo.tags;
    this.date = this.props.postInfo.uploadDate;
  }
  
  render() {
    return (
      <div className="post">
        <ul>
          <li><img src={this.pic} height="60" width="60" alt="profile picture" className="post_img"/></li>
          <li><Link to="/profile">{this.name}</Link></li>
        </ul>
        <ul>
          <li>
            <audio controls>
              <source src={this.audioUrl} type={this.audioType}/>
              Your browser does not support the audio element.
            </audio>
          </li>
          <li>{this.date}</li>
          <li>{this.tags.toString()}</li>
          {/*<li><TagList tags={this.tags}/></li>*/}
        </ul>
      </div>
    );
  }
}

class TagList extends React.Component {
  render() {
    return (
      <ul className="tagList">
        {this.props.tags.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
}