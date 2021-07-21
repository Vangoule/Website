
const fragment = `
precision mediump float;
varying float iOut;

void main(void) {
    //gl_FragColor = vec4(1.0,0,0,1);
float index = iOut;
if(index == 0.){
   gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}else if(index == 1.){
   gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}else if(index == 2.){
   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}else{
   gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
}`;

export default fragment;