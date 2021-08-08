class KeyListener {
    constructor(){
        this.onKeyDownListeners = [];
        this.onKeyUpListeners = [];
    }

    clear = () => {
        this.onKeyDownListeners = [];
        this.onKeyUpListeners = [];
    }

    keyUp = (e) => {
        //e.preventDefault();
        //e.stopPropagation();
        this.onKeyUpListeners.forEach(listener => {
            listener.onKeyUp(e);
        })
    }

    keyDown = (e) => {
        if(e.keyCode !== 116 && e.keyCode !==123){
            //e.preventDefault();
            //e.stopPropagation();
        }
        this.onKeyDownListeners.forEach(listener => {
            listener.onKeyDown(e);
        })
    }

    init = () => {
        window.addEventListener('keyup', this.keyUp, false);
        window.addEventListener('keydown', this.keyDown, false);
    }

    subscribeToKeyDown = (listener) => {
        this.onKeyDownListeners.push(listener);
    }

    subscribeToKeyUp= (listener) => {
        this.onKeyUpListeners.push(listener);
    }

}

const KeyEvent = new KeyListener();
export default KeyEvent;