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
        this.tileMap = null;
        this.canvas = null;
    }

    initGL = (webGL) => {
        this.gl = webGL;
        this.ext = this.gl.getExtension("ANGLE_instanced_arrays");
        this.shader = new Shader(webGL);
    }

    getTexture = (image_URL) => {
        const GL = this.gl;

        var image = new Image();
        image.src = image_URL;
        image.texture = false;

        image.onload = (e) => {
            var texture = GL.createTexture();

            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
            //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

            GL.bindTexture(GL.TEXTURE_2D, texture);

            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);

            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);

            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);

            GL.bindTexture(GL.TEXTURE_2D, null);

            image.texture = texture;

        };

        return image;
    };

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

    getTileIndexAtMouse = () => {
        var screenSpaceOneX = (this.sc / this.width);
        var screenSpaceOneY = (this.sc / this.height);

        //Bind canvas coordinates from 0-1 to -1 to 1
        var canvasXMinusOneToOne = (2.0 * this.getCanvasX() / this.width - 1.0);
        var canvasYMinusOneToOne = (2.0 * this.getCanvasY() / this.height - 1.0);

        var iX = (this.tileMap.width / 2) + Math.floor(canvasXMinusOneToOne / screenSpaceOneX);
        var iY = (this.tileMap.height / 2) + Math.floor(canvasYMinusOneToOne / screenSpaceOneY);

        var index = [];
        index.x = iX;
        index.y = iY;
        return index;
    }

    renderLayer = (layer) => {
        const GL = this.gl;
        GL.bindBuffer(GL.ARRAY_BUFFER, this.tileMap.tileBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.tileMap.tiles[layer]), GL.STATIC_DRAW);
        GL.vertexAttribPointer(this.shader._index, 1, GL.FLOAT, false, 0, 0);
        this.ext.vertexAttribDivisorANGLE(this.shader._index, 1);

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.tileMap.indexBuffer);
        this.ext.drawElementsInstancedANGLE(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0, this.tileMap.numTiles);
        GL.flush();
    }

    render = () => {
        const GL = this.gl;

        const canvas = document.querySelector('canvas');
        if (canvas) {
            const canvasWidth  = canvas.clientWidth;
            const canvasHeight = canvas.clientHeight;
    
            const shouldResize = canvas.width  !== canvasWidth ||
                               canvas.height !== canvasHeight;
           
            //This will ensure the canvas is always square
            if (shouldResize) {
              canvas.width  = canvasWidth;
              canvas.height = canvasWidth;
            }

            GL.viewportWidth = canvas.width;
            GL.viewportHeight = canvas.height;
        }
        this.canvas = canvas;

        this.width = GL.drawingBufferWidth;
        this.height = GL.drawingBufferHeight;

        GL.viewport(0, 0, GL.drawingBufferWidth, GL.drawingBufferHeight);
        GL.clearColor(0, 0, 0, 1);
        GL.clear(this.gl.COLOR_BUFFER_BIT);

        if (this.tileMap) {
            //Assuming a width of 800 and a height of 800. 800 / (8/2) = 800 / 4 = 200 or 1/4th of half of the screen. Assuming 16x16 map, 800/8 = 100 or 1/8th of half of the screen.
            //This is used to scale the screen so that it always fills the view. It's half as we use -sc to sc as the range.
            var sc = this.width / ((this.tileMap.width / 2));
            this.sc = sc;

            mat4.ortho(this.pMatrix, -this.width / sc, this.width / sc, -this.height / sc, this.height / sc, 0.1, 100.0);
            mat4.identity(this.mvMatrix);
            mat4.scale(this.mvMatrix, this.mvMatrix, [2, 2, 2]);

            //Move the map back so we aren't inside the mesh.
            var zoom = 1;
            mat4.translate(this.mvMatrix, this.mvMatrix, [0.0, 0.0, -zoom]);
            GL.uniform1f(this.shader._zoom, zoom);


            if (this.tileMap.atlasTexture.texture) {
                //Ensure that texture0 is free to use and activate it.
                GL.activeTexture(GL.TEXTURE0);

                //Bind the texture to this slot.
                GL.bindTexture(GL.TEXTURE_2D, this.tileMap.atlasTexture.texture);

                //Send the texture as a uniform.
                GL.uniform1i(this.shader._sampler, 0);
            }

            GL.bindBuffer(GL.ARRAY_BUFFER, this.tileMap.vertexBuffer);
            GL.vertexAttribPointer(this.shader._position, 2, GL.FLOAT, false, 0, 0);

            GL.bindBuffer(GL.ARRAY_BUFFER, this.tileMap.uvBuffer);
            GL.vertexAttribPointer(this.shader._uv, 2, GL.FLOAT, false, 0, 0);

            GL.bindBuffer(GL.ARRAY_BUFFER, this.tileMap.offsetBuffer);
            GL.vertexAttribPointer(this.shader._offset, 2, GL.FLOAT, false, 0, 0);
            this.ext.vertexAttribDivisorANGLE(this.shader._offset, 1);

            GL.uniformMatrix4fv(this.shader._pMatrix, false, this.pMatrix);
            GL.uniformMatrix4fv(this.shader._mvMatrix, false, this.mvMatrix);

            for (let layer = 0; layer < this.tileMap.numLayers; layer++) {
                this.renderLayer(layer);
            }
        }
    }

    initTilemap = (tilemap) => {
        const GL = this.gl;
        this.tileMap = tilemap;

        this.tileMap.vertexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.tileMap.vertexBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.tileMap.vertices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.tileMap.indexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.tileMap.indexBuffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.tileMap.indices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);

        this.tileMap.uvBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.tileMap.uvBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.tileMap.uvs), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.tileMap.offsetBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.tileMap.offsetBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.tileMap.offsets), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.tileMap.tileBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.tileMap.tileBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.tileMap.tiles), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

    }
}

const GLR = new GLRenderer();

export default GLR;