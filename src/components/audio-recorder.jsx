import React from 'react';
import Recorder from 'recorderjs';

//This component handles all audio recording
export default class AudioRecorder extends React.Component {
  constructor(){
    super();
    this.state = {
      status: "",
    };
    
    this.startUserMedia = this.startUserMedia.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.startUserMedia = this.startUserMedia.bind(this);
    this.exportBlob = this.exportBlob.bind(this);
    
    var audio_context;
    var recorder;
  }
  
  //Initiates a recorder object
  startUserMedia(stream) {
    var input = this.audio_context.createMediaStreamSource(stream);
    console.log('Media stream created.');
    
    this.recorder = new Recorder(input);
    console.log('Recorder initialised.');
  }
  
  //Starts the audio recording. 
  startRecording() {
    this.recorder && this.recorder.record();
    console.log('Recording...');
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
    
    this.setState({
      status: " Recording..."
    });
  }
  
  //Stops the audio recording
  stopRecording() {
    this.recorder && this.recorder.stop();
    console.log('Stopped recording.');
    
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("chirp").disabled = false;
    
    this.setState({
      status: " Recording done."
    });
    
    this.exportBlob();
    //Clears the recording so that a new recording is started the next time startRecording is called
    this.recorder.clear();
  }
  
  //Converts the blob to an url for use in an audio tag
  //Also calls a callback (setAudioBlob) to send the blob up to the parent component
  exportBlob() {
    this.recorder && this.recorder.exportWAV((blob) => {
      this.props.setAudioBlob(blob);
      var url = URL.createObjectURL(blob);
      var au = document.getElementById("recording");
      au.src = url;
    });
  }
  
  //When the component is mounted, set up all the necessary parts
  componentDidMount() {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      this.audio_context = new AudioContext;
      console.log('Audio context set up.');
      console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }
  
    navigator.getUserMedia({audio: true}, this.startUserMedia, function(e) {
      console.log('No live audio input: ' + e);
    });
  }
  
  render() {
    return (
      <span>
        <audio id="recording" controls="controls"></audio><br></br>
        <button id="startButton" onClick={this.startRecording}>Record</button>
        <button id="stopButton" onClick={this.stopRecording}>Stop</button>
        <span style={{color: 'red'}}>{this.state.status}</span>
      </span>
    );
  }
}