import React, { Component } from 'react';
import './audioVisualizer.css'
import { gsap } from 'gsap' 



class AudioVisualizer extends Component {
    constructor(props) {
        super(props);
        this.box = React.createRef();
      }

    componentDidMount() {
        gsap.to(this.box.current, { rotation: this.props.audioData[0] });
      }
    
    componentDidUpdate() {
      gsap.to(this.box.current, {backgroundColor: `rgb(${this.props.audioData[0]},0,0)`, duration:0.5});
    }


    render() {


        return <span className="dot" ref={this.box}></span>;
      
        
      }

 
}

export default AudioVisualizer;