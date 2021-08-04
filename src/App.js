//import logo from './logo.svg';
import './App.css';

import Particles from 'react-particles-js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Fragment } from 'react';
import { Link } from 'react-scroll'

import About from './components/About';
import Projects from './components/Projects';
import Header from './components/Header';
import Snake from './components/Snake';
import Cultivation from './components/Cultivation';
import CellularAutomata from './components/CellularAutomata'
import TileEditor from './components/TileEditor';

import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from "@material-ui/core/styles"
import { darkTheme, lightTheme } from "./components/Theme"
import { darkModeContext } from "./components/ThemeContext"
window.onkeydown = (e) => {
	console.log("hi");
	//e.preventDefault();
}
const App = (props) => {

	const DarkModeContext = React.useContext(darkModeContext);

	const { darkMode, setDarkMode } = DarkModeContext

	

	React.useEffect(() => {
		const theme = localStorage.getItem("preferred-theme")
		if (theme) {
		  const themePreference = localStorage.getItem("preferred-theme")
		  console.log("Theme preference is " + themePreference)
		  if (themePreference === "dark") {
			setDarkMode(true)
		  } else {
			setDarkMode(false)
		  }
		} else {
		  localStorage.setItem("preferred-theme", "dark")
		  setDarkMode(true)
		}
		//eslint-disable-next-line
	  }, []);

	  const handleThemeChange = () => {
		if (darkMode) {
		  localStorage.setItem("preferred-theme", "light")
		  setDarkMode(false)
		} else {
		  localStorage.setItem("preferred-theme", "dark")
		  setDarkMode(true)
		}
	  }
	
	return (
		<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
		<CssBaseline />
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
									<div className="App-components" >
										<div className="Mode" style={{ textAlign: 'right' }}>
											{darkMode === true ? 'Dark' : 'Light'} Mode
											<IconButton sx={{ ml: 1 }} onClick={handleThemeChange} color="inherit">
												{darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
											</IconButton>
										</div>
										<About />
										<Projects />
									</div>
								</div>
							</div>
						</Fragment>
					} />
					<Route path="/snake" component={Snake} />
					<Route path="/cultivation" component={Cultivation} />
					<Route path="/cellular_automata" component={CellularAutomata} />
					<Route path="/tile_editor" component={TileEditor} />
					<Route component={Error} />
				</Switch>
			</div>
		</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
