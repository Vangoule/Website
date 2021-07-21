import Shader from './Shader'
import { mat4 } from "gl-matrix";

class GLRenderer {
    /* Generic Functions */
    constructor(){
        
        this.renderables = [];
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

        GL.uniformMatrix4fv(this.shader._pMatrix, false, this.pMatrix);
        GL.uniformMatrix4fv(this.shader._mvMatrix, false, this.mvMatrix);

        for(var i = 0; i < this.renderables.length; i++)
        {
            let renderable = this.renderables[i];
                
            GL.bindBuffer(GL.ARRAY_BUFFER, renderable.vertexBuffer);
            GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(renderable.vertices), GL.STATIC_DRAW);
            GL.bindBuffer(GL.ARRAY_BUFFER, null);

            GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, renderable.indexBuffer);
            GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(renderable.indices), GL.STATIC_DRAW);
            GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
    
            GL.bindBuffer(GL.ARRAY_BUFFER, renderable.offsetBuffer);
            GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(renderable.offsets), GL.STATIC_DRAW);
            GL.bindBuffer(GL.ARRAY_BUFFER, null);
      
            GL.bindBuffer(GL.ARRAY_BUFFER, renderable.tileBuffer);
            GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(renderable.tiles), GL.STATIC_DRAW);
            GL.bindBuffer(GL.ARRAY_BUFFER, null);
        }

        this.zoom = 10;
    }

    /* Project Specific */
    update = () => {

    }

    render = () => {
        const GL = this.gl;
        GL.viewport(0, 0, GL.drawingBufferWidth, GL.drawingBufferHeight);
        GL.clearColor(0,0,0,1);
        GL.clear(this.gl.COLOR_BUFFER_BIT);

        this.width = GL.drawingBufferWidth;
        this.height = GL.drawingBufferHeight;

        //Zoom out camera by 10 times
        var sc = this.width / this.zoom; 	

        mat4.ortho(this.pMatrix, -this.width / sc, this.width / sc, -this.height / sc, this.height / sc, 0.1, 100.0);	
        mat4.identity(this.mvMatrix);
		mat4.scale(this.mvMatrix,this.mvMatrix, [1,1,1]);

        //Move the map back by 20 units
        var zoom = 20;
        mat4.translate(this.mvMatrix, this.mvMatrix, [0.0, 0.0, -zoom]);
		GL.uniform1f(this.shader._zoom, zoom);

        for(var i = 0; i < this.renderables.length; i++)
        {
            let renderable = this.renderables[i];
                
            GL.bindBuffer(GL.ARRAY_BUFFER, renderable.vertexBuffer);
            GL.vertexAttribPointer(this.shader._position, 2, GL.FLOAT, false, 0, 0);
            
            GL.bindBuffer(GL.ARRAY_BUFFER, renderable.tileBuffer);
            GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(renderable.tiles), GL.STATIC_DRAW);
            GL.vertexAttribPointer(this.shader._index, 1, GL.FLOAT, false, 0, 0);
            this.ext.vertexAttribDivisorANGLE(this.shader._index, 1);

            GL.bindBuffer(GL.ARRAY_BUFFER, renderable.offsetBuffer);
            GL.vertexAttribPointer(this.shader._offset, 2, GL.FLOAT, false, 0, 0);
            this.ext.vertexAttribDivisorANGLE(this.shader._offset, 1);

            GL.uniformMatrix4fv(this.shader._pMatrix, false, this.pMatrix);
            GL.uniformMatrix4fv(this.shader._mvMatrix, false, this.mvMatrix);
    
            GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, renderable.indexBuffer);
            this.ext.drawElementsInstancedANGLE(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0, renderable.numTiles);
            GL.flush();
        }

    }

    addRenderable = (renderable) => {
        const GL = this.gl;

        this.renderables.push(renderable);
        renderable.id = this.renderables.length - 1;

        renderable.vertexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, renderable.vertexBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(renderable.vertices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        renderable.indexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, renderable.indexBuffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(renderable.indices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);

        renderable.offsetBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, renderable.offsetBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(renderable.offsets), GL.STATIC_DRAW);
		GL.bindBuffer(GL.ARRAY_BUFFER, null);
        
		renderable.tileBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, renderable.tileBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(renderable.tiles), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);
    }

    removeRenderable = (renderable) => {
        if(renderable.id > -1)
        {
            this.renderables.splice(renderable.id, 1);
        }
    }

    removeRenderableID = (id) => {
        if(id > -1)
        {
            this.renderables.splice(id, 1);
        }
    }

}

const GLR = new GLRenderer();

export default GLR;