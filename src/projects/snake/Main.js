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

    init() {
        MouseEvent.init();
        KeyEvent.init();
        GameInstance.init();

    }

    update = () => {
        var now = Date.now();
        var dt = (now - this.lastTime) / 1000.0;

        this.lastTime = now;

        GameInstance.update(dt);

        this.doRender();

        window.requestAnimationFrame(this.update);
    }


    doRender = () => {
        GLR.clear(0, 0, 0, 1);
    }

    componentDidMount() {
        //Get the canvas and grab the GL Context
        const canvas = document.querySelector('canvas');

        if (!canvas) {
            return;
        }

        const webGL = canvas.getContext("experimental-webgl", {
            antialias: false
        });
        webGL.viewportWidth = canvas.width;
        webGL.viewportHeight = canvas.height;

        //Initialise the GL Renderer
        GLR.init(webGL);

        //Initialise the game state
        this.init();

        //Start the update/render loop
        window.requestAnimationFrame(this.update);


    }

    render() {
        return (
            <canvas id="canvas" width="1000" height="1000" style={{ border: '1px solid black' }}>
                Your browser doesn't appear to support the
                <code>&lt;canvas&gt;</code> element.
            </canvas>
        )
    }


}
