import React, { Component } from 'react';
import AudioAnalyzer from './audioAnalyzer';
import { putNoiseReading } from './services/BackendConnector';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      seconds: 0,
      samplingInProgress: false,
      audioArray: Array(1024).fill(0),
      latitude: 0,
      longitude: 0
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

  async toggleMicrophone() {

    this.getMicrophone();
    this.setState({samplingInProgress: true})
    const interval = setInterval(() => {
        this.setState({seconds: this.state.seconds + 1})
        console.log(this.state.seconds)
    }, 1000);

    let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    await wait(11000);
    this.stopMicrophone()
    clearInterval(interval)
    this.setState({samplingInProgress: false})
    let data = {
      lat: this.state.latitude,
      long: this.state.longitude,
      reading: this.state.audioArray,
      date: new Date().toISOString().split("T")[0]
    }
    await putNoiseReading(data).then((res) => console.log(res))  
  }

  async componentDidMount() {

    await this.position()
      


  }


  position = async () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({latitude: position.coords.latitude})
        this.setState({longitude: position.coords.longitude})
      })
    }

  atEverySecond = (val) => {
    
    let values = this.state.audioArray

    // What are the values this time around?
    let  newValues = val

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
