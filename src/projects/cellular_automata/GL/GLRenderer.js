import Shader from './Shader'
import { mat4 } from "gl-matrix";
import React from 'react';

class GLRenderer {

    constructor() {
        this.canvasRef = React.createRef();
        this.mousePos = [];
        this.mousePos.x = 0;
        this.mousePos.y = 0;
        this.renderables = [];
        this.grid = null;
        this.canvas = null;
        this.showGrid = true;
    }

    initGL = (webGL) => {
        this.gl = webGL;
        this.ext = this.gl.getExtension("ANGLE_instanced_arrays");
        this.shader = new Shader(webGL);
    }

    init = () => {
        const GL = this.gl;
        this.shader.useProgram();
        this.mvMatrix = mat4.create();
        this.pMatrix = mat4.create();

        GL.enable(GL.BLEND);
        GL.disable(GL.DEPTH_TEST);
        GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

        GL.viewport(0, 0, GL.drawingBufferWidth, GL.drawingBufferHeight);

        GL.uniformMatrix4fv(this.shader._pMatrix, false, this.pMatrix);
        GL.uniformMatrix4fv(this.shader._mvMatrix, false, this.mvMatrix);

        this.zoom = 10;
    }

    /* Project Specific */
    update = () => {

    }

    getCanvasX = () => {
        return this.mousePos.x - this.canvasRef.current.offsetLeft;
    }

    getCanvasY = () => {
        return this.mousePos.y - this.canvasRef.current.offsetTop;
    }

    getCellIndexAtMouse = () => {
        var screenSpaceOneX = (this.sc / this.width);
        var screenSpaceOneY = (this.sc / this.height);

        var xPos = (this.getCanvasX()) / this.zoom;
        var yPos = (this.getCanvasY()) / this.zoom;

        var canvasX0ToOne = (xPos / (this.width));
        var canvasY0ToOne = (yPos / (this.height));

        var iX = Math.floor(canvasX0ToOne / screenSpaceOneX) + ((this.zoom-1) * (this.grid.width/(2*this.zoom))) + this.xOffset;
        var iY = Math.floor(canvasY0ToOne / screenSpaceOneY) + ((this.zoom-1) * (this.grid.height/(2*this.zoom))) + this.yOffset;

        if (iX >= this.grid.width ) { return this.grid.width - 1; }

        var index = [];
        index.x = iX;
        index.y = iY;
        return index;
    }

    renderGrid = (layer) => {
        const GL = this.gl;
        GL.bindBuffer(GL.ARRAY_BUFFER, this.grid.cellBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.grid.cells), GL.STATIC_DRAW);

        GL.vertexAttribPointer(this.shader._index, 1, GL.FLOAT, false, 0, 0);
        this.ext.vertexAttribDivisorANGLE(this.shader._index, 1);

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.grid.indexBuffer);
        this.ext.drawElementsInstancedANGLE(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0, this.grid.numCells);
        GL.flush();
    }

    render = (zoom, xOffset, yOffset) => {
        const GL = this.gl;
        this.zoom = zoom;
        this.xOffset = xOffset;
        this.yOffset = yOffset;

        const canvas = document.querySelector('canvas');
        if (canvas) {
            const canvasWidth = canvas.clientWidth;
            const canvasHeight = canvas.clientHeight;

            const shouldResize = canvas.width !== canvasWidth ||
                canvas.height !== canvasHeight;

            //This will ensure the canvas is always square
            if (shouldResize) {
                canvas.width = canvasWidth;
                canvas.height = canvasWidth;
            }

            GL.viewportWidth = canvas.width;
            GL.viewportHeight = canvas.height;
        }
        this.canvas = canvas;

        this.width = GL.drawingBufferWidth;
        this.height = GL.drawingBufferHeight;

        GL.viewport(0, 0, GL.drawingBufferWidth, GL.drawingBufferHeight);
        GL.clearColor(0.2, 0.2, 0.2, 1);
        GL.clear(this.gl.COLOR_BUFFER_BIT);

        if (this.grid) {
            //Assuming a width of 800 and a height of 800. 800 / (8/2) = 800 / 4 = 200 or 1/4th of half of the screen. Assuming 16x16 map, 800/8 = 100 or 1/8th of half of the screen.
            //This is used to scale the screen so that it always fills the view. It's half as we use -sc to sc as the range.
            var sc = this.width / ((this.grid.width));
            this.sc = sc;

            mat4.ortho(this.pMatrix, -this.width / sc, this.width / sc, -this.height / sc, this.height / sc, 0.1, 100.0);
            mat4.identity(this.mvMatrix);
            mat4.scale(this.mvMatrix, this.mvMatrix, [2*zoom, 2*zoom, 2*zoom]);

            //Calculate what the border size will be so we can move half a border out to center the grid
            var borderSize = (this.grid.cellSize / (canvas.clientWidth / this.grid.width));

            //Move the map back so we aren't inside the mesh.
            mat4.translate(this.mvMatrix, this.mvMatrix,[-xOffset+(borderSize/2), yOffset+(borderSize/2), -1]);

            GL.uniform1f(this.shader._zoom, zoom);

            GL.uniform1f(this.shader._canvasSize, canvas.clientWidth);
            if (this.showGrid === true) {
                GL.uniform1f(this.shader._cellSize, this.grid.cellSize);
            }
            else {
                GL.uniform1f(this.shader._cellSize, 100);
            }
            GL.uniform1f(this.shader._gridSize, this.grid.gridSize);

            GL.bindBuffer(GL.ARRAY_BUFFER, this.grid.vertexBuffer);
            GL.vertexAttribPointer(this.shader._position, 2, GL.FLOAT, false, 0, 0);

            GL.bindBuffer(GL.ARRAY_BUFFER, this.grid.uvBuffer);
            GL.vertexAttribPointer(this.shader._uv, 2, GL.FLOAT, false, 0, 0);

            GL.bindBuffer(GL.ARRAY_BUFFER, this.grid.offsetBuffer);
            GL.vertexAttribPointer(this.shader._offset, 2, GL.FLOAT, false, 0, 0);
            this.ext.vertexAttribDivisorANGLE(this.shader._offset, 1);

            GL.uniformMatrix4fv(this.shader._pMatrix, false, this.pMatrix);
            GL.uniformMatrix4fv(this.shader._mvMatrix, false, this.mvMatrix);

            this.renderGrid();
        }
    }

    initGrid = (grid) => {
        const GL = this.gl;
        this.grid = grid;

        this.grid.vertexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.grid.vertexBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.grid.vertices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.grid.indexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.grid.indexBuffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.grid.indices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);

        this.grid.uvBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.grid.uvBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.grid.uvs), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.grid.offsetBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.grid.offsetBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.grid.offsets), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.grid.cellBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.grid.cellBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.grid.cells), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

    }
}

const GLR = new GLRenderer();

export default GLR;