/*	Eduard Bolanos
	COARTIT-464 Sec01L
	9/25/2019
	Lab 04 Mesh
*/
precision mediump float;

// unique to each fragment (interpolated)
varying vec3 fragPosition;
varying vec3 fragColor;
varying vec3 fragNormal;

// basic ambient light
uniform vec3 ambientLight;

// basic directional light
uniform vec3 lightDirection;
uniform vec3 lightIntensity;

void main()
{
	vec3 light = ambientLight + lightIntensity * max(-dot(fragNormal, normalize(lightDirection)), 0.0);

	gl_FragColor = vec4(light * fragColor, 1.0);
}