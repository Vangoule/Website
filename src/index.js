import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'fontsource-roboto';
import { DarkModeState } from "./components/ThemeContext"

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(<><DarkModeState><App /></DarkModeState></>);

reportWebVitals();
