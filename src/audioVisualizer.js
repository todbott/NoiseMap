import React, { Component } from 'react';
import './audioVisualizer.css'
import { gsap } from 'gsap' 



class AudioVisualizer extends Component {
    constructor(props) {
        super(props);
        this.box = React.createRef();
      }

    componentDidMount() {
        gsap.to(this.box.current, { rotation: 360, duration: 1 });
      }
    
    componentDidUpdate() {
      gsap.to(this.box.current, { backgroundColor: `rgb(${this.props.audioData[0]},${this.props.audioData[500]},${this.props.audioData[1000]})`, 
                                  duration:1,
                                  width: this.props.audioData[0],
                                  height: this.props.audioData[0]});
                                }


    render() {


        return <span className="dot" ref={this.box}></span>;
      
        
      }

 
}

export default AudioVisualizer;