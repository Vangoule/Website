import GLR from '../GL/GLRenderer';

class MouseListener {
    constructor(){
        this.onWheelListeners = [];
        this.onDragListeners = [];
        this.onMoveListeners = [];
        this.onClickListeners = [];
    }
    
    clear = () => {
        this.onWheelListeners = [];
        this.onDragListeners = [];
        this.onMoveListeners = [];
        this.onClickListeners = [];
    }

    init = () => {
        var x = 0;
        var y = 0;
        var dragging = false;

        GLR.gl.canvas.onWheel = (e) => {
            this.onWheelListeners.forEach(listener => {
                listener.onWheel(e);
            })
        }

        GLR.gl.canvas.onmousedown = (e) => {
            x = e.clientX;
            y = e.clientY;
            dragging = true;
            this.onClickListeners.forEach(listener => {
                listener.onClick(x, y, true);
            });
        }

        GLR.gl.canvas.onmouseup = () => {
            dragging = false;
            this.onClickListeners.forEach(listener => {
                listener.onClick(x, y, false);
            });
        }

        GLR.gl.canvas.onmousemove = (e) => {
            if (dragging) {
                var dx = x-e.clientX;
                var dy = y-e.clientY;
                x = e.clientX;
                y = e.clientY;
                this.onDragListeners.forEach(listener => {
                    listener.onDrag(dx,dy, x, y);
                });
            }
            this.onMoveListeners.forEach(listener => {
                listener.onMove(x, y);
            });
            
        }
    }

    subscribeToDrag = (listener) => {
        this.onDragListeners.push(listener);
    }

    subscribeToWheel = (listener) => {
        this.onWheelListeners.push(listener);
    }

    subscribeToClick = (listener) => {
        this.onClickListeners.push(listener);
    }

    subscribeToMove = (listener) => {
        this.onMoveListeners.push(listener);
    }
}

const MouseEvent = new MouseListener();
export default MouseEvent;