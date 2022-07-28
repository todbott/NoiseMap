import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import '../style.css';
import '../screenshot.png';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


 









// --------------- The Landing Page (Where the user goes first) ---------------
class LandingPage extends React.Component { 
	constructor(props) {
		super(props);
		this.state = {
			
		}
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin() {
		ReactDOM.render(
			<LoginForm/>,
			document.getElementById('root')
		);
	}

  
	render() {
	
		return (
			<Container>



                <div className="body-wrap boxed-container">
                    

                    <main>
                    <section className="cta section">
                            <div className="container-sm">
                                <div className="cta-inner section-inner">
                                    <div className="cta-header text-center">
                                    <img src={require('../logo.png')} style={{alignSelf: 'center', padding: 20, margin: 'auto' }}/>
                                                {/* <div className="hero-inner">
                                                    <div className="hero-copy" style={{justifyContent: 'center'}}> */}
                                                    
                                                        <p className="hero-paragraph">Predict levels of urban noise using the power of AI</p>
                                                    {/* </div>
                                                </div> */}
                                                <iframe width="560" height="315" src="https://www.youtube.com/embed/EHLWsS3g0xQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                            </div>
                                        </div>
                                </div>
                                
                                
                        
                        </section>

                        <section className="features section">
                            <div className="container">
                                <div className="features-inner section-inner">
                                    <div className="features-header text-left">
                                        <div className="container-sm" style={{alignContent: 'center' }}>
                                            <h2 className="section-title mt-0">A different approach to urban noise prediction</h2>
                                            <p className="section-paragraph">GIS Noise Mapper simply looks at real-world noise samples, then looks at the urban features around the areas where those samples were taken.  Putting it all into a neural  network, it learns which features (in which layouts) are associated with different levels of urban noise.</p>
                                        </div>
                                    </div>
                                    <div className="features-wrap">
                                        <div className="feature is-revealing">
                                            <div className="feature-inner">
                                                
                                                <div className="feature-content">
                                                    <h3 className="feature-title mt-0">Step One: Sample the Noise</h3>
                                                    <p className="text-sm mb-0">Head out on the town with your smartphone, and go to <a href="https://gis-noise-mapper.com/sample">gis-noise-mapper.com/sample</a>.  Every 10 seconds, the system will record the peak noise level (during those 10 seconds), as well as your current GPS coordinates.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="feature is-revealing">
                                            <div className="feature-inner">
                                                
                                                <div className="feature-content">
                                                    <h3 className="feature-title mt-0">Step Two: Find the Features</h3>
                                                    <p className="text-sm mb-0">Before the system sends the peak noise level and GPS data to the cloud, it makes a quick query to the OpenStreetMap API, and retrieves data about the layout and presence of urban features around your current location.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="feature is-revealing">
                                            <div className="feature-inner">
                                                <div className="feature-content">
                                                    <h3 className="feature-title mt-0">Step Three: Learn, and Repeat</h3>
                                                    <p className="text-sm mb-0">The data is sent to a database, and the relationship between the urban features and peak noise level (from Step One) is fed into an AI system.  By looking at thousands of such samples, the system is eventually able to predict which urban features, in which layout, are associated with different levels of urban noise.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="cta section">
                            <div className="container-sm">
                                <div className="cta-inner section-inner">
                                    <div className="cta-header text-center">
                                        <h2 className="section-title mt-0">Currently trained and working in Osaka, Japan.  Next up, the world.</h2>
                                        <p className="section-paragraph">The output generated by the GIS Noise Mapper AI system is currently only available for Osaka, Japan (as that is where the training samples are currently being generated).  An example of the output is below.  The system output is also viewable in QGIS, via the GIS Noise Mapper plugin.</p>
                                        <img src={require('../screenshot.png')} />
                                        <p className="hero-paragraph">Noise map of the area around Shin Osaka Station, Japan (after training with around 4,000 samples).</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>    
                    </div>

                <script src="dist/js/main.min.js"></script>


				
			</Container>
		);
	}
} export default LandingPage