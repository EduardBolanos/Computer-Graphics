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
		this.gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.normalBufferObject);
		this.gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.normalArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	}

	/*
		Call Mesh's activate
		Set up attribute arrays / pointers for color and normal attributes
	*/
	activate()
	{
		super.activate();

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.colorBufferObject);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBufferObject);

				
	}

	draw()
	{
		super.draw();

	}
}