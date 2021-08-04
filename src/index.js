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


// ReactDOM.render(
//     <>
//         <DarkModeState>
//             <App />
//         </DarkModeState>
//     </>,
//     document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
