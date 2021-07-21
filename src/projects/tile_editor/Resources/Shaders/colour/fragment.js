
const fragment = `
precision mediump float;
varying vec2 uvOut;
varying float iOut;
uniform sampler2D sampler;

void main(void) {
    //gl_FragColor = vec4(1.0,0,0,1);
   /*int index = int(iOut);
   if(index == 191){
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   }else if(index == 236){
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
   }else if(index == 220){
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   }else{
      gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
   }*/
   float index = iOut;
   float xIndex = mod(index, 16.0);
   float yIndex = floor(index / 16.0);
   float scaleFactor = 1.0 / 16.0;
   vec2 uv = scaleFactor * (uvOut + vec2(xIndex, yIndex));
   vec4 color = vec4(0,0,0,0) + texture2D(sampler, uv);
   
   if(color.a < 0.5)
      discard;
   
   gl_FragColor = color;
}`;

export default fragment;