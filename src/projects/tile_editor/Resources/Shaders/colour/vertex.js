import Attributes from './attributes.js';

const vertex = `

attribute vec2 ${Attributes.POSITION};
attribute float ${Attributes.INDEX};
attribute vec2 ${Attributes.OFFSET};
attribute vec2 ${Attributes.UV};


uniform mat4 mvMatrix;
uniform mat4 pMatrix;
uniform mat4 ipMatrix;

varying float iOut;
varying vec2 uvOut;

void main(void) {
vec4 pos = pMatrix * mvMatrix * vec4(${Attributes.POSITION} + ${Attributes.OFFSET}, 0, 1);
iOut = index; 
uvOut = ${Attributes.UV};
gl_Position = pos;

}

`
export default vertex;


