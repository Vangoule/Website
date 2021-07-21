import MouseEvent from './Input/MouseListener'
import KeyEvent from './Input/KeyListener'
import FSM from './StateMachine'
import TileMap from './TileMap'

import GLR from './GL/GLRenderer';

class Game {
    constructor() {
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
    }

    onClick = (x, y, down) => {
        console.log(x + " " + y + " " + down);
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