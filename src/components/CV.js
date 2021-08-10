import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import { HashLink } from 'react-router-hash-link';

import ThemeMode from './ThemeMode.js';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Grid, Typography, IconButton, TableBody, TableCell, TableRow, Table, Container } from '@material-ui/core';
import NormalContainer from '@material-ui/core/Container';
import CVImg from './images/CV.png';
import PDF from './CV.pdf';
const CenterContainer = withStyles({
    root: {
        height: "81vh",
        minHeight: 400,
        width: "auto",
        //     border: "1px solid red",
        fontSize: 30,
    },
})(NormalContainer);

export default class CV extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1,
        }

        window.addEventListener('keyup', this.keyUp, false);
    }

    keyUp = (e) => {
        if (e.keyCode === 37) {
            if (this.state.pageNumber > 1)
                this.previousPage();
        }
        if (e.keyCode === 39) {
            if (this.state.pageNumber < this.state.numPages)
                this.nextPage();
        }
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages: numPages });
    }

    nextPage() {
        this.setState({ pageNumber: this.state.pageNumber + 1 });
    }

    previousPage() {
        this.setState({ pageNumber: this.state.pageNumber - 1 });
    }

    render() {
        const classes = this.props;
        const options = {
            cMapUrl: 'cmaps/',
            cMapPacked: true,
        };
        return (
            <div className="App" >
                <div className="App-body fit-screen">
                    <div className="App-components">
                        <section id="CV">
                            <Grid container direction="row" alignItems="center" padding="0px" margin="0px">
                                <Grid item xs padding="0px" margin="0px">
                                    <HashLink to="/#about"><Typography align="left" padding="0px" margin="0px" variant="h4" component="h4" color="textPrimary">Return</Typography></HashLink>
                                </Grid>
                                <Grid item xs>
                                    <ThemeMode />
                                </Grid>
                            </Grid>

                            <CenterContainer align="center">
                                <Document file={PDF}
                                    onLoadSuccess={this.onDocumentLoadSuccess}
                                    options={options}>

                                    <Page width="800" pageNumber={this.state.pageNumber} />
                                </Document>
                            </CenterContainer>
                            <Container width="25%" align="center">
                                <a href="./CV.pdf"><img src={CVImg} alt="Download" style={{width: "50px", height:"70px"}}></img><Typography>Download</Typography></a>
                                <Table className={classes.table} width="100%">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="right" width="25%">
                                                {this.state.pageNumber > 1 &&
                                                    <IconButton onClick={() => this.previousPage()}>
                                                        <ArrowBackIosIcon />
                                                    </IconButton>}</TableCell>
                                            <TableCell align="center" width="10%">
                                                <Typography>Page {this.state.pageNumber} of {this.state.numPages}</Typography>
                                            </TableCell>
                                            <TableCell align="left" width="25%">
                                                {this.state.pageNumber < this.state.numPages &&
                                                    <IconButton onClick={() => this.nextPage()}>
                                                        <ArrowForwardIosIcon />
                                                    </IconButton>}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Container>

                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
