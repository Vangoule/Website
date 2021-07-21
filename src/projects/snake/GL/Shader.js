import VertexSource from '../Resources/Shaders/colour/vertex'
import FragmentSource from '../Resources/Shaders/colour/fragment'

import Attributes from '../Resources/Shaders/colour/attributes'

export default class Shader {
    constructor(gl) {
        const GL = gl;
        this.gl = GL;

        const vertexShader = this.getShader(VertexSource, GL.VERTEX_SHADER, "VERTEX");
        const fragmentShader = this.getShader(FragmentSource, GL.FRAGMENT_SHADER, "FRAGMENT");

        const program = GL.createProgram();
        this.program = program;

        GL.attachShader(this.program, vertexShader);
        GL.attachShader(this.program, fragmentShader);
    
        GL.linkProgram(this.program);

        this._position = GL.getAttribLocation(this.program, Attributes.POSITION);
        this._offset = GL.getAttribLocation(this.program, Attributes.OFFSET);
        this._index = GL.getAttribLocation(this.program, Attributes.INDEX);

        this._mvMatrix = GL.getUniformLocation(this.program, Attributes.M_V_MATRIX);
        this._pMatrix = GL.getUniformLocation(this.program, Attributes.P_MATRIX);
        this._zoom = GL.getUniformLocation(this.program, Attributes.ZOOM);
        this._tileID = GL.getAttribLocation(this.program, Attributes.TILEID);

        GL.enableVertexAttribArray(this._position);
        GL.enableVertexAttribArray(this._offset);
        GL.enableVertexAttribArray(this._index);

    }

    getShader = (source, type, typeString) => {
        const GL = this.gl;

        var shader = GL.createShader(type);
        GL.shaderSource(shader, source);
        GL.compileShader(shader);
        if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
            alert("ERROR IN " + typeString + " SHADER : " + GL.getShaderInfoLog(shader));
            return false;
        }
        return shader;
    };

    useProgram = () => {
        this.gl.useProgram(this.program);
    }

    enablePositionAttributes = () => {
        const GL = this.gl;
        GL.enableVertexAttribArray(this._position);
        GL.enableVertexAttribArray(this._offset);
        GL.enableVertexAttribArray(this._index);

       // GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
       // GL.vertexAttribPointer(this._position, 2, GL.FLOAT, false, 0, 0);
		
	    //GL.bindBuffer(GL.ARRAY_BUFFER, this.tileBuffer);
      //  GL.vertexAttribPointer(this._index, 1, GL.FLOAT, false, 0, 0);
	//	ext.vertexAttribDivisorANGLE(this._index, 1);

       // GL.bindBuffer(GL.ARRAY_BUFFER, this.offsetBuffer);
     //   GL.vertexAttribPointer(this._offset, 2, GL.FLOAT, false, 0, 0);
     //   ext.vertexAttribDivisorANGLE(this._offset, 1);
    }
}








