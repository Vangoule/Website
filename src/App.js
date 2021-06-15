//import logo from './logo.svg';
import './App.css';

import About from './components/About';
import Projects from './components/Projects';
import Header from './components/Header';
import Snake from './components/Snake';

import { ThemeProvider } from "@material-ui/styles";

import { createMuiTheme } from "@material-ui/core";

import Particles from 'react-particles-js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Fragment } from 'react';
import { Link } from 'react-scroll'

const theme = createMuiTheme({
	palette: {
		type: 'dark',
	}
});

function App() {
	
	return (
		<ThemeProvider theme={theme} >

			<BrowserRouter>
				<div>
					<Switch>
						<Route exact path="/" render={props =>
							<Fragment>
								<Link to="about" spy={true} smooth={true}>
									<Particles canvasClassName="particles"
										params={{
											"particles": {
												"number": {
													"value": 70,
													"density": {
														"enable": true,
														"value_area": 2000
													}
												},
												"line_linked": {
													"enable": true,
													"opacity": 0.04
												},
												"move": {
													"speed": 0.55
												},
												"size": {
													"value": 2
												},
												"opacity": {
													"anim": {
														"enable": true,
														"speed": 1,
														"opacity_min": 0.09
													}
												}
											},
											"interactivity": {
												"events": {
													"onclick": {
														"enable": false,
														"mode": "push"
													}
												},
												"modes": {
													"push": {
														"particles_nb": 1
													}
												}
											},
											"retina_detect": true
										}} /></Link>
								
								<div className="App">
								<Header />
									<div className="App-body">
										<div className="App-components">
											
											<About />
											<Projects />
										</div>
									</div>
								</div>
							</Fragment>
						} />
						<Route path="/snake" component={Snake} />
						<Route component={Error} />
					</Switch>
				</div>
			</BrowserRouter>
		</ThemeProvider >
	);
}

export default App;
