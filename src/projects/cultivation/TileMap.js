import GLR from "./GL/GLRenderer";
import Renderable from "./GL/Renderable";

export default class TileMap extends Renderable{

    constructor ()
    {
        super();
        this.numTiles = 0;
        this.tileSize = 0.5;
        this.halfTileSize = this.tileSize / 2;
        this.tileID = [];

        this.vertices = []; //A single square, to be instanced across the tilemap.
        this.indices  = []; //A single square made of two triangles.
        this.offsets  = []; //The position of each square in the tilemap.

        this.tiles = [];
    }

    /*
    Takes a square array and generates rendering data such as vertices and indices
    */
    init = () => {
		
	    this.numTiles = this.tiles.length; 
		
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

        //Clockwise order
        this.indices = [0, 3, 2,  //Bottom left, Top Left, Top Right
                        2, 1, 0]; //Top Right, Bottom Right, Bottom Left
					  
		this.mapSize = Math.sqrt(this.numTiles);
		
		this.tileID = [];
		var i = 0;
		
		for (let y = 0; y < this.mapSize; y++) {
            for (let x = 0; x < this.mapSize; x++) {
				this.tileID.push(i++);
			}
		}

        this.centerMap();
        GLR.addRenderable(this);
    };

    centerMap = () => {
		this.mapSize = Math.sqrt(this.numTiles);
		var halfTileSize = this.tileSize / 2;
		
		this.offsets = [];
		
		for (var y = 0; y < this.mapSize; y++) {
            for (var x = 0; x < this.mapSize; x++) {
                this.offsets.push((x * this.tileSize) - ((this.mapSize * this.tileSize) / 2) + halfTileSize) ;
			    //this.offsets.push(x * this.tileSize);
			    //this.offsets.push(-y * this.tileSize);
                this.offsets.push((-y * this.tileSize) + ((this.mapSize * this.tileSize) / 2) - halfTileSize);
            }
        }
	};

    /*Converts a 2D tile index to a 1D index*/
    getTileID = (x,y) => {
		if(x >= 0 && x < this.mapSize)
		{
			if(y >= 0 && y < this.mapSize)
			{	
				var m = this.tileID;
				var n = [];
				var i = 0;

				for (var l = m.length + 1; (i + this.mapSize) < l; i += this.mapSize) {
					n.push(m.slice(i, i + this.mapSize));
				}

				return n[y][x];	
			}
		}
	};
}