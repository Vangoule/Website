import Attributes from './attributes.js';

const vertex = `

attribute vec2 ${Attributes.POSITION};
attribute float ${Attributes.INDEX};
attribute vec2 ${Attributes.OFFSET};

uniform mat4 mvMatrix;
uniform mat4 pMatrix;
varying float iOut;
void main(void) {
vec4 pos = pMatrix * mvMatrix * vec4(${Attributes.POSITION} + ${Attributes.OFFSET}, 0, 1);
iOut = index; 

gl_Position = pos;

}

`
export default vertex;


