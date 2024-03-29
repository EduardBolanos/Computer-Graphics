
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
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// set up culling via depth and back face, set front face to CCW
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	// create shaders
	var uvProgram = createProgram(
		gl, 
		filemap['uvVertShaderText'],
		filemap['uvFragShaderText']
	);

	var rgbProgram = createProgram(
		gl, 
		filemap['rgbVertShaderText'],
		filemap['rgbFragShaderText']
	);

	var skyboxProgram = createProgram(
		gl,
		filemap['skyboxVertShaderText'],
		filemap['skyboxFragShaderText']
	);

	// set up camera
	let aspect = canvas.width / canvas.height;
	let fieldOfView = Math.PI / 4;
	let nearClip = 0.01;
	let farClip = 1000.0;
	var camera = new FPSCamera(
		gl,
		[uvProgram, rgbProgram],
		aspect,
		fieldOfView,
		nearClip,
		farClip
	);
	camera.translate(new Vector(2, -2, 8));
	camera.lookAt(new Vector(0,0,0), new Vector(0, 1, 0));

	// set ambient light parameters
	var ambientLight = new Vector(0.2, 0.8, 0.6);

	// set up point lights' parameters
	var pointLightPosition = new Vector(0, 0, 0);
	var pointLightDiffuse = new Vector(1, 1, 4);
	var pointLightSpecular = new Vector(1, 4, 1);

	// use light manager to create lights
	var lightManager = new LightManager(gl, [rgbProgram, uvProgram], ambientLight);
	lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);
	lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);
	lightManager.update();

	// set up directional light's parameters and create directional light
	var directionalLightDirection = new Vector(1, -4, 2);
	var directionalLightDiffuse = new Vector(0.4, 0.7, 0.6);
	var directionalLightSpecular = new Vector(0.4, 0.7, 0.6);
	lightManager.addDirectionalLight(directionalLightDirection, directionalLightDiffuse, directionalLightSpecular);
	lightManager.update();


	// rgb emerald material properties
	var emeraldDiffuse = new Vector(0.07568, 0.61424, 0.07568);
	var emeraldSpecular = new Vector(0.633, 0.727811, 0.633);
	var emeraldAmbient = new Vector(0.0215, 0.1745, 0.0215);
	var emeraldShininess = 0.6;

	// create emerald monkey head
	emeraldSuzy = JSONToRGBMesh(
		filemap['suzyJSON'],
		gl,
		rgbProgram,
		emeraldDiffuse,
		emeraldSpecular,
		emeraldAmbient,
		emeraldShininess
	);

	emeraldSuzy.translate(new Vector(-2, 0, 0));

	// textured earth material properties
	var earthDiffuse = 0.7;
	var earthSpecular = 0.3;
	var earthAmbient = 0.2;
	var earthShininess = 0.1;

	// create textured earth (sphere)
	uvEarth = new UVMesh(
		gl,
		uvProgram,
		Sphere.positionArray(30,30),
		Sphere.indexArray(30,30),
		Sphere.positionArray(30,30),
		Sphere.uvArray(30,30),
		'earth-texture',
		false,
		earthDiffuse,
		earthSpecular,
		earthAmbient,
		earthShininess
	);

	uvEarth.translate(new Vector(2, 0, 0));

	// set up models to follow point lights
	lightSuzy1 = JSONToRGBMesh(
		filemap['suzyJSON'],
		gl,
		rgbProgram,
		emeraldDiffuse,
		emeraldSpecular,
		emeraldAmbient,
		emeraldShininess
	);

	lightSuzy1.setScale(new Vector(0.1, 0.1, 0.1));

	lightSuzy2 = JSONToRGBMesh(
		filemap['suzyJSON'],
		gl,
		rgbProgram,
		emeraldDiffuse,
		emeraldSpecular,
		emeraldAmbient,
		emeraldShininess
	);

	lightSuzy2.setScale(new Vector(0.1, 0.1, 0.1));


	// skybox
	var skyboxImageIDs = [
		'skybox-right',
		'skybox-left',
		'skybox-top',
		'skybox-bottom',
		'skybox-back',
		'skybox-front'
	];
	var skybox = new Skybox(gl, skyboxProgram, skyboxImageIDs, camera);


	// set up some arbitrary constants for motion
	var startTime = Date.now();
	var time;
	let k_theta = 1/1000;
	let k_alpha = 1/3101;
	let hr = 5;
	let vr = 2;
	var theta;
	var alpha;
	var cosTheta;
	var lightPosition;// = new Vector(2, 0, 1.5);

	var main = function()
	{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		time = Date.now() - startTime;
		theta = time * k_theta;
		alpha = time * k_alpha;
		cosTheta = Math.cos(theta);

		lightPosition = new Vector(
			hr*cosTheta*Math.sin(alpha),
			vr*Math.sin(2*theta),
			vr*cosTheta*Math.cos(alpha)
		);

		lightManager.pointLights[0].setPosition(lightPosition);
		lightManager.pointLights[1].setPosition(lightPosition.inverse())
		lightManager.update();

		camera.update();

		lightSuzy1.setPosition(lightPosition);
		lightSuzy1.draw();

		lightSuzy2.setPosition(lightPosition.inverse());
		lightSuzy2.draw();

		emeraldSuzy.draw();

		uvEarth.draw();

		skybox.draw();

		requestAnimationFrame(main);
	}
	requestAnimationFrame(main);
}

var InitDemo = function()
{
	// locations of imported files
	var urls = [
		'shaders/vert.uv.glsl',
		'shaders/frag.uv.glsl',
		'shaders/vert.rgb.glsl',
		'shaders/frag.rgb.glsl',
		'shaders/vert.skybox.glsl',
		'shaders/frag.skybox.glsl',
		'models/suzy.json'
	];

	// imported file keys for file key-value map, respective to locations
	var names = [
		'uvVertShaderText',
		'uvFragShaderText',
		'rgbVertShaderText',
		'rgbFragShaderText',
		'skyboxVertShaderText',
		'skyboxFragShaderText',
		'suzyJSON'
	];

	// file types, respective to locations (text or JSON)
	var types = [
		'text',
		'text',
		'text',
		'text',
		'text',
		'text',
		'json'
	];
	
	var importer = new resourceImporter(urls, names, types, RunDemo);
}