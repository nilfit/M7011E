import React from 'react';
import AudioRecorder from '../components/audio-recorder.jsx';

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

    reader.readAsDataURL(this.state.audioblob);
    reader.onloadend = () => {
      var base64data = reader.result;

      var json = JSON.stringify({
        "audio": base64data,
        "tags": this.state.tags
      });

      //AJAX POST REQUEST HERE
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
      <div>
        <AudioRecorder setAudioBlob={this.setAudioBlob}/>
        Tags: <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>Chirp</button>
      </div>
    );
  }
}
