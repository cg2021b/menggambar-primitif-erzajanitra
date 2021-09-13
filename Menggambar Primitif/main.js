function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");
    //internet explorer--> experimental web gl
    //chrome, ms edge --> webgl

    //koordinat titik segitiga--> butuh 6 titik
    var vertices = [
        -0.5, 0.5,   //Titik A
        -0.5, -0.5,  //Titik B
        0.5, -0.5  //Titik C
    ];

    //create buffer : banyak titik
    //bind buffer untuk gabungin banyak titik
    //buffer data : copy data
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
     
    //definisi vertex --> pakai vec2 karena berada di sumbu x dan y
    var vertexShaderCode = `
    attribute vec2 a_Position;
    void main(){
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }`;

    //membuat vertex shader
     var vertexShader = gl.createShader(gl.VERTEX_SHADER);
     gl.shaderSource(vertexShader, vertexShaderCode);
     gl.compileShader(vertexShader);

     //definisi fragment shader dari html
    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
    //membuat fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //package program --> compile
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //untuk menggambar 3 titik x, y vertex
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    //set warna background
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    //clear background
    gl.clear(gl.COLOR_BUFFER_BIT);

    //command untuk menggambar
    //triangles: 3 titik
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}