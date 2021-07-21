class FiniteStateMachine {

    constructor() {
        this.states = {
            menu: 0,
            play: 1,
            gameover: 2

        };

        this.previousState = undefined;
        this.currentState = this.states.menu;
    }



    setState = (state) => {
        this.previousState = this.currentState;
        this.currentState = state;
    };

    getStateID = () => {
        return this.currentState;
    };

    logState = () => {
        console.log("Current State: ID=" + this.getStateID() + " - " + this.getStateName());
    };

    getStateName = () => {
        switch (this.currentState) {
            case this.states.menu:
                return "Menu";
            case this.states.play:
                return "Play";
            case this.states.gameover:
                return "Game Over";
            default:
                break;
        }
    };
};

const StateMachine = new FiniteStateMachine();
export default StateMachine;