import Attributes from './attributes.js';

const vertex = `

attribute vec2 ${Attributes.POSITION};
attribute float ${Attributes.INDEX};
attribute vec2 ${Attributes.OFFSET};
attribute vec2 ${Attributes.UV};

uniform mat4 mvMatrix;
uniform mat4 pMatrix;
uniform mat4 ipMatrix;

uniform float ${Attributes.CELL_SIZE};
uniform float ${Attributes.CANVAS_SIZE};
uniform float ${Attributes.GRID_SIZE};

varying float iOut;
varying vec2 uvOut;
varying vec4 positionOut;

varying float cellSizeOut;
varying float canvasSizeOut;
varying float gridSizeOut;

void main(void) {
vec4 pos = pMatrix * mvMatrix * vec4(${Attributes.POSITION} + ${Attributes.OFFSET}, 0, 1);
iOut = index; 
uvOut = ${Attributes.UV};
positionOut = vec4(${Attributes.POSITION}, 0, 1.0);

canvasSizeOut = ${Attributes.CANVAS_SIZE};
cellSizeOut = ${Attributes.CELL_SIZE};
gridSizeOut = ${Attributes.GRID_SIZE};

gl_Position = pos;

}

`
export default vertex;


