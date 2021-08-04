import React from 'react';
import { HashLink } from 'react-router-hash-link';

import Main from '../projects/snake/Main.js'

import { withStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import NormalContainer from '@material-ui/core/Container';

import ThemeMode from './ThemeMode.js';
import { Typography } from '@material-ui/core';

import { useState } from 'react';

const CenterContainer = withStyles({
    root: {
        height: "90vh",
        minHeight: 400,
        width: "auto",
        //     border: "1px solid red",
        fontSize: 30,
    },
})(NormalContainer);

const Snake = (props) => {
    const [mounted, setMounted] = useState(true);
    const toggle = () => setMounted(!mounted);

    return (
        <div className="App" >
            <div className="App-body fit-screen">
                <div className="App-components">
                    <CenterContainer align="center">

                        <Grid container direction="row" alignItems="center" padding="0px" margin="0px">
                            <Grid item xs padding="0px" margin="0px">
                                <HashLink onClick={toggle} to="/#projects"><Typography align="left" padding="0px" margin="0px" variant="h4" component="h4" color="textPrimary">Return</Typography></HashLink>
                            </Grid>
                            <Grid item xs>
                                <ThemeMode />
                            </Grid>
                        </Grid>

                        {mounted && <Main align="center"/>}
                    </CenterContainer>
                </div>
            </div>
        </div>
    )
}

export default Snake;
