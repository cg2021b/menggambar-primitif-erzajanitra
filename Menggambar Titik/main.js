function main(){
    //ambil canvas by ID
    var canvas = document.getElementById("myCanvas");
    //library yg digunakan
    var gl = canvas.getContext("webgl");

    //posisi titik (x,y,z,w proyeksi)
    var vertexShaderCode = `
    void main(){
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 10.0;
    }`;

    //gambar vertex sesuai koordinat posisi
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    //fragmen dan vertex terpisah shg pendefinisiannya beda

    //memberikan fragmen warna
    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }`;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //buat program gabungin vertex dan fragment
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram,vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.clearColor(0.0, 0.0, 0.0, 1.0); //warna bg frame
    gl.clear(gl.COLOR_BUFFER_BIT); //clear canvas agar bersih

    //command menggambar
    gl.drawArrays(gl.POINTS, 0, 1);




}