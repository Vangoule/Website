
const fragment = `
precision mediump float;
varying vec2 uvOut;
varying float iOut;
varying vec4 positionOut;

varying float cellSizeOut;
varying float canvasSizeOut;
varying float gridSizeOut;

void main(void) {
   float index = iOut;
   if(index == 0.){
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
   }else if(index == 1.){
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
   }else if(index == 2.){
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
   }else if(index == 3.){
      gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
   }else if(index == 4.){
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
   }else{
      gl_FragColor = vec4(0.78, 0.5, 0.5, 1.0);
   }

   float cellSize = cellSizeOut;
   float canvasSize = canvasSizeOut;
   float gridSize = gridSizeOut;

   //this.grid.cellSize / (canvas.clientWidth / this.grid.width)
   float borderSize = cellSize - ((cellSize / (canvasSize / gridSize))+0.0001);
   if((positionOut.x <= -borderSize || positionOut.x >= borderSize) || (positionOut.y <= -borderSize || positionOut.y >= borderSize))
   {
     gl_FragColor = vec4(0.5, 0.5, 0.5, 0.9);
   }
}`;

export default fragment;