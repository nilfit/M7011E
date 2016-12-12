import React from 'react';
import {Link} from 'react-router';

export default class Post extends React.Component {
  constructor(props){
    super(props);
    this.audioType = this.props.postInfo.contentType;
    this.audioUrl = "api/post/"+this.props.postInfo.postid;
    this.pic = this.props.postInfo.picture;
    this.name = this.props.postInfo.name;
    this.tags = this.props.postInfo.tags;
    this.date = this.props.postInfo.uploadDate;
  }
  
  render() {
    return (
      <div className="post">
        <ul className="post_user">
          <li><img src={this.pic} height="60" width="60" alt="profile picture" className="post_img"/></li>
          <li><Link to="/profile/1">{this.name}</Link></li>
        </ul>
        <ul className="post_data">
          <li>
            <audio controls>
              <source src={this.audioUrl} type={this.audioType}/>
              Your browser does not support the audio element.
            </audio>
          </li>
          <li>{this.date}</li>
          <li><TagList tags={this.tags}/></li>
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
          <li key={item}><Link to={"/feed/"+item}>{item+", "}</Link></li>
        ))}
      </ul>
    );
  }
}