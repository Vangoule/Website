import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

class Header extends Component {
    render() {
        return (
            <header className="App-header">
            <p>
              <h1>Welcome, I'm Thomas Harris</h1>
              <h5>Software Engineer</h5>
              <h6>(Scroll/Click to find out more)</h6>
          </p>
          </header>
        )
    }
}

export default withStyles(useStyles)(Header);