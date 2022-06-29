import React, { Component } from 'react';
import AudioAnalyzer from './audioAnalyzer';
import { putNoiseReading } from './services/BackendConnector';
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import MySpinner from './components/MySpinner';
import Form from 'react-bootstrap/Form'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      seconds: 10,
      samplingInProgress: false,
      audioArray: Array(1024).fill(0),
      latitude: 0,
      longitude: 0,
      showSpinner: false,
      showModal: false,
      pin: ""
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePinChange = this.handlePinChange.bind(this);
    this.handleClose = this.handleClose.bind(this)
  }


  handleSubmit(event) {
    event.preventDefault();
    this.setState({showSpinner: true})
    let data = {
      lat: this.state.latitude,
      long: this.state.longitude,
      reading: this.state.audioArray,
      date: new Date().toISOString().split("T")[0]
    }
    //await putNoiseReading(data).then((res) => console.log(res))  
    console.log(data)
    this.setState({showSpinner: false})
    this.setState({showModal: false})
  }

  handlePinChange(e) {
    this.setState({pin: e.target.value})
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

    this.getMicrophone();
    this.setState({samplingInProgress: true})
    const interval = setInterval(() => {
        this.setState({seconds: this.state.seconds - 1})
        console.log(this.state.seconds)
    }, 1000);

    let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    await wait(11000);
    this.stopMicrophone()
    clearInterval(interval)
    this.setState({samplingInProgress: false})
    this.setState({showModal: true})
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
  
    return (
        <div className="app">
        <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{this.state.modalTitle}</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    Your 10-second recording has been captured.  Enter your pin and click "Send" to send it to the database.
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>PIN</Form.Label>
                        <Form.Control type="password" placeholder="Pin" onChange={this.handlePinChange}/>
                      </Form.Group>
                      
                      <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Send
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
