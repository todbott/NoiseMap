import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'  
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NoiseReadings from './NoiseReadings';

const routing = (  
    <Router>  
      <div>  
        <Routes>
        <Route exact path="/" element={<App />} />  
        <Route exact path="/noise_readings" element={<NoiseReadings />} />  
        </Routes>
      </div>  
    </Router>  
  )  
ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
