import React from 'react';
import Recorder from 'recorderjs';

export default class AudioRecorder extends React.Component {
  constructor(){
    super();
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
  }
  
  stopRecording() {
    this.recorder && this.recorder.stop();
    console.log('Stopped recording.');
    
    // create WAV download link using audio data blob
    this.createDownloadLink();
    
    //this.recorder.clear();
  }
  
  createDownloadLink() {
    this.recorder && this.recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      
      au.controls = true;
      au.src = url;
      li.appendChild(au);
      recordingslist.appendChild(li);
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
      <div>
        <button onClick={this.startRecording}>record</button>
        <button onClick={this.stopRecording}>stop</button>
        
        <h2>Recordings</h2>
        <ul id="recordingslist"></ul>
      </div>
    );
  }
}