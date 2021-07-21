import GLR from "./GL/GLRenderer";
import Renderable from "./GL/Renderable";

import Atlas from './Resources/Images/outsideTransparent.png'
export default class TileMap extends Renderable {

    constructor() {
        super();
        this.numTiles = 0;
        this.tileSize = 0.5;
        this.halfTileSize = this.tileSize / 2;

        this.numLayers = 2;

        this.vertices = []; //A single square, to be instanced across the tilemap.
        this.indices = []; //A single square made of two triangles.
        this.offsets = []; //The position of each square in the tilemap.


        this.tiles = new Array(this.numLayers);
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i] = new Array(this.numTiles);
        }


        this.tileID = new Array(this.numTiles);

    }

    /*
    Takes a square array and generates rendering data such as vertices and indices
    */
    init = (numTiles) => {

        this.numTiles = numTiles;

        this.tileSize = 0.5;

        var halfTileSize = this.tileSize / 2;

        this.offsets = [

        ];

        this.vertices = [
            -halfTileSize, -halfTileSize, //Bottom Left
            halfTileSize, -halfTileSize, //Bottom Right
            halfTileSize, halfTileSize,  //Top Right
            -halfTileSize, halfTileSize  //Top Left
        ];

        this.uvs = [
            0, 0, //BL
            1, 0, //BR
            1, 1, //TR
            0, 1 //TL
        ];

        //Clockwise order
        this.indices = [0, 3, 2,  //Bottom left, Top Left, Top Right
            2, 1, 0]; //Top Right, Bottom Right, Bottom Left

        this.mapSize = Math.sqrt(this.numTiles);
        var curID = 0;
        this.tileID = [];

        for (let y = 0; y < this.mapSize; y++) {
            for (let x = 0; x < this.mapSize; x++) {
                this.tileID.push(curID++);
            }
        }

        this.centerMap();
        this.atlasImage = Atlas;
        this.atlasTexture = GLR.getTexture(this.atlasImage);
        GLR.addRenderable(this);
    };

    centerMap = () => {
        this.mapSize = Math.sqrt(this.numTiles);
        var halfTileSize = this.tileSize / 2;

        this.offsets = [];

        for (var y = 0; y < this.mapSize; y++) {
            for (var x = 0; x < this.mapSize; x++) {
                this.offsets.push((x * this.tileSize) - ((this.mapSize * this.tileSize) / 2) + halfTileSize);
                this.offsets.push((-y * this.tileSize) + ((this.mapSize * this.tileSize) / 2) - halfTileSize);
            }
        }
    };


    convertTo2DArray = (arr, size) =>
    {
        var len = arr.length + 1;
        var newArr = [];              

        for (var i = 0; (i + size) < len; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }

    /*Converts a 2D tile index to a 1D index*/
    getTileID = (x, y) => {
        if (x >= 0 && x < this.mapSize) {
            if (y >= 0 && y < this.mapSize) {
                return this.convertTo2DArray(this.tileID, this.mapSize)[y][x];
            }
        }
    };

    fillWorld = (id, layer) => {
        for (var i = 0; i < this.mapSize; i++) {
            for (var j = 0; j < this.mapSize; j++) {
                this.tiles[layer][i * this.mapSize + j] = id;
            }
        }
    }
}