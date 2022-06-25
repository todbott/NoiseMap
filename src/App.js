import React, { Component } from 'react';
import AudioAnalyzer from './audioAnalyzer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      seconds: 0,
      samplingInProgress: false,
      audioArray: Array(1024).fill(0)
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {

    this.getMicrophone();
    this.setState({samplingInProgress: true})
    const interval = setInterval(() => {
        this.setState({seconds: this.state.seconds + 1})
        console.log(this.state.seconds)
    }, 1000);
    setTimeout(() => {
      this.stopMicrophone()
      clearInterval(interval)
      this.setState({samplingInProgress: false})
    }, 11000);
  }

  atEverySecond = (val) => {
    
    let values = this.state.audioArray

    // What are the values this time around?
    let  newValues = val

    console.log(values[0])
    console.log(newValues[0])

    for (let v = 0; v < values.length; v++) {
      if (newValues[v] > values[v]) {
        values[v] = newValues[v]
      }
    }

    this.setState({audioArray: values})
  }



  render() {

    const frequencyArray = this.state.audioArray.toString().split(",")
  
    return (
      <div className="App">
        <div className="controls">
        { this.state.samplingInProgress == false ? 
          (
            <button onClick={this.toggleMicrophone}>
              Start sampling
            </button>
          ) : 
          (
            <div>Sampling in progress</div>
          )
        }       
        </div>
        {this.state.audio ? <AudioAnalyzer audio={this.state.audio} atEverySecond={this.atEverySecond}/> : ''}
        {frequencyArray.map((value) => (
          <div>
            {value}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
