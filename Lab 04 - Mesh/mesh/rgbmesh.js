class RGBMesh extends Mesh
{
	/*
		Set up Mesh with appropriate args
		Set location references for color, normal attributes
		Create and populate buffers for color, normal attributes
	*/ 
	constructor(gl, program, positionArray, indexArray, normalArray, colorArray, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(gl, program, positionArray, indexArray, position, rotation, scale);
		this.colorArray = new Float32Array(colorArray);
		this.normalArray = new Float32Array(normalArray);

		this.coloAttribLocation = this.gl.getAttribLocation(this.program, 'vertColor');
		this.normalAttribLocation = this.gl.getAttribLocation(this.program, 'vertNormal');

		this.colorBufferObject = gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBufferObject);
		this.gl.bufferData(gl.ARRAY_BUFFER, this.colorArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(gl.ARRAY_BUFFER, null);

		this.normalBufferObject = this.gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBufferObject);
		this.gl.bufferData(gl.ARRAY_BUFFER, this.normalArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(gl.ARRAY_BUFFER, null);

	}

	/*
		Call Mesh's activate
		Set up attribute arrays / pointers for color and normal attributes
	*/
	activate()
	{
		super.activate();

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBufferObject);
		//enable vertex for normal and color but do them seperate.
		this.gl.enableVertexAttribArray(this.coloAttribLocation);
		this.gl.vertexAttribPointer(
			this.coloAttribLocation,
			3,
			this.gl.FLOAT,
			this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBufferObject);
		this.gl.enableVertexAttribArray(this.normalAttribLocation);
		this.gl.vertexAttribPointer(
			this.normalAttribLocation,
			3,
			this.gl.FLOAT,
			this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
	}
}