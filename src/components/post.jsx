import React from 'react';
import {Link} from 'react-router';
import javascript_time_ago from 'javascript-time-ago';

javascript_time_ago.locale(require('javascript-time-ago/locales/en'));
require('javascript-time-ago/intl-messageformat-global');
require('intl-messageformat/dist/locale-data/en');

//Component rendering a post.
export default class Post extends React.Component {
  constructor(props){
    super(props);
    this.audioType = this.props.postInfo.contentType;
    this.audioUrl = "api/post/"+this.props.postInfo.postid;
    this.pic = this.props.postInfo.picture;
    this.name = this.props.postInfo.name;
    this.tags = this.props.postInfo.tags;
    this.userid = this.props.postInfo.userid;
    
    const time_ago = new javascript_time_ago('en-US');
    const twitter = time_ago.style.twitter();
    
    //Use twitter-style timestamps on the posts
    this.date = time_ago.format(new Date(this.props.postInfo.uploadDate), twitter);
  }
  
  render() {
    return (
      <div className="post">
        <ul className="post_user">
          <li><img src={this.pic} height="60" width="60" alt="profile picture" className="post_img"/></li>
          <li><Link to={"/profile/"+this.userid}>{this.name}</Link></li>
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

//Maps a list of tags (strings) to an unordered list of links
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