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

		this.currentLayer = 0;
		this.nextTile = 200;

		this.oldTileIndex = [];
		this.oldTile = this.nextTile;

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

		this.setMapToPreset(1);
		GLR.initTilemap(this.map);
	}

	placeTile = () => {
		var index = GLR.getTileIndexAtMouse();

		let shouldPlace = false;
		if ((index.x !== this.oldTileIndex.x) || (index.y !== this.oldTileIndex.y)) {
			shouldPlace = true;
		}
		else if (this.oldTile !== this.nextTile) {
			shouldPlace = true;
		}

		if (shouldPlace === true) {
			this.curMouseTileX = index.x;
			this.curMouseTileY = index.y;
			var id = this.map.getTileID(index.x, index.y);
			if (id < 0 || id > (this.map.numTiles)) { id = 0; console.log("ID out of bounds"); return; }
			if (id === undefined) { id = -1; console.log("Undefined Tile"); return; }
			if (this.currentLayer === undefined) { return; }

			//If the layer doesn't exist yet, create it.
			if (this.currentLayer + 1 > this.map.numLayers) {
				this.map.addLayer();
			}

			this.map.tiles[this.currentLayer][id] = this.nextTile
		}
		this.oldTileIndex = index;
		this.oldTile = this.nextTile;
	}

	onDrag = (dx, dy, x, y) => {
		this.placeTile();


	}

	onMove = (x, y) => {

		GLR.mousePos.x = x;
		GLR.mousePos.y = y;
	}

	onClick = (x, y, down) => {
		GLR.mousePos.x = x;
		GLR.mousePos.y = y;

		if (down) {
			this.placeTile();
		}
	}

	emptyWorld = () => {
		for (let i = 0; i < this.map.numLayers; i++) {
			if (i > 0) {
				this.map.fillWorld(240, i);
			}
		}
	}

	setMapToPreset = (preset) => {
		switch (preset) {
			case 1:
				this.map.numLayers = 1;
				this.map.init(8, 8);

				//Road
				this.map.tiles[0] = [
					191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191,
					252, 252, 252, 252, 252, 252, 252, 252,
					236, 236, 236, 236, 236, 236, 236, 236,
					236, 236, 236, 236, 236, 236, 236, 236,
					220, 220, 220, 220, 220, 220, 220, 220,
					191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191];

				break;
			case 2:
				this.map.numLayers = 1;
				this.map.init(8, 8);

				//Desert Square
				this.map.tiles[0] = [
					234, 234, 234, 234, 234, 218, 234, 218,
					234, 155, 156, 156, 156, 156, 157, 250,
					250, 139, 140, 140, 140, 140, 141, 234,
					234, 139, 140, 140, 140, 140, 141, 234,
					218, 139, 140, 140, 140, 140, 141, 234,
					234, 139, 140, 140, 140, 140, 141, 234,
					234, 123, 124, 124, 124, 124, 125, 234,
					250, 234, 234, 218, 234, 234, 234, 250];

				break;
			case 3:
				this.map.numLayers = 1;
				this.map.init(16, 16);

				//Cross
				this.map.tiles[0] = [
					188, 188, 188, 188, 188, 188, 189, 236, 236, 187, 188, 188, 188, 188, 188, 188,
					188, 188, 188, 188, 255, 188, 189, 236, 236, 187, 188, 188, 188, 254, 188, 188,
					254, 188, 188, 188, 188, 188, 189, 236, 236, 187, 188, 238, 188, 188, 188, 188,
					188, 188, 188, 188, 207, 188, 189, 236, 236, 187, 188, 188, 188, 239, 188, 188,
					188, 239, 188, 188, 188, 188, 189, 236, 236, 187, 188, 222, 188, 188, 188, 188,
					188, 188, 188, 188, 188, 188, 189, 236, 236, 187, 188, 188, 188, 188, 188, 188,
					172, 172, 172, 172, 172, 172, 173, 236, 236, 171, 172, 172, 172, 172, 172, 172,
					236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
					236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
					220, 220, 220, 220, 220, 220, 142, 236, 236, 143, 220, 220, 220, 220, 220, 220,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191];

				break;
			case 4:
				this.map.numLayers = 1;
				this.map.init(16, 16);

				//Junction
				this.map.tiles[0] = [
					191, 191, 191, 191, 191, 235, 203, 204, 204, 205, 237, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 235, 187, 188, 254, 189, 237, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 235, 187, 238, 188, 189, 237, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 235, 187, 188, 188, 189, 237, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 235, 187, 188, 207, 189, 237, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 235, 187, 206, 188, 189, 237, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 235, 171, 172, 172, 173, 237, 191, 191, 191, 191, 191,
					252, 252, 252, 252, 252, 158, 236, 236, 236, 236, 159, 252, 252, 252, 252, 252,
					236, 155, 156, 156, 156, 156, 156, 156, 156, 156, 156, 156, 156, 156, 157, 236,
					236, 139, 72, 140, 140, 71, 140, 56, 56, 140, 140, 56, 56, 71, 141, 236,
					236, 139, 140, 140, 56, 140, 140, 56, 140, 140, 56, 71, 140, 72, 141, 236,
					236, 123, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 125, 236,
					220, 220, 220, 220, 220, 142, 236, 236, 236, 236, 143, 220, 220, 220, 220, 220,
					191, 191, 191, 191, 191, 235, 236, 236, 236, 236, 237, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 235, 236, 236, 236, 236, 237, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 235, 236, 236, 236, 236, 237, 191, 191, 191, 191, 191];
				break;
			case 5:
				this.map.numLayers = 2;
				this.map.init(16, 16);

				//Cave
				this.map.tiles[0] = [
					236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
					236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
					236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
					236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
					236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
					236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
					236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
					236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236, 236,
					220, 220, 220, 220, 220, 220, 142, 236, 236, 143, 220, 220, 220, 220, 220, 220,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 235, 236, 236, 237, 191, 191, 191, 191, 191, 191];

				this.map.tiles[1] = [
					208, 209, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194,
					192, 193, 194, 194, 194, 194, 194, 194, 240, 194, 194, 240, 194, 194, 194, 194,
					192, 193, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194,
					176, 177, 178, 178, 178, 178, 178, 94, 95, 179, 179, 179, 179, 179, 179, 179,
					160, 161, 162, 162, 162, 162, 162, 78, 79, 163, 163, 163, 163, 163, 163, 163,
					144, 145, 146, 146, 146, 146, 146, 62, 63, 147, 147, 147, 147, 147, 147, 147,
					240, 240, 61, 240, 240, 240, 29, 240, 240, 29, 240, 240, 12, 240, 240, 240,
					240, 240, 45, 240, 240, 240, 13, 240, 240, 13, 240, 240, 240, 240, 240, 27,
					240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 11,
					240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240,
					240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240,
					240, 240, 30, 31, 240, 240, 240, 240, 240, 240, 240, 240, 30, 31, 240, 240,
					240, 240, 14, 15, 240, 240, 240, 240, 240, 240, 240, 240, 14, 15, 240, 240,
					52, 53, 54, 52, 53, 54, 240, 240, 240, 240, 52, 53, 54, 52, 53, 54,
					36, 37, 38, 36, 37, 38, 240, 240, 240, 240, 36, 37, 38, 36, 37, 38,
					20, 21, 22, 20, 21, 22, 240, 240, 240, 240, 20, 21, 22, 20, 21, 22];
				break;
			default:
				this.map.numLayers = 1;
				this.map.init(16, 16);

				//Grass
				this.map.tiles[0] = [
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191,
					191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191, 191];
				break;
		}
		GLR.initTilemap(this.map);

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

	render = (dt) => {
		GLR.render();
	}
}

const GameInstance = new Game();

export default GameInstance;