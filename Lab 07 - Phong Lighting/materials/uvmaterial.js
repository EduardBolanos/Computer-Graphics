class UVMaterial
{
	// unlike RGBMaterial, diffuse speculart and ambient are all floats
	constructor(gl, program, imageID, flipTexture, diffuse=1.0, specular=1.0, ambient=1.0, shininess=1.0)
	{
		// TODO store gl and program as fields
		this.gl = gl;
		this. program = program;

		// TODO store material attributes (diffuse, specular, ambient, shininess) as fields
		this.diffuse = diffuse;
		this.specular = specular;
		this.ambient = ambient;
		this.shininess = shininess;

		// TODO store locations of Uniforms holding material attributes in the shader (look in the shader for their names)
		this.diffuseUniformLocation = gl.getUniformLocation(this.program, 'material_diffuse');
		this.specularUniformLocation = gl.getUniformLocation(this.program, 'material_specular');
		this.ambientUniformLocation = gl.getUniformLocation(this.program, 'material_ambient');
		this.shininessUniformLocation = gl.getUniformLocation(this.program, 'material_shininess');
		
		// TODO create, bind, set paramaters for texture object (see UVMesh from previous labs)
		// don't forget to unbind the texture when you're done!
		this.textureObject = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.textureObject);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.RGBA,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			document.getElementById(imageID)
		)
		gl.bindTexture(gl.TEXTURE_2D, null);

	}

	activate()
	{
		// TODO update set the values of material uniforms in the shader program
		// HINT: material parameters here are single floats, so use the gl context's uniform1f function

		this.update();
		this.gl.useProgram(this.program);

		this.gl.uniform1f(this.diffuseUniformLocation, this.diffuse);
		this.gl.uniform1f(this.specularUniformLocation, this.specular);
		this.gl.uniform1f(this.ambientUniformLocation, this.ambient);
		this.gl.uniform1f(this.shininessUniformLocation, this.shininess);

		// TODO bind the texture
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureObject);
	}

	post_draw()
	{
		// TODO unbind the texture
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	}
}