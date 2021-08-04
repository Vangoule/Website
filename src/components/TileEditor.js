import React, { Component } from 'react';
import { HashLink } from 'react-router-hash-link';

import { withStyles } from '@material-ui/styles';


import NormalGrid from '@material-ui/core/Grid';
import NormalContainer from '@material-ui/core/Container';
import NormalPaper from '@material-ui/core/Paper';

import Main from '../projects/tile_editor/Main.js'

import ThemeMode from './ThemeMode.js';
import { Typography } from '@material-ui/core';

import TableContainer from '@material-ui/core/TableContainer';
import NormalTable from '@material-ui/core/Table';
import NormalTableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const images = {};

function importAll(r) {
    r.keys().forEach((key) => (images[key] = r(key)));
}

importAll(require.context("../projects/tile_editor/Resources/Images/TileSet", false, /\.(png|jpe?g|svg)$/));


const Grid = withStyles({
    root: {
        height: '100%',
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

const Table = withStyles({
    root: {
        width: "100%",
        //border: "1px solid red",
        overflow: "hidden",
        tableLayout: "fixed",
        padding: '0px',
        margin: '0px',

        //overflow: "hidden",
    }
})(NormalTable);

const TableCell = withStyles({
    root: {
        lineHeight: "0px !important",
        padding: "0px",
        margin: "0px",
        border: "none",
        marginTop: "-1px",
        marginLeft: "-1px",
        borderBottom: "none !important"

    }
})(NormalTableCell);

const CenterContainer = withStyles({
    root: {
        height: "88vh",
        minHeight: 400,
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

export default class TileEditor extends Component {
    constructor(props) {
        super();

        this.tileSetRef = React.createRef();
        this.functionRef = React.createRef();
        this.saveLoadRef = React.createRef();

        this.rows = [];
        for (var i = 0; i < 16; i++) {
            this.rows[i] = [];
            for (var j = 0; j < 16; j++) {
                this.rows[i].push(((i * 16 + j)));
            }
        }

        this.state = {
            nextTile: 190,
            preset: 0,
            mapText: "",
            shouldSave: false,
            shouldLoad: false,
            layer: 0,
            newTile: 191,
            newSize: 0,
            createNew: false,
        }

        

    }

    handleLayerChange = (event) => {
        this.setState({ layer: event.target.value });
    }

    handleNewTileChange = (event) => {
        this.setState({ newTile: event.target.value });
    }

    handleNewSizeChange = (event) => {
        this.setState({ newSize: event.target.value });
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
                                                                            if (images['./tile (' + tileID + ').png']) {
                                                                                let val = tileID - 3;
                                                                                let row = Math.floor(val / 16);
                                                                                let col = (val) - (16 * row);
                                                                                let actualID = ((15 - row) * 16) + col;
                                                                                let isSelected = {
                                                                                    outline: "1px solid black",
                                                                                    marginTop: "1px",
                                                                                    marginLeft: "1px",
                                                                                    padding: "1px",
                                                                                    left: "1px"
                                                                                }
                                                                                if (this.state.nextTile === actualID) {
                                                                                    isSelected = {
                                                                                        outline: "1px solid red",
                                                                                        marginTop: "1px",
                                                                                        marginLeft: "1px",
                                                                                        position: "relative",
                                                                                        
                                                                                    }
                                                                                }
                                                                                return (

                                                                                    <TableCell style={isSelected} padding="none" key={cIndex}>
                                                                                        <img width="100%" height="100%" onClick={() => { this.setState({ nextTile: actualID }); }} src={images['./tile (' + tileID + ').png'].default} alt={id} />
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

                                                <div style={{ marginTop: 20, width: "100%" }}>
                                                    <Divider variant="inset" style={{ marginLeft: 0, width: "100%" }}></Divider>
                                                    <FormControl style={{ marginTop: 20, width: "100%" }} variant="outlined" className={classes.formControl}>
                                                        <InputLabel>Layer</InputLabel>
                                                        <Select
                                                            value={this.state.layer}
                                                            onChange={this.handleLayerChange}
                                                            label="Layer"
                                                        >
                                                            <MenuItem value={0}>Layer 1</MenuItem>
                                                            <MenuItem value={1}>Layer 2</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
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
                                    <Container style={{ paddingLeft: "0px" }} >
                                        <Paper ref={this.functionRef}>Functions
                                            <Container>
                                                <Typography align="left"> Try a Preset:</Typography>

                                                <Button color="primary" size="large" variant="outlined" onClick={() => { this.setState({ preset: 1 }); }}>Road</Button>
                                                <Button color="primary" size="large" variant="outlined" onClick={() => { this.setState({ preset: 2 }); }}>Square</Button>
                                                <Button color="primary" size="large" variant="outlined" onClick={() => { this.setState({ preset: 3 }); }}>Cross</Button>
                                                <Button color="primary" size="large" variant="outlined" onClick={() => { this.setState({ preset: 4 }); }}>Junction</Button>
                                                <Button color="primary" size="large" variant="outlined" onClick={() => { this.setState({ preset: 5 }); }}>Cave</Button>


                                                <Typography align="left" style={{ marginTop: 20 }}> Save/Load</Typography>
                                                <ButtonGroup color="primary">
                                                    <Button onClick={() => { this.setState({ shouldSave: true }); }}>Save</Button>
                                                    <Button onClick={() => { this.setState({ shouldLoad: true }); }}>Load</Button>
                                                </ButtonGroup>

                                                <div style={{ marginTop: 10 }}>
                                                    <TextField ref={this.saveLoadRef}
                                                        label=""
                                                        multiline
                                                        rows={10}
                                                        variant="filled"
                                                        fullWidth
                                                    />
                                                </div>

                                                <div style={{ marginTop: 20 }}>
                                                    <Typography align="left" style={{ marginTop: 10 }}> Create New</Typography>
                                                    <FormControl variant="outlined" display="inline" className={classes.formControl}>
                                                        <InputLabel>Size</InputLabel>
                                                        <Select label="Size" value={this.state.newSize} onChange={this.handleNewSizeChange}>
                                                            <MenuItem value={0}>8x8</MenuItem>
                                                            <MenuItem value={1}>16x16</MenuItem>
                                                            <MenuItem value={2}>32x32</MenuItem>
                                                            <MenuItem value={3}>64x64</MenuItem>
                                                            <MenuItem value={4}>128x128</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl variant="outlined" display="inline" className={classes.formControl}>
                                                        <InputLabel>Default Tile</InputLabel>
                                                        <Select label="Default Tile" value={this.state.newTile} onChange={this.handleNewTileChange}>
                                                            <MenuItem value={240}>Empty</MenuItem>
                                                            <MenuItem value={191}>Grass</MenuItem>
                                                            <MenuItem value={121}>Dirt</MenuItem>
                                                            <MenuItem value={140}>Cobble</MenuItem>
                                                            <MenuItem value={188}>Stone</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>

                                                <ButtonGroup color="primary">
                                                    <Button onClick={() => { this.setState({ createNew: true }); }}>Create</Button>
                                                </ButtonGroup>
                                            </Container>
                                        </Paper>
                                    </Container>
                                </Grid>
                            </Grid>
                        </div>

                    </div>
                
            </div>

                )
    }
}
