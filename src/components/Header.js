import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     }
// }));

export default class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <h1>Welcome, I'm Thomas Harris</h1>
                <h5>Software Engineer</h5>
                <h6>(Scroll/Click to find out more)</h6>
            </header>
        )
    }
}

//export default withStyles(useStyles)(Header);