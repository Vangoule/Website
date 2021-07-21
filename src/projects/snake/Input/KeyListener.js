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
        this.onKeyUpListeners.forEach(listener => {
            listener.onKeyUp(e);
        })
    }

    keyDown = (e) => {
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