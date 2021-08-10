import React, { Component } from 'react';
import GLR from './GL/GLRenderer';
import GameInstance from './Game';
import FSM from './StateMachine'

import MouseEvent from './Input/MouseListener'
import KeyEvent from './Input/KeyListener'

//import Grid from '@material-ui/core/Grid';
import NormalContainer from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';

import {
    Divider, Grid, Box, Accordion, AccordionSummary, AccordionDetails, Typography, Slider, FormControlLabel,
    Switch, MenuItem, Button, ButtonGroup, FormControl, InputLabel, Select, IconButton, TextField
} from '@material-ui/core';
import NormalPaper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayArrow from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { Scrollbars } from 'react-custom-scrollbars-2';
import HistoryIcon from '@material-ui/icons/History';
const Container = withStyles({
    root: {
        height: "89vh",
        minHeight: 500,
        fontSize: 30,
        width: "auto"
    },
    media: {
        padding: '0px',
    }
})(NormalContainer);

const Paper = withStyles({
    root: {
        height: '100%',
        width: '100%',
        padding: '0px',
        margin: "0px",

    },
})(NormalPaper);

//Ensure that requestAnimationFrame is called at 60FPS
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 10000 / 60);
        };
})();

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.lastTime = 0;

        this.saveLoadRef = React.createRef();

        this.state = {
            tickRate: 100,
            infinite: true,
            maxGenerations: 1000,
            grid: true,
            wrap: false,
            generation: 0,
            zoom: 1,
            xOffset: 0,
            yOffset: 0,
            newSize: 0,
            preset: 0,
        }
    }

    autoUpdate = () => {
        GameInstance.infinite = this.state.infinite;
        GameInstance.showGrid = this.state.grid;
        GameInstance.wrap = this.state.wrap;

        GameInstance.update();

        this.setState({ generation: GameInstance.generation });
        this.setState({ population: GameInstance.population });
        this.updateLoop = setTimeout(this.autoUpdate, this.state.tickRate);
    };

    init() {
        document.body.addEventListener("wheel", e => {
            if (e.ctrlKey)
                e.preventDefault();
        });

        MouseEvent.init();
        KeyEvent.init();
        GameInstance.init();
        this.autoUpdate();
    }

    shouldComponentUpdate(newState) {
        return true;
    }

    update = () => {
        var now = Date.now();
        var dt = (now - this.lastTime) / 1000.0;
        this.lastTime = now;

        GameInstance.zoom = this.state.zoom;
        GameInstance.xOffset = this.state.xOffset;
        GameInstance.yOffset = this.state.yOffset;

        GameInstance.render(dt);

        this.loop = window.requestAnimationFrame(this.update);
    }

    componentDidMount() {
        const canvas = document.querySelector('canvas');
        this.canvas = canvas;

        if (!canvas) {
            return;
        }

        const webGL = canvas.getContext("experimental-webgl", {
            antialias: false
        });

        canvas.style.width = "100%";
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        webGL.viewportWidth = canvas.width;
        webGL.viewportHeight = canvas.height;

        //Initialise the GL Renderer
        GLR.initGL(webGL);

        //Initialise the game state
        this.init();

        //Start the update/render loop
        this.update();
    }

    loadPreset = (preset) => {
        this.setState({ preset: preset });

        let size = 16;
        this.wrap = false;
        GameInstance.wrap = false;
        switch (preset) {
            case 1:
                size = 16;
                break;
            case 2:
                size = 32;
                this.wrap = true;
                GameInstance.wrap = true;
                break;
            case 3:
                size = 32;
                break;
            case 4:
                size = 64;
                break;
            case 5:
                size = 64;
                break;
            default:
                size = 16;
        }

        this.setState({ wrap: GameInstance.wrap });

        GameInstance.grid.init(size, size);
        GameInstance.history = [...GameInstance.grid.cells];
        GameInstance.generation = 0;
        FSM.setState(FSM.states.create);

        this.setState({ zoom: 1 });
        this.setState({ xOffset: 0 });
        this.setState({ yOffset: 0 });

        GameInstance.setGridToPreset(preset);
    }

    createNew = () => {
        let size = 8;
        switch (this.state.newSize) {
            case 0:
                size = 8;
                break;
            case 1:
                size = 16;
                break;
            case 2:
                size = 32;
                break;
            case 3:
                size = 64;
                break;
            case 4:
                size = 128;
                break;
            default:
                size = 8;
        }

        GameInstance.grid.init(size, size);
        GameInstance.history = [...GameInstance.grid.cells];
        GameInstance.generation = 0;
        FSM.setState(FSM.states.create);
        this.setState({ zoom: 1 });
        this.setState({ xOffset: 0 });
        this.setState({ yOffset: 0 });
    }

    componentWillUnmount() {

        window.cancelAnimationFrame(this.loop);
        window.clearTimeout(this.updateLoop);
    }

    save = () => {
        var code = "";

        code += GameInstance.grid.width;
        code += "," + GameInstance.grid.height;
        code += "," + this.state.wrap;
        code += ":\n";
        for (var i = 0; i < GameInstance.grid.height; i++) {
            code += "\n"
            for (var j = 0; j < GameInstance.grid.width; j++) {
                code += GameInstance.grid.cells[i * GameInstance.grid.width + j] + ",";
            }
        }
        //Remove any trailing commas and whitespace
        code = code.replace(/,\s*$/, "");
        code += "\n\n"

        this.saveLoadRef.current.children[0].children[0].value = code;
    }

    load = () => {
        //Get the text from the text box and remove the newlines.
        var text = this.saveLoadRef.current.children[0].children[0].value.replace(/\n/g, '');;

        if (text.length > 10) {
            var mapDetails = text.split(',', 3);

            if (mapDetails.length === 3) {
                let dataStrings = text.split(':');
                let data = dataStrings[1].split(',');

                let width = parseInt(mapDetails[0]);
                let height = parseInt(mapDetails[1]);
                let wrap = false;
                if (mapDetails[2] === "true:0") wrap = true;
                if (data.length === width * height) {
                    GameInstance.grid.cells = new Array(width * height);
                    FSM.setState(FSM.states.create);
                    GameInstance.grid.init(width, height);
                    for (var i = 0; i < width; i++) {
                        for (var j = 0; j < height; j++) {
                            GameInstance.grid.cells[(i * width) + j] = parseInt(data[(i * width) + j]);
                        }
                    }
                    this.wrap = wrap;
                    GameInstance.wrap = wrap;
                    this.setState({ wrap: GameInstance.wrap });
                    this.setState({ zoom: 1 });
                    this.setState({ xOffset: 0 });
                    this.setState({ yOffset: 0 });
                    GameInstance.history = [...GameInstance.grid.cells];
                    GameInstance.generation = 0;
                    return true;
                }
            }
        }
        alert("Failed to load!");
    }

    render() {
        const classes = this.props;

        const handleSlider = (event) => {
            this.setState({ [event.target.name]: event.target.value });
        };

        const handleSwitch = (event) => {
            this.setState({ [event.target.name]: event.target.checked });
        };

        const handleMaxGenerations = (event) => {
            this.setState({ maxGenerations: event.target.value });
            GameInstance.maxGenerations = event.target.value;
        };

        const handleNewSizeChange = (event) => {
            this.setState({ newSize: event.target.value });
        }


        const zoomLevels = [
            {
                value: 1,
                label: '1',
            },
            {
                value: 2,
                label: '2',
            },
            {
                value: 4,
                label: '4',
            },
            {
                value: 8,
                label: '8',
            },
            {
                value: 16,
                label: '16',
            }
        ];

        var sliderCenter = [
            {
                value: 0,
                label: '0',
            },
        ]

        return (


            <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                spacing={0} style={{ padding: "0px", margin: "0px" }}>

                <Grid item xs={3}>
                    <Container style={{ paddingRight: "0px" }} >
                        <Paper ref={this.tileSetRef} style={{ paddingRight: "0px" }}  > Information
                            <Container style={{ paddingRight: "0px", height: "96%", minHeight: "1vh", fontSize: "16px" }}>
                                <Scrollbars autoHide={true} style={{ width: "100%", height: "98%" }}>
                                    <Typography gutterBottom align="left" width="99%">The game of life is a cellular automata in which the user creates an initial configuration, starts the game and observes the results. Different configurations will result in different deterministic outcomes. These tables are from the wiki and are extremely helpful for creating interesting things.</Typography>
                                    <Divider />
                                    <Typography paddingTop="10px" align="left" width="99%" gutterBottom>How to use:</Typography>
                                    <Typography align="left" width="99%" >Click to draw on the canvas, dragging will allow you to place cells faster. Use the references below for ideas. Any changes to generation 0 will remain when restarting. Any changes will be lost on reset if at a later generation.</Typography>
                                    <Typography paddingTop="10px" align="left" width="99%" >LMB - Place Cell</Typography>
                                    <Typography align="left" width="99%" >Shift+LMB - Remove Cell</Typography>
                                    <Typography align="left" width="99%" >R - Reset to generation 0</Typography>
                                    <Typography align="left" width="99%" gutterBottom >Space - Pause/Play</Typography>
                                    <Divider />
                                    <Accordion>
                                        <AccordionSummary onKeyUp={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="stills-content"
                                            id="stills-header"
                                            style={{ marginBottom: "-1" }}
                                        >
                                            <Typography className={classes.heading}>Stills</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <table align="center">
                                                <tbody>
                                                    <tr>
                                                        <td>Block
                                                        </td>
                                                        <td><img alt="Game of life block with border.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/9/96/Game_of_life_block_with_border.svg/66px-Game_of_life_block_with_border.svg.png" decoding="async" width="66" height="66" data-file-width="66" data-file-height="66" />
                                                        </td></tr>
                                                    <tr>
                                                        <td>Beehive
                                                        </td>
                                                        <td><img alt="Game of life beehive.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/6/67/Game_of_life_beehive.svg/98px-Game_of_life_beehive.svg.png" decoding="async" width="98" height="82" data-file-width="98" data-file-height="82" />
                                                        </td></tr>
                                                    <tr>
                                                        <td>Loaf
                                                        </td>
                                                        <td><img alt="Game of life loaf.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Game_of_life_loaf.svg/98px-Game_of_life_loaf.svg.png" decoding="async" width="98" height="98" data-file-width="98" data-file-height="98" />
                                                        </td></tr>
                                                    <tr>
                                                        <td>Boat
                                                        </td>
                                                        <td><img alt="Game of life boat.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Game_of_life_boat.svg/82px-Game_of_life_boat.svg.png" decoding="async" width="82" height="82" data-file-width="82" data-file-height="82" />
                                                        </td></tr>
                                                    <tr>
                                                        <td>Tub
                                                        </td>
                                                        <td><img alt="Game of life flower.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/3/31/Game_of_life_flower.svg/82px-Game_of_life_flower.svg.png" decoding="async" width="82" height="82" data-file-width="82" data-file-height="82" />
                                                        </td></tr></tbody></table>


                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary onKeyUp={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="oscilators-content"
                                            id="oscilators-header"
                                        >
                                            <Typography className={classes.heading}>Oscilators</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>

                                            <table align="center">
                                                <tbody>
                                                    <tr>
                                                        <td>Blinker<br />(period 2)
                                                        </td>
                                                        <td><img alt="Game of life blinker.gif" src="//upload.wikimedia.org/wikipedia/commons/9/95/Game_of_life_blinker.gif" decoding="async" width="82" height="82" data-file-width="82" data-file-height="82" />
                                                        </td></tr>
                                                    <tr>
                                                        <td>Toad<br />(period 2)
                                                        </td>
                                                        <td><img alt="Game of life toad.gif" src="//upload.wikimedia.org/wikipedia/commons/1/12/Game_of_life_toad.gif" decoding="async" width="98" height="98" data-file-width="98" data-file-height="98" />
                                                        </td></tr>
                                                    <tr>
                                                        <td>Beacon<br />(period 2)
                                                        </td>
                                                        <td><img alt="Game of life beacon.gif" src="//upload.wikimedia.org/wikipedia/commons/1/1c/Game_of_life_beacon.gif" decoding="async" width="98" height="98" data-file-width="98" data-file-height="98" />
                                                        </td></tr>
                                                    <tr>
                                                        <td>Pulsar<br />(period 3)
                                                        </td>
                                                        <td><img alt="Game of life pulsar.gif" src="//upload.wikimedia.org/wikipedia/commons/0/07/Game_of_life_pulsar.gif" decoding="async" width="137" height="137" data-file-width="137" data-file-height="137" />
                                                        </td></tr>
                                                    <tr>
                                                        <td>Penta-<br />decathlon<br />(period&#160;15)
                                                        </td>
                                                        <td><img alt="I-Column.gif" src="//upload.wikimedia.org/wikipedia/commons/f/fb/I-Column.gif" decoding="async" width="89" height="145" data-file-width="89" data-file-height="145" />
                                                        </td></tr></tbody></table>

                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary onKeyUp={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="spaceships-content"
                                            id="spaceships-header"
                                        >
                                            <Typography className={classes.heading}>Spaceships</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>

                                            <table align="center">
                                                <tbody>
                                                    <tr>
                                                        <td>Glider
                                                        </td>
                                                        <td><img alt="Game of life animated glider.gif" src="//upload.wikimedia.org/wikipedia/commons/f/f2/Game_of_life_animated_glider.gif" decoding="async" width="84" height="84" data-file-width="84" data-file-height="84" />
                                                        </td></tr>
                                                    <tr>
                                                        <td>Light-<br />weight<br />spaceship<br />(LWSS)
                                                        </td>
                                                        <td><img alt="Game of life animated LWSS.gif" src="//upload.wikimedia.org/wikipedia/commons/3/37/Game_of_life_animated_LWSS.gif" decoding="async" width="126" height="98" data-file-width="126" data-file-height="98" />
                                                        </td></tr>
                                                    <tr>
                                                        <td>Middle-<br />weight<br />spaceship<br />(MWSS)
                                                        </td>
                                                        <td><img alt="Animated Mwss.gif" src="//upload.wikimedia.org/wikipedia/commons/4/4e/Animated_Mwss.gif" decoding="async" width="162" height="146" data-file-width="162" data-file-height="146" />
                                                        </td></tr>
                                                    <tr>
                                                        <td>Heavy-<br />weight<br />spaceship<br />(HWSS)
                                                        </td>
                                                        <td><img alt="Animated Hwss.gif" src="//upload.wikimedia.org/wikipedia/commons/4/4f/Animated_Hwss.gif" decoding="async" width="178" height="146" data-file-width="178" data-file-height="146" />
                                                        </td></tr></tbody></table>

                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary onKeyUp={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="Methuselahs-content"
                                            id="Methuselahs-header"
                                        >
                                            <Typography className={classes.heading}>Methuselahs</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>Methuselahs are patterns which evolve over a long period of times, these take increasing amounts of generations to stabilize or dissapear.</Typography>
                                            <table align="center"><tbody><tr>
                                                <td><img alt="" src="//upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Game_of_life_fpento.svg/82px-Game_of_life_fpento.svg.png" decoding="async" width="82" height="82" data-file-width="82" data-file-height="82" />  <div >The R-pentomino</div>
                                                </td>
                                                <td><img alt="" src="//upload.wikimedia.org/wikipedia/commons/thumb/9/99/Game_of_life_diehard.svg/162px-Game_of_life_diehard.svg.png" decoding="async" width="162" height="82" data-file-width="162" data-file-height="82" />  <div>Diehard</div>
                                                </td>
                                                <td><img alt="" src="//upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Game_of_life_acorn.svg/146px-Game_of_life_acorn.svg.png" decoding="async" width="146" height="82" data-file-width="146" data-file-height="82" /> <div >Acorn</div>
                                                </td></tr></tbody>
                                            </table>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary onKeyUp={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="Glider-Guns-content"
                                            id="Glider-Guns-header"
                                        >
                                            <Typography className={classes.heading}>Glider Guns</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <table align="center">
                                                <tbody>
                                                    <tr><td><img alt="" src="//upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Game_of_life_glider_gun.svg/610px-Game_of_life_glider_gun.svg.png" decoding="async" width="500" height="150" data-file-width="610" data-file-height="178" />  <div>Gosper glider gun</div></td></tr>
                                                    <tr><td><img alt="" src="//upload.wikimedia.org/wikipedia/commons/thumb/6/64/Game_of_life_Simkin_glider_gun.svg/749px-Game_of_life_Simkin_glider_gun.svg.png" decoding="async" width="500" height="300" data-file-width="749" data-file-height="493" />  <div>Simkin glider gun</div></td></tr>
                                                </tbody>
                                            </table>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary onKeyUp={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="Infinite-content"
                                            id="Infinite-header"
                                        >
                                            <Typography className={classes.heading}>Infinite</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails >
                                            <Typography>Although these don't have names, they have been categorized. The first two create a single block-laying switch engine. The third creates two of these.</Typography>

                                            <table align="center">
                                                <tbody>
                                                    <tr>
                                                        <td><img alt="Game of life infinite1.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/7/72/Game_of_life_infinite1.svg/162px-Game_of_life_infinite1.svg.png" decoding="async" width="162" height="130" data-file-width="162" data-file-height="130"></img>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;<img alt="Game of life infinite2.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Game_of_life_infinite2.svg/114px-Game_of_life_infinite2.svg.png" decoding="async" width="114" height="114" data-file-width="114" data-file-height="114"></img>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><br /><img alt="Game of life infinite3.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/9/95/Game_of_life_infinite3.svg/658px-Game_of_life_infinite3.svg.png" decoding="async" width="500" height="40" data-file-width="658" data-file-height="50"></img></td>
                                                    </tr>
                                                </tbody></table>
                                        </AccordionDetails>
                                    </Accordion>

                                </Scrollbars>
                            </Container>
                        </Paper >
                    </Container >
                </Grid >

                <Grid item xs={6} padding="0px" margin="0px">
                    <Container>
                        <Box
                            display="flex"
                            justifyContent="center"
                            justify="center"
                            alignItems="center"
                            minHeight="89vh"
                        >
                            <canvas ref={GLR.canvasRef} align="center" justify="center" id="canvas" style={{ border: '1px solid black' }}>
                                <code>&lt;canvas&gt;</code> element.
                                Your browser doesn't appear to support the
                            </canvas>

                        </Box>
                    </Container>
                </Grid>

                <Grid item xs={3} padding="0px" margin="0px">
                    <Container style={{ paddingLeft: "0px" }} >
                        <Paper ref={this.functionRef}>
                            <Scrollbars autoHide={true} style={{ width: "100%", height: "98%", overflowX: "hidden" }}>
                                <Container>
                                    <Typography align="left" paddingTop="10px">Generation: {this.state.generation}  </Typography>
                                    <Typography align="left" paddingTop="10px">Population: {this.state.population} </Typography>
                                    <Typography variant="h4" gutterBottom>Settings</Typography>

                                    {this.state.generation !== 0 &&
                                        <IconButton onClick={() => { GameInstance.resetGeneration(); }}>
                                            <HistoryIcon />
                                        </IconButton>
                                    }
                                    {FSM.getStateID() === FSM.states.play &&
                                        <IconButton onClick={() => { GameInstance.stop(); }}>
                                            <StopIcon />
                                        </IconButton>
                                    }
                                    {FSM.getStateID() !== FSM.states.play &&
                                        <IconButton onClick={() => { GameInstance.start(); }}>
                                            <PlayArrow />
                                        </IconButton>
                                    }
                                    <Box>
                                        <Typography align="left" gutterBottom>Tick Rate (ms)</Typography>
                                        <Slider value={this.state.tickRate} step={10} min={0} max={1000} valueLabelDisplay="auto" onChange={handleSlider} name="tickRate" />
                                        <Typography align="left" gutterBottom>Zoom</Typography>
                                        <Slider width="100%" value={this.state.zoom} step={null} marks={zoomLevels} min={1} max={16} valueLabelDisplay="auto" onChange={handleSlider} name="zoom" />
                                        <Typography paddingTop="10px" align="left" gutterBottom>xOffset</Typography>
                                        <Slider value={this.state.xOffset} step={1} marks={sliderCenter} min={-GameInstance.grid.width} max={GameInstance.grid.width} valueLabelDisplay="auto" onChange={handleSlider} name="xOffset" />
                                        <Typography align="left" gutterBottom>yOffset</Typography>
                                        <Slider value={this.state.yOffset} step={1} marks={sliderCenter} min={-GameInstance.grid.height} max={GameInstance.grid.height} valueLabelDisplay="auto" onChange={handleSlider} name="yOffset" />
                                        <div align="center">
                                            <FormControlLabel
                                                control={<Switch checked={this.state.infinite} onChange={handleSwitch} name="infinite" />}
                                                label="Infinite Generations"
                                            />
                                            <FormControlLabel
                                                control={<Switch checked={this.state.grid} onChange={handleSwitch} name="grid" />}
                                                label="Grid"
                                            />
                                            <FormControlLabel
                                                control={<Switch checked={this.state.wrap} onChange={handleSwitch} name="wrap" />}
                                                label="Wrap"
                                            />
                                        </div>
                                        {!this.state.infinite && <Typography align="left" gutterBottom paddingTop="10px">Max Generations</Typography>}
                                        {!this.state.infinite &&
                                            <Slider defaultValue={this.state.maxGenerations} step={100} min={0} max={10000} valueLabelDisplay="auto" onChange={handleMaxGenerations} />
                                        }
                                    </Box>
                                    <Typography variant="h4" paddingTop="20px">Functions</Typography>
                                    <Typography align="left" style={{ marginTop: 10 }}> Create New Grid</Typography>
                                    <div>
                                        <FormControl variant="outlined" display="inline" className={classes.formControl}>
                                            <InputLabel>Size</InputLabel>
                                            <Select label="Size" value={this.state.newSize} onChange={handleNewSizeChange}>
                                                <MenuItem value={0}>8x8</MenuItem>
                                                <MenuItem value={1}>16x16</MenuItem>
                                                <MenuItem value={2}>32x32</MenuItem>
                                                <MenuItem value={3}>64x64</MenuItem>
                                                <MenuItem value={4}>128x128</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <ButtonGroup color="primary">
                                        <Button onClick={() => { this.createNew() }}>Create</Button>
                                    </ButtonGroup>
                                    <Typography align="left" style={{ marginTop: 10 }} gutterBottom> Try a Preset:</Typography>

                                    <Button color="primary" size="large" variant="outlined" onClick={() => { this.loadPreset(1); }}>Pulsar</Button>
                                    <Button color="primary" size="large" variant="outlined" onClick={() => { this.loadPreset(2); }}>Ships</Button>
                                    <Button color="primary" size="large" variant="outlined" onClick={() => { this.loadPreset(3); }}>Penta</Button>
                                    <Button color="primary" size="large" variant="outlined" onClick={() => { this.loadPreset(4); }}>Gosper</Button>
                                    <Button color="primary" size="large" variant="outlined" onClick={() => { this.loadPreset(5); }}>Simkin</Button>


                                    <Typography align="left" style={{ marginTop: 20 }}> Save/Load</Typography>
                                    <ButtonGroup color="primary">
                                        <Button onClick={() => { this.save(); }}>Save</Button>
                                        <Button onClick={() => { this.load(); }}>Load</Button>
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

                                </Container>
                            </Scrollbars>
                        </Paper>
                    </Container>
                </Grid>
            </Grid >



        )
    }
}