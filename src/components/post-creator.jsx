import React from 'react';
import AudioRecorder from '../components/audio-recorder.jsx';
import $ from 'jquery';

export default class PostCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      audioblob: null,
      value: '',
      tags: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setAudioBlob = this.setAudioBlob.bind(this);
  }
  
  setAudioBlob(blob){
    this.setState({audioblob: blob});
  }

  //Submit the post request
  handleClick(event){
    event.preventDefault();
    var reader = new window.FileReader();
  
    //Encode the audioblob to base64
    reader.readAsDataURL(this.state.audioblob);
    reader.onloadend = () => {
      var base64data = reader.result;

      var json = JSON.stringify({
        "audio": base64data,
        "tags": this.state.tags
      });

      $.ajax({
        method: "POST",
        url: "/api/post",
        contentType: 'application/json',
        data: json,
        success: (resp) => {
          this.props.getFeed();
        }
      });
    };
  }

  //Update the input field value
  handleChange(event){
    this.setState(
      {
        value: event.target.value,
        tags: event.target.value.split(" ")
      }
    );
  }

  render() {
    return (
      <div className="post">
        <AudioRecorder setAudioBlob={this.setAudioBlob}/><br></br>
        Tags: <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter tags here"/><br></br>
        <button id="chirp" onClick={this.handleClick}>Chirp</button>
      </div>
    );
  }
}
