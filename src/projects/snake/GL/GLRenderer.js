class GLRenderer {
    init(webGL){
        this.gl = webGL;
    }

    clear = (r,g,b,a) => {
        this.gl.clearColor(r,g,b,a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}

const GLR = new GLRenderer();

export default GLR;