/*	Eduard Bolanos
	COARTIT-464 Sec01L
	9/25/2019
	Lab 04 Mesh
*/
class Mesh extends Transform
{
	/*
		Set up transform
		Set up WebGL references
		Create and populate position and index buffer objects
	*/
	constructor(gl, program, positionArray, indexArray, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(position, rotation, scale);

		this.gl = gl;
		this.program = program;

		this.positionArray = new Float32Array(positionArray);
		this.indexArray = new Uint16Array(indexArray);

		this.mWorldUniformLocation = this.gl.getUniformLocation(this.program, 'mWorld');
		this.positionAttribLocation = this.gl.getAttribLocation(this.program, 'vertPosition');

		this.positionBufferObject = gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBufferObject);
		this.gl.bufferData(gl.ARRAY_BUFFER, this.positionArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(gl.ARRAY_BUFFER, null);

		this.indexBufferObject = this.gl.createBuffer();
		this.gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);
		this.gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indexArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	}

	/*
		Update transform
		Use correct shader program
		Bind position attribute array to element array buffer
		Set up vertex attribute array / pointer for position attribute
	*/
	activate()
	{

		this.update();

		this.gl.useProgram(this.program);
		
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBufferObject);

		this.gl.enableVertexAttribArray(this.positionAttribLocation);		
		this.gl.vertexAttribPointer(
				this.positionAttribLocation,
				3,
				this.gl.FLOAT,
				this.gl.FALSE,
				3 * Float32Array.BYTES_PER_ELEMENT,
				0
			);
		this.gl.uniformMatrix4fv(this.mWorldUniformLocation, this.gl.FALSE, this.mWorld);
	}

	/*
		Call activate
		Draw elements
		Unbind buffers
	*/
	draw()
	{
		this.activate();
		this.gl.drawElements(
				this.gl.TRIANGLES,
				this.indexArray.length,
				this.gl.UNSIGNED_SHORT,
				0
			);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	}
}