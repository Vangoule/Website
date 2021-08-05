import React, { Component } from 'react';
import GLR from './GL/GLRenderer';
import GameInstance from './Game';

import MouseEvent from './Input/MouseListener'
import KeyEvent from './Input/KeyListener'

//Ensure that requestAnimationFrame is called at 60FPS
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

export default class Main extends Component {

    constructor(props) {
        super(props)
        this.lastTime = 0;
    }

    autoUpdate = () => {
        GameInstance.update();
    };

    beginAuto = () => {
        this.autoInterval = setInterval(this.autoUpdate, 100);
    };

    init() {

        document.body.addEventListener("wheel", e=>{
            if(e.ctrlKey)

              e.preventDefault();//prevent zoom
          });

        MouseEvent.init();
        KeyEvent.init();
        GameInstance.init();
        this.beginAuto();
    }

    shouldComponentUpdate(newProps) {
        if (this.props.state.nextTile !== newProps.state.nextTile) {
            //this.setState({ nextTile: newProps.state.nextTile });
            GameInstance.nextTile = newProps.state.nextTile;
        }

        if (this.props.state.preset !== newProps.state.preset) {
            GameInstance.setMapToPreset(newProps.state.preset);
            newProps.state.preset = 0;
        }

        if (this.props.state.layer !== newProps.state.layer) {
            GameInstance.currentLayer = newProps.state.layer;
        }

        if (this.props.state.createNew !== newProps.state.createNew) {
            newProps.state.createNew = false;

            let width = 8;
            let height = 8;
            switch (this.props.state.newSize) {
                case 0:
                    width = 8;
                    height = 8;
                    break;
                case 1:
                    width = 16;
                    height = 16;
                    break;
                case 2:
                    width = 32;
                    height = 32;
                    break;
                case 3:
                    width = 64;
                    height = 64;
                    break;
                case 4:
                    width = 128;
                    height = 128;
                    break;
                default:
                    width = 8;
                    height = 8;
            }

            GameInstance.map.numLayers = 1;
            GameInstance.map.init(width, height);
            GameInstance.map.fillWorld(this.props.state.newTile, 0);
            GLR.initTilemap(GameInstance.map);
        }

        if (this.props.state.shouldSave !== newProps.state.shouldSave) {
            newProps.state.shouldSave = false;
            var code = "";

            if(GameInstance.map.numLayers > GameInstance.map.tiles.length)
            {
                GameInstance.map.numLayers = GameInstance.map.tiles.length;
            }

            code += GameInstance.map.numLayers;
            code += "," + GameInstance.map.width;
            code += "," + GameInstance.map.height;
            code += ",\n";
            for (var l = 0; l < GameInstance.map.numLayers; l++) {
                code += " Layer " + l + ":\n";
                for (var i = 0; i < GameInstance.map.height; i++) {
                    code += "\n"
                    for (var j = 0; j < GameInstance.map.width; j++) {
                        code += GameInstance.map.tiles[l][i * GameInstance.map.width + j] + ",";
                    }
                }
                //Remove any trailing commas and whitespace
                code = code.replace(/,\s*$/, "");
                code += "\n\n"
            }
            this.props.saveLoadRef.current.children[0].children[0].value = code;
            
        }

        if (this.props.state.shouldLoad !== newProps.state.shouldLoad) {
            newProps.state.shouldLoad = false;
            //Get the text from the text box and remove the newlines.
            var text = this.props.saveLoadRef.current.children[0].children[0].value.replace(/\n/g, '');;
            var mapDetails = text.split(',', 3);
            var layerStrings = text.split(':');

            //Check validity
            if (layerStrings.length === (parseInt(mapDetails[0]) + 1)) {

                //Convert Layer Strings to Array format
                let layers = [];
                for (let l = 0; l < mapDetails[0]; l++) {
                    let dataString = layerStrings[l + 1].split(' ');
                    layers[l] = dataString[0].split(',');
                    //If there's an incorrect number of tiles, abort.
                    if (layers[l].length !== mapDetails[1] * mapDetails[2]) {
                        alert("Failed to load!");
                        return false;
                    }
                }
                GameInstance.map.numLayers = mapDetails[0];
                GameInstance.map.init(mapDetails[1], mapDetails[2]);

                //Apply loaded data to game
                for (let l = 0; l < mapDetails[0]; l++) {
                    GameInstance.map.tiles[l] = layers[l];
                }
                GLR.initTilemap(GameInstance.map);
                return false;
            }
            alert("Failed to load!");
        }

        return false;
    }

    update = () => {
        var now = Date.now();
        var dt = (now - this.lastTime) / 1000.0;

        this.lastTime = now;
        GameInstance.render(dt);

        window.requestAnimationFrame(this.update);

        
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
        //canvas.style.height = "100%";
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

    componentWillUnmount() {
        clearInterval(this.autoInterval);
    }

    render() {
        return (
            
            <canvas ref={GLR.canvasRef} id="canvas" style={{ border: '1px solid black', padding: '0px', margin: '0px' }}>
                Your browser doesn't appear to support the
                <code>&lt;canvas&gt;</code> element.
            </canvas>
     
        )
    }
}