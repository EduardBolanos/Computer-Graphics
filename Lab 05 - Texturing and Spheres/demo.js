/*var vertShaderText = [
'precision mediump float;',
'attribute vec3 vertPosition;',
'attribute vec2 vertTexCoord;',
'attribute vec3 vertNormal;',
'varying vec3 fragPosition;',
'varying vec2 fragTexCoord;',
'varying vec3 fragNormal;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'void main()',
'{',
'	fragPosition = (mWorld * vec4(vertPosition, 1.0)).xyz;',
'	fragTexCoord = vertTexCoord;',
'	fragNormal = (mWorld * vec4(vertNormal, 0.0)).xyz;',
'	gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragShaderText = [
'precision mediump float;',
'varying vec3 fragPosition;',
'varying vec3 fragNormal;',
'varying vec2 fragTexCoord;',
'uniform sampler2D sampler;',
'uniform vec3 ambientLight;',
'uniform vec3 lightDirection;',
'uniform vec3 lightIntensity;',
'void main()',
'{',
'	vec4 texel = texture2D(sampler, fragTexCoord);',
'	vec3 light = ambientLight + lightIntensity * max( -dot( fragNormal,normalize(lightDirection) ), 0.0);',
'	gl_FragColor = vec4(texel.rgb * light, texel.a);',
'}'
].join('\n');

var filemap = {'uvVertexShaderText' : vertShaderText,
			   'uvFragShaderText' : fragShaderText};*/

var RunDemo = function (filemap)
{
	console.log("Initializing Demo");

	// get canvas, set dimensions to fill browser window
	var canvas = document.getElementById('the_canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// get WebGL context, confirm...
	var gl = canvas.getContext('webgl');

	if (!gl)
	{
		console.log('Browser is using experimental webgl.');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('This requires a browser which supports WebGL; Yours does not.');
	}

	// set background color and clear
	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// set up culling via depth and back face, set front face to CCW
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	// create shader program
	var uvProgram = createProgram(
		gl, 
		filemap['uvVertexShaderText'],
		filemap['uvFragShaderText']
	);

	var rgbProgram = createProgram(
		gl, 
		filemap['rgbVertexShaderText'],
		filemap['rgbFragShaderText']
	);

	// set up view matrix
	var viewMatrix = new Float32Array(16);
	var cameraPosition = [0,10,-10];
	var lookAtPosition = [0,0,0];
	var cameraUpDirection = [0,1,0];
	mat4.lookAt(
		viewMatrix,       // target matrix to apply values to
		cameraPosition,   // where is the camera
		lookAtPosition,   // what point is the camera looking at
		cameraUpDirection // which direction is upward from the cameras PoV
	);

	// apply view matrix to corresponding location in shaders
	gl.useProgram(uvProgram);
	var matViewUniformLocation = gl.getUniformLocation(uvProgram, 'mView');
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	
	gl.useProgram(rgbProgram);
	var matViewUniformLocation = gl.getUniformLocation(rgbProgram, 'mView');
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

	// set up (perspective) projection matrix
	var projMatrix = new Float32Array(16);
	var fieldOfView = Math.PI / 4;
	var aspect = canvas.width / canvas.height;
	var near = 0.01;
	var far = 1000.0;
	mat4.perspective(
		projMatrix,  // target matrix
		fieldOfView, // vertical field of view, in radians
		aspect,      // aspect ratio
		near,        // distance to near clip plane
		far          // distance to far clip plane
	);
	
	gl.useProgram(uvProgram);
	var matProjUniformLocation = gl.getUniformLocation(uvProgram, 'mProj');
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
	
	gl.useProgram(rgbProgram);
	var matProjUniformLocation = gl.getUniformLocation(rgbProgram, 'mProj');
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

	// set ambient light
	var ambientLight = [0.2, 0.3, 0.2];

	gl.useProgram(uvProgram);
	var ambientLightUniformLocation = gl.getUniformLocation(uvProgram, 'ambientLight');
	gl.uniform3fv(ambientLightUniformLocation, ambientLight);
	
	gl.useProgram(rgbProgram);
	var ambientLightUniformLocation = gl.getUniformLocation(rgbProgram, 'ambientLight');
	gl.uniform3fv(ambientLightUniformLocation, ambientLight);

	// set up directional light
	var lightDirection = [1, -1, 0];
	var lightIntensity = [0.9, 0.8, 0.6];

	gl.useProgram(uvProgram);
	var lightDirectionUniformLocation = gl.getUniformLocation(uvProgram, 'lightDirection');
	var lightIntensityUniformLocation = gl.getUniformLocation(uvProgram, 'lightIntensity');
	gl.uniform3fv(lightDirectionUniformLocation, lightDirection);
	gl.uniform3fv(lightIntensityUniformLocation, lightIntensity);

	gl.useProgram(rgbProgram);
	var lightDirectionUniformLocation = gl.getUniformLocation(rgbProgram, 'lightDirection');
	var lightIntensityUniformLocation = gl.getUniformLocation(rgbProgram, 'lightIntensity');
	gl.uniform3fv(lightDirectionUniformLocation, lightDirection);
	gl.uniform3fv(lightIntensityUniformLocation, lightIntensity);

	// create cube using Mesh class
	var uvCube1 = Cube.uvcreate(
		gl,
		uvProgram,
		'radioactive-crate',
		false
	);

	var rgbCube2 = Cube.create(
		gl,
		rgbProgram, // shader program to use to draw this
		[210/255, 255/255, 210/255]
	);


	uvCube1.translate(new Vector(5,0,0));
	rgbCube2.translate(new Vector(-5,0,0));

	/* uncomment the two lines below once you've created the spheres*/
	var uvSphere = Sphere.create(
		gl,
		uvProgram,
		20,
		20,
		'earth-texture',
		false
	);
	var rgbSphere = Sphere.createRGB(
		gl,
		rgbProgram,
		20,
		20,
		[0, 0, 210/255]
	);
	rgbSphere.translate(new Vector(0,0,5));
	uvSphere.translate(new Vector(0,0,-5));

	var angle = Math.PI / 100;
	var origin = new Vector();
	var orbit = new Quaternion(angle/2, 0, 1, 0);
	var localRot = new Quaternion(4*angle, 0, 0, 1);

	var main = function()
	{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		uvCube1.rotateAround(origin, orbit);
		uvCube1.localRotate(localRot);
		uvCube1.draw();

		rgbCube2.localRotate(localRot);
		rgbCube2.rotateAround(origin, orbit);
		rgbCube2.draw();

		/* uncomment the six lines below once you've created the spheres */
		rgbSphere.localRotate(localRot);
		rgbSphere.rotateAround(origin, orbit);
		rgbSphere.draw();

		uvSphere.localRotate(localRot);
		uvSphere.rotateAround(origin, orbit);
		uvSphere.draw();

		requestAnimationFrame(main);
	}
	requestAnimationFrame(main);
}

var InitDemo = function()
{
	// locations of imported files
	var urls = [
		'/shaders/vert.uv.glsl',
		'/shaders/frag.uv.glsl',
		'/shaders/vert.rgb.glsl',
		'/shaders/frag.rgb.glsl'
	];

	// imported file keys for file key-value map, respective
	var names = [
		'uvVertexShaderText',
		'uvFragShaderText',
		'rgbVertexShaderText',
		'rgbFragShaderText',
	];

	// file types, respective (text or JSON)
	var types = [
		'text',
		'text',
		'text',
		'text'
	];
	
	var importer = new resourceImporter(urls, names, types, RunDemo);
}