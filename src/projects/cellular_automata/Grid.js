import GLR from "./GL/GLRenderer";
import Renderable from "./GL/Renderable";

export default class Grid extends Renderable {

    constructor() {
        super();
        this.numCells = 0;
        this.cellSize = 1.0;

        this.vertices = []; //A single square, to be instanced across the tilemap.
        this.indices = [];  //A single square made of two triangles.
        this.offsets = [];  //The position of each square in the tilemap.

        this.cells = new Array(this.numCells);

        this.width = 0;
        this.height = 0;
    }

    /*
    Takes a square array and generates rendering data such as vertices and indices
    */
    init = (width, height) => {

        this.width = width;
        this.height = height;
        this.numCells = width * height;

        delete this.cells;
        this.cells = new Array(this.numCells);
 
        this.offsets = [

        ];

        this.vertices = [
            0, 0, //Bottom Left
            this.cellSize, 0, //Bottom Right
            this.cellSize, this.cellSize,  //Top Right
            0, this.cellSize  //Top Left
        ];

        this.uvs = [
            0, 0, //BL
            1, 0, //BR
            1, 1, //TR
            0, 1  //TL
        ];

        //Clockwise order
        this.indices = [0, 3, 2,  //Bottom left, Top Left, Top Right
            2, 1, 0]; //Top Right, Bottom Right, Bottom Left

        this.gridSize = Math.sqrt(this.numCells);

        this.centerGrid();
        this.fillGrid(0);
        GLR.initGrid(this);
    };

    centerGrid = () => {
        this.offsets = [];

        for (var y = 0; y < this.gridSize; y++) {
            for (var x = 0; x < this.gridSize; x++) {
                this.offsets.push((x * this.cellSize) - ((this.gridSize * this.cellSize) / 2) );
                this.offsets.push((-y * this.cellSize) + ((this.gridSize * this.cellSize) / 2) - this.cellSize);
            }
        }
    };

    /*Converts a 2D tile index to a 1D index*/
    getCellID = (x, y) => {
        return (y * this.gridSize) + x;
    };

    fillGrid = (id) => {
        for (var i = 0; i < this.gridSize; i++) {
            for (var j = 0; j < this.gridSize; j++) {
                this.cells[i * this.gridSize + j] = id;
            }
        }
    }
}