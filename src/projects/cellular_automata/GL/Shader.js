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
        this._uv = GL.getAttribLocation(this.program, Attributes.UV);

        this._sampler = gl.getUniformLocation(this.program, Attributes.SAMPLER);

        this._mvMatrix = GL.getUniformLocation(this.program, Attributes.M_V_MATRIX);
        this._pMatrix = GL.getUniformLocation(this.program, Attributes.P_MATRIX);
        this._ipMatrix = GL.getUniformLocation(this.program, Attributes.IP_MATRIX);
        this._zoom = GL.getUniformLocation(this.program, Attributes.ZOOM);
        this._tileID = GL.getAttribLocation(this.program, Attributes.TILEID);
        
        this._canvasSize = GL.getUniformLocation(this.program, Attributes.CANVAS_SIZE);
        this._cellSize = GL.getUniformLocation(this.program, Attributes.CELL_SIZE);
        this._gridSize = GL.getUniformLocation(this.program, Attributes.GRID_SIZE);

        GL.enableVertexAttribArray(this._position);
        GL.enableVertexAttribArray(this._offset);
        GL.enableVertexAttribArray(this._index);
        GL.enableVertexAttribArray(this._uv);
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
        GL.enableVertexAttribArray(this._uv);
    }
}








