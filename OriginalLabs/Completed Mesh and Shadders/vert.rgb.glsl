precision mediump float;

// unique to each vertex
attribute vec3 vertPosition;
attribute vec3 vertColor;
attribute vec3 vertNormal;

// unique to each fragment (interpolated)
varying vec3 fragPosition;
varying vec3 fragColor;
varying vec3 fragNormal;

// uniform data (the same for every vertex)
// unique to the object being drawn
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
	fragPosition = (mWorld * vec4(vertPosition, 1.0)).xyz;
	fragColor = vertColor;
	fragNormal = (mWorld * vec4(vertNormal, 0.0)).xyz;
	gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}
