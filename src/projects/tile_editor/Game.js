import MouseEvent from './Input/MouseListener'
import KeyEvent from './Input/KeyListener'
import FSM from './StateMachine'
import TileMap from './TileMap'

import GLR from './GL/GLRenderer';

class Game {
    constructor() {
        this.map = new TileMap();

        this.curMouseTileX = undefined;
        this.curMouseTileY = undefined;
        this.curMouseTileIndex = undefined;
        this.curMouseTileID = undefined;
        
        this.gameWorldX = undefined;
        this.gameWorldY = undefined;
        this.gameWorldXY = undefined;
        
        this.currentLayer = 0;
        
        this.numLayers = 2;
        
        this.nextTile = 200;

        window.Game = this; // Expose the game variable to the console for debugging and cheating purposes.
    }

    init = () => {
        GLR.init();
        console.log("Game has been initialised");
        MouseEvent.subscribeToMove(this);
        MouseEvent.subscribeToClick(this);
        MouseEvent.subscribeToDrag(this);
        
        KeyEvent.subscribeToKeyDown(this);
        FSM.setState(FSM.states.play);
        FSM.logState();     

        //We want an 8x8 world
        this.gameWorldX = 8;
		this.gameWorldY = 8;
		this.gameWorldXY = this.gameWorldX * this.gameWorldY;

        GLR.gameWorldX = this.gameWorldX;
        GLR.gameWorldY = this.gameWorldY;
		
        //Fill the world with empty space
		for(var i =0; i < this.numLayers; i++){
			if(i>0){
				this.map.fillWorld(240, i);
			}
		}

        this.map.tiles[0] = [
            191,191,191,191,191,191,191,191,
            191,191,191,191,191,191,191,191,
            252,252,252,252,252,252,252,252,
            236,236,236,236,236,236,236,236,
            236,236,236,236,236,236,236,236,
            220,220,220,220,220,220,220,220,
            191,191,191,191,191,191,191,191,
            191,191,191,191,191,191,191,191];

        this.map.init(this.gameWorldXY);
 
    }

    placeTile = () =>
    {
        var index = GLR.getTileIndexAtMouse();
        this.curMouseTileX = index.x;	
        this.curMouseTileY = index.y;

        var id = this.map.getTileID(index.x, index.y);
        if( id < 0 || id > (16*16)) { id = 0; console.log("ID out of bounds"); return; }
        if( id === undefined ) { id = -1; console.log("Undefined Tile"); return;}
        this.curMouseTileIndex = id;

        this.curMouseTileID = this.map.tiles[0][id];
        this.map.tiles[0][id] = this.nextTile;
        console.log("Placing tile: " + this.nextTile);
    }

    onDrag = (dx, dy, x, y) => {
        this.placeTile();
    }

    onMove = (x, y) => {

        GLR.mousePos.x = x;
        GLR.mousePos.y = y;
    }

    onClick = (x, y, down) => {
        //console.log(x + " " + y + " " + down);
        GLR.mousePos.x = x;
        GLR.mousePos.y = y;

        if(down)
        {
            this.placeTile();
        }
    }

    onKeyDown = (e) => {
        if (FSM.getStateID() === FSM.states.play) {
            switch (e.keyCode) {
                case 87: //W
                    break;
                case 65: //A
                    break;
                case 83: //S
                    break;
                case 68: //D
                    break;
                case 27: //ESC    
                    this.openMenu();
                    break;
                default:
                    break;
            }
        }        
    }

    update = () => {

    }

    render = (dt) =>
    {
        GLR.render();
    }
}

const GameInstance = new Game();

export default GameInstance;