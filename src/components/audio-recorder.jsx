import React from 'react';
import Recorder from 'recorderjs';

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
    this.createDownloadLink = this.createDownloadLink.bind(this);
    
    var audio_context;
    var recorder;
  }

  startUserMedia(stream) {
    var input = this.audio_context.createMediaStreamSource(stream);
    console.log('Media stream created.');
    
    this.recorder = new Recorder(input);
    console.log('Recorder initialised.');
  }
  
  
  startRecording() {
    this.recorder && this.recorder.record();
    console.log('Recording...');
    document.getElementById("startButton").disabled = true;
    document.getElementById("stopButton").disabled = false;
    
    this.setState({
      status: " Recording..."
    });
  }
  
  stopRecording() {
    this.recorder && this.recorder.stop();
    console.log('Stopped recording.');
    
    document.getElementById("startButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("chirp").disabled = false;
    
    this.setState({
      status: " Recording done."
    });
    
    // create WAV download link using audio data blob
    this.createDownloadLink();
    
    //Broken because of a bug.
    this.recorder.clear();
  }
  
  createDownloadLink() {
    this.recorder && this.recorder.exportWAV((blob) => {
      this.props.setAudioBlob(blob);
      var url = URL.createObjectURL(blob);
      var au = document.getElementById("recording");
      au.src = url;
    });
  }
  
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