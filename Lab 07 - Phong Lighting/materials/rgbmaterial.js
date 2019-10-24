class RGBMaterial
{
	constructor(gl, program, diffuse=new Vector(1,1,1), specular=new Vector(1,1,1), ambient=new Vector(1,1,1), shininess=0.3)
	{
		// TODO store gl and program as fields
		this.gl = gl;
		this.program = program;


		// TODO store material attributes (diffuse, specular, ambient, shininess) as fields
		this.diffuse = diffuse.toArray();
		this.specular = specular.toArray();
		this.ambient = ambient.toArray();
		this.shininess = shininess;

		// HINT the attributes (other than shininess) are provided as vectors, but we want to store them as Float32Arrays.
		// The Vector class has a toArray() function for this purpose.



		// TODO store locations of Uniforms holding material attributes in the shader (look in the shader for their names)
		this.diffuseUniformLocation = gl.getUniformLocation(this.program, 'material.diffuse');
		this.specularUniformLocation = gl.getUniformLocation(this.program, 'material.specular');
		this.ambientUniformLocation = gl.getUniformLocation(this.program, 'material.ambient');
		this.shininessUniformLocation = gl.getUniformLocation(this.program, 'material.shininess');

	}

	activate()
	{
		//this.update();
		//this.gl.useProgram(this.program);

		// TODO update set the values of material uniforms in the shader program
		// HINT: diffuse, specular, and ambient are all 3 floats stored in a single array,
		// so use the webgl context's uniform3fv function.
		this.gl.uniform3fv(this.diffuseUniformLocation, this.diffuse);
		this.gl.uniform3fv(this.specularUniformLocation, this.specular);
		this.gl.uniform3fv(this.ambientUniformLocation, this.ambient);

		// shininess is a single float, so use uniform1f.
		this.gl.uniform1f(this.shininessUniformLocation, this.shininess);		
	}
}