import MouseEvent from './Input/MouseListener'
import KeyEvent from './Input/KeyListener'
import FSM from './StateMachine'
import TileMap from './TileMap'
import { Map } from './Resources/Map'

import GLR from './GL/GLRenderer';

class Game {
    constructor() {
        this.curMouseTileX = undefined;
        this.curMouseTileY = undefined;
        this.curMouseTileIndex = undefined;
        this.curMouseTileID = undefined;

        this.gameWorldX = undefined;
        this.gameWorldY = undefined;
        this.gameWorldXY = undefined;

        this.headPosX = 0;
        this.headPosY = 0;

        this.tailPosX = 0;
        this.tailPosY = 0;

        this.score = 0;
        this.ateRecently = false;

        this.map = new TileMap();

        window.Game = this; // Expose the game variable to the console for debugging and cheating purposes.
    }

    init = () => {
        GLR.init();
        console.log("Game has been initialised");
        MouseEvent.subscribeToClick(this);
        KeyEvent.subscribeToKeyDown(this);
        FSM.setState(FSM.states.play);
        FSM.logState();
        
        this.gameWorldX = 32;
        this.gameWorldY = 32;
        this.gameWorldXY = this.gameWorldX * this.gameWorldY;

        this.map.tiles = Map.map((x) => x);

        this.headPosX = 8;
        this.headPosY = 8;

        this.tailPosX = 0;
        this.tailPosY = 0;

        this.tailPosX = this.headPosX - 3;
        this.tailPosY = this.headPosY;

        this.map.tiles[this.tailPosX + Math.floor(this.tailPosY * 32)] = 4;
        this.map.tiles[this.headPosX - 2 + Math.floor(this.headPosY * 32)] = 4;
        this.map.tiles[this.headPosX - 1 + Math.floor(this.headPosY * 32)] = 4;
        this.map.tiles[this.headPosX + Math.floor(this.headPosY * 32)] = 4;

        this.direction = 4;

        this.generateCherry();

        this.map.init()         
    }

    restart = () => {
        
        this.map.tiles = Map.map((x) => x);
        //GLR.init();
        this.headPosX = 8;
        this.headPosY = 8;

        this.tailPosX = 0;
        this.tailPosY = 0;

        this.tailPosX = this.headPosX - 3;
        this.tailPosY = this.headPosY;

        FSM.setState(FSM.states.play);

        this.map.tiles[this.tailPosX + Math.floor(this.tailPosY * 32)] = 4;
        this.map.tiles[this.headPosX - 2 + Math.floor(this.headPosY * 32)] = 4;
        this.map.tiles[this.headPosX - 1 + Math.floor(this.headPosY * 32)] = 4;
        this.map.tiles[this.headPosX + Math.floor(this.headPosY * 32)] = 4;

        this.direction = 4;

        this.score = 0;

        this.generateCherry();

       // this.map.init() 
    }

    generateCherry = () => {
        var x = Math.floor(Math.random() * 32);
        var y = Math.floor(Math.random() * 32);

        if (this.map.tiles[x + Math.floor(y * 32)] !== 0) {
            this.generateCherry();
        } else {
            this.map.tiles[x + Math.floor(y * 32)] = 2;
        }

    }

    onClick = (x, y, down) => {
        console.log(x + " " + y + " " + down);
    }

    onKeyDown = (e) => {
        if (FSM.getStateID() === FSM.states.play) {
            switch (e.keyCode) {
                case 87: //W
                    if (this.direction !== 7)
                        this.direction = 6;
                    break;
                case 65: //A
                    if (this.direction !== 4)
                        this.direction = 5;
                    break;
                case 83: //S
                    if (this.direction !== 6)
                        this.direction = 7;
                    break;
                case 68: //D
                    if (this.direction !== 5)
                        this.direction = 4;
                    break;
                case 27: //ESC    
                    this.openMenu();
                    break;
                default:
                    break;
            }
        }else if (FSM.getStateID() === FSM.states.gameover) {
            this.restart();
            FSM.logState();
        }
        
    }

    update = () => {
        if (FSM.getStateID() === FSM.states.play) {
            var tailDir = this.map.tiles[this.tailPosX + Math.floor(this.tailPosY * 32)];

            if (this.ateRecently === false) {
                this.map.tiles[this.tailPosX + Math.floor(this.tailPosY * 32)] = 0;

                switch (tailDir) {
                    case 4:
                        this.tailPosX++;
                        break;
                    case 5:
                        this.tailPosX--;
                        break;
                    case 6:
                        this.tailPosY--;
                        break;
                    case 7:
                        this.tailPosY++;
                        break;
                    default:
                        break;
                }
            } else {
                this.ateRecently = false;
            }

            var nextDir = 0;
            //0 AIR, 1 WALL, 4 RIGHT, 5 LEFT, 6 UP, 7 DOWN
            switch (this.direction) {
                case 4:
                    nextDir = 4;
                    this.map.tiles[this.headPosX + Math.floor(this.headPosY * 32)] = nextDir;
                    this.headPosX++;
                    break;
                case 5:
                    nextDir = 5;
                    this.map.tiles[this.headPosX + Math.floor(this.headPosY * 32)] = nextDir;
                    this.headPosX--;
                    break;
                case 6:
                    nextDir = 6;
                    this.map.tiles[this.headPosX + Math.floor(this.headPosY * 32)] = nextDir;
                    this.headPosY--;
                    break;
                case 7:
                    nextDir = 7;
                    this.map.tiles[this.headPosX + Math.floor(this.headPosY * 32)] = nextDir;
                    this.headPosY++;
                    break;

                default:
                    break;

            }

            var nextTile = this.map.tiles[this.headPosX + Math.floor(this.headPosY * 32)];

            switch (nextTile) {
                case 0:
                    this.map.tiles[this.headPosX + Math.floor(this.headPosY * 32)] = 10;
                    break;
                case 1:
                    this.gameOver(this.score);
                    break;
                case 2:
                    this.ateRecently = true;
                    this.map.tiles[this.headPosX + Math.floor(this.headPosY * 32)] = 10;
                    this.generateCherry();
                    this.score += 1;

                    break;
                case 4:
                    this.gameOver(this.score);
                    break;
                case 5:
                    this.gameOver(this.score);
                    break;
                case 6:
                    this.gameOver(this.score);
                    break;
                case 7:
                    this.gameOver(this.score);
                    break;
                case 10:
                    this.gameOver(this.score);
                    break;
                default:
                    break;
            }
            //this.map.init()  
            GLR.update();
        }
    }

    render = (dt) =>
    {
        GLR.render();
    }

    gameOver = (score) =>
	{
		FSM.setState(FSM.states.gameover);
        console.log("You Lost Snake! Your score was: " + score);
        alert("You Lost Snake! Your score was: " + score);
        FSM.logState();
	}
}

const GameInstance = new Game();

export default GameInstance;