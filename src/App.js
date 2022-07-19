import React, { Component } from 'react';
import AudioAnalyzer from './audioAnalyzer';
import { putNoiseReading } from './services/BackendConnector';
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import MySpinner from './components/MySpinner';
import Form from 'react-bootstrap/Form'
import FeatureGetter from './services/FeatureGetter';
const overpass = require('query-overpass')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      seconds: 10,
      samples: 0,
      completedSamples: 0,
      samplingInProgress: false,
      audioArray: Array(1024).fill(0),
      latitude: 0,
      longitude: 0,
      showSpinner: false,
      showModal: false,
      pin: "",
      geoJson: ""
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePinChange = this.handlePinChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  dataHandler = async (error, osmData) => {

      if (!error && osmData.features !== undefined) {
        let data = {
          lat: this.state.latitude,
          long: this.state.longitude,
          reading: this.state.audioArray,
          date: new Date().toISOString().split("T")[0]
        }
        FeatureGetter(osmData['features'])
        await putNoiseReading(data).then((res) => console.log(res))  
        console.log(data)
        this.setState({showSpinner: false})
        this.setState({seconds: 10})
        if (this.state.completedSamples < this.state.samples) {
          this.getSample()
        } else {
          this.setState({samplingInProgress: false})
        }
      } else {
        this.setState({showSpinner: false})
        this.setState({seconds: 10})
        if (this.state.completedSamples < this.state.samples) {
          this.getSample()
        } else {
          this.setState({samplingInProgress: false})
        }
      }
  };


  async sendToBackend() {
    if (process.env.REACT_APP_PINS.includes(this.state.pin)) {
      this.setState({showSpinner: true})

      // This gets our bounding box
      let lat = this.state.latitude
      let long = this.state.longitude
      let n  = lat  + (100 / 6371000.0) * (180 / Math.PI);
      let s = lat  + (-100 / 6371000.0) * (180 / Math.PI);
      let e = long + (100 / 6371000.0) * (180 / Math.PI) / Math.cos(lat * Math.PI/180);
      let w = long + (-100 / 6371000.0) * (180 / Math.PI) / Math.cos(lat * Math.PI/180);

      // we use SWNE order
      let query = `[out:json];way(${s},${w},${n},${e});(._;>;);out;`
      console.log(query)
      const options = {
        flatProperties: true
      };
      overpass(query, this.dataHandler, options)
    };


      
    
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    this.setState({showModal: false})
    this.setState({seconds: 10})
  }

  handlePinChange(e) {
    this.setState({pin: e.target.value})
  }

  handleNumberChange(e) {
    this.setState({samples: e.target.value})
  }

  handleClose() {
    this.setState({showModal: false})
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

    if (process.env.REACT_APP_PINS.includes(this.state.pin)) {
        this.setState({samplingInProgress: true})
        this.getSample()
      }
  }

  async getSample() {

      this.setState({completedSamples: this.state.completedSamples+1})
      await this.position()
      this.getMicrophone();
      const interval = setInterval(() => {
          this.setState({seconds: this.state.seconds - 1})
          console.log(this.state.seconds)
      }, 1000);

      let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

      await wait(11000);
      this.stopMicrophone()
      clearInterval(interval)
      await this.sendToBackend();
  }

  async componentDidMount() {
    await this.position()
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({showModal: true})
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
  
    return (
        <div className="app">
        <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{this.state.modalTitle}</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    10 second samples will now be gathered consecutively.  Choose how many samples you want to gather, then enter your pin and click "Set", then click the "Start sampling" button.
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>PIN</Form.Label>
                        <Form.Control type="password" placeholder="Pin" onChange={this.handlePinChange}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="sampleNumber">
                        <Form.Label>Number of samples</Form.Label>
                        <Form.Control type="email" placeholder="number" onChange={this.handleNumberChange}/>
                      </Form.Group>
                      <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Set
                      </Button>
                    </Form>
                </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            </Modal.Footer>
        </Modal>
          { this.state.showSpinner ? 
            (
              <MySpinner />
            ) : (<></>)
          }
        
        <div className="controls">
        { this.state.samplingInProgress == false ? 
          (
            <button onClick={this.toggleMicrophone}>
              Start sampling
            </button>
          ) : 
          (
            <div>Sampling in progress: {this.state.seconds}</div>
          )
        }       
        </div>
        {this.state.audio ? <AudioAnalyzer audio={this.state.audio} atEverySecond={this.atEverySecond}/> : ''}
        
      </div>
    );
  }
}

export default App;
