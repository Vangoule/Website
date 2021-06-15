import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Main from '../projects/snake/Main.js'

export default class Snake extends Component {
    render() {
        return (
            <div className="App" >
                <div className="App-body fit-screen">
                        <NavLink to="/" onClick={() => window.location.replace("/#projects")}><p>Return</p></NavLink>
                        <Main/>
                </div>
            </div>
        )
    }
}
