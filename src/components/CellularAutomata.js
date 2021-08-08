import React, { Component } from 'react';
import { Grid, Typography} from '@material-ui/core';
import { HashLink } from 'react-router-hash-link';

import ThemeMode from './ThemeMode.js';
import Main from '../projects/cellular_automata/Main.js'

export default class CellularAutomata extends Component {
    render() {
        return (
            <div className="App" >
                <div className="App-body fit-screen">
                    <Grid container direction="row" alignItems="center" padding="0px" margin="0px">
                        <Grid item xs padding="0px" margin="0px" paddingLeft="23px">
                            <HashLink to="/#projects"><Typography align="left" padding="0px" margin="0px" variant="h4" component="h4" color="textPrimary">Return</Typography></HashLink>
                        </Grid>
                        <Grid item xs paddingRight="23px">
                            <ThemeMode />
                        </Grid>
                    </Grid>
                    <Main />
                </div>
            </div>
        )
    }
}
