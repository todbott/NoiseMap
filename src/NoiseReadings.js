import React, { Component } from 'react';
import { getNoiseReadings } from './services/BackendConnector';

class NoiseReadings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readings: null
    };
  }
  async componentWillMount() {
    await getNoiseReadings().then((res) => {
      this.setState({readings: res})
      console.log(res)
    })
  }


  render() {

    console.log(typeof(this.state.readings))
  
    return ( 
      <div id="hey">
        {JSON.stringify(this.state.readings)}
      </div>
    );
  }
}

export default NoiseReadings;
