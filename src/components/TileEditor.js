import React, { Component } from 'react';
import { HashLink } from 'react-router-hash-link';

import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import NormalGrid from '@material-ui/core/Grid';
import NormalContainer from '@material-ui/core/Container';
import NormalPaper from '@material-ui/core/Paper';

import Main from '../projects/tile_editor/Main.js'

import ThemeMode from './ThemeMode.js';
import { Typography } from '@material-ui/core';
import GameInstance from '../projects/tile_editor/Game.js';


import NormalTableContainer from '@material-ui/core/TableContainer';
import NormalTable from '@material-ui/core/Table';
import NormalTableCell from '@material-ui/core/TableCell';

import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

const cache = {};

function importAll(r) {
    r.keys().forEach((key) => (cache[key] = r(key)));
}

importAll(require.context("../projects/tile_editor/Resources/Images/TileSet", false, /\.(png|jpe?g|svg)$/));
const images = Object.entries(cache).map(module => module[1].default);

const Grid = withStyles({
    root: {
        height: '90%',
    },
})(NormalGrid);

const CenterGrid = withStyles({
    root: {
        width: '100%',
        height: '0%',
    },
})(NormalGrid);

const Container = withStyles({
    root: {
        height: "88vh",
        minHeight: 500,
        overflow: "hidden",
        //       border: "1px solid blue",
        fontSize: 30,
        width: "auto"
    },
    media: {
        padding: '0px',
    }
})(NormalContainer);

const TableContainer = withStyles({
    root: {
        height: "88vh",
        minHeight: 500,
        overflow: "hidden",
        //       border: "1px solid red",
        fontSize: 30,
    },
    media: {
        padding: '0px',
    }
})(NormalTableContainer);

const Table = withStyles({
    root: {
        width: "100%",
        overflow: "hidden",
    }
})(NormalTable);

const TableCell = withStyles({
    root: {

        padding: "0px",
        margin: "0px"
    }
})(NormalTableCell);

const CenterContainer = withStyles({
    root: {
        height: "88vh",
        minHeight: 400,
        //     border: "1px solid black",
        fontSize: 30,
    },
})(Container);

const Paper = withStyles({
    root: {
        height: '100%',
        width: '100%',
        padding: '0px',
        margin: "0px",

    },
})(NormalPaper);

function getItemByKey(key, array) {
    var value;
    array.some(function (obj) {
        if (obj[key]) {
            value = obj[key];
            return true;
        }
        return false;
    });
    return value;
}

export default class TileEditor extends Component {
    constructor(props) {
        super();



        this.tileSetRef = React.createRef();
        this.functionRef = React.createRef();

        this.rows = [];
        for (var i = 0; i < 16; i++) {
            this.rows[i] = [];
            for (var j = 0; j < 16; j++) {
                this.rows[i].push(((i * 16 + j)));
            }
        }

        this.state = {
            nextTile: 190,
        }

    }

    render() {
        const classes = this.props;


        return (
            <div className="App" >
                <div className="App-body fit-screen">
                    <div className="App-components" margin="0px" style={{ paddingLeft: "0px", paddingRight: "0px" }}>

                        <Grid container direction="row" alignItems="center" padding="0px" margin="0px">
                            <Grid item xs padding="0px" margin="0px" paddingLeft="23px">
                                <HashLink to="/#projects"><Typography align="left" padding="0px" margin="0px" variant="h4" component="h4" color="textPrimary">Return</Typography></HashLink>
                            </Grid>
                            <Grid item xs paddingRight="23px">
                                <ThemeMode />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={0} style={{ padding: "0px", margin: "0px" }}>

                            <Grid item xs={3}>
                                <Container style={{ paddingRight: "0px" }} >
                                    <Paper ref={this.tileSetRef} >Tileset
                                        <Container >
                                            <TableContainer >
                                                <Table className={classes.table} cellPadding="0" cellSpacing="0" >
                                                    <TableBody padding="none" >
                                                        {this.rows.map((items, index) => {
                                                            return (
                                                                <TableRow key={index}>
                                                                    {items.map((id, cIndex) => {
                                                                        var tileID = id + 3;
                                                                        if (cache['./tile (' + tileID + ').png']) {
                                                                            let val = tileID - 3;
                                                                            let row = Math.floor(val / 16);
                                                                            let col = (val) - (16 * row);
                                                                            let actualID = ((15 - row) * 16) + col;
                                                                            return (
                                                                                <TableCell padding="none" key={cIndex}>
                                                                                    <img onClick={() => { this.setState({ nextTile: actualID }); }} src={cache['./tile (' + tileID + ').png'].default} alt={id} />
                                                                                </TableCell>);
                                                                        }
                                                                        return (null);
                                                                    })}
                                                                </TableRow>
                                                            );
                                                        })}

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Container>
                                    </Paper>
                                </Container>
                            </Grid>

                            <CenterGrid item xs={6} padding="0px" margin="0px">
                                <CenterContainer >
                                    <Main {...this} />
                                </CenterContainer>
                            </CenterGrid>

                            <Grid item xs={3} padding="0px" margin="0px">
                                <Container style={{ paddingLeft: "0px" }} ><Paper ref={this.functionRef}>Functions</Paper></Container>
                            </Grid>
                        </Grid>
                    </div>

                </div>
            </div>
        )
    }
}

//export default TileEditor;
/*
TileEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(TileEditor);*/