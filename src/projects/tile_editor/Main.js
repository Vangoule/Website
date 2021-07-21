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
            window.setTimeout(callback, 10000 / 60);
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
        MouseEvent.init();
        KeyEvent.init();
        GameInstance.init();
        this.beginAuto();
    }

    shouldComponentUpdate(newProps){
        if(this.props.state.nextTile !== newProps.state.nextTile)
        {
            this.setState({ nextTile: newProps.state.nextTile });
            GameInstance.nextTile = newProps.state.nextTile;
            console.log("Next tile is: " + newProps.state.nextTile);
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

        if (!canvas) {
            return;
        }

        const webGL = canvas.getContext("experimental-webgl", {
            antialias: false
        });

        canvas.style.width = "100%";
        canvas.style.height = "100%";
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

    componentWillUnmount()
    {
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



// this.setupTiles = function()
// {
//     document.getElementById('tiles').innerHTML += ('<table class="tg" id="tileTable"> \n');
//     document.getElementById('tiles').innerHTML += ('</table> \n');
    
//     for(var i = 0; i < 16; i++)
//     {
//         document.getElementById('tileTable').innerHTML += ('<tr id=tileRow' + i + '> \n');
//         for(var j = 0; j < 16; j++)
//         {
//             //console.log(((i*16+j) + 3) + " at: " + i + ", " + j);
//             document.getElementById('tileRow' + i).innerHTML += ('<th class="tile" title="' +  (240 - ((i*16-j))) + '"id="tile' + ((i*16+j)) + '"style="padding: 13px; background-size: cover;" background="images/editor/TileSet/tile (' + ((i*16+j) + 3) + ').png"> </th>');
                
//         }
//         document.getElementById('tileTable').innerHTML += ('</tr> \n');
//     }
            
//     for(var i = 0; i < 16; i++)
//     {
//         for(var j = 0; j < 16; j++)
//         {
//             $("#tile" + (((15-j)*16+i))).click({param1: i, param2: j}, 
//                 function(event){ console.log(event.data.param1 + " " + event.data.param2 ); var j = event.data.param1; var i =  event.data.param2;Game.nextTile = (i*16+j); 
                
//                 $('.selected').removeClass('selected');
//                 $(this).addClass('selected');
//             });
//         }
//     }
    
// }
