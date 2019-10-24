precision mediump float;

// data type definitions
struct DirectionalLight
{
	vec3 direction; // xyz direction of light
	vec3 ambient; // rgb contribution to scene ambient light
	vec3 diffuse; // rgb intensity of diffuse 
	vec3 specular; // rgb intensity of specular
};

struct PointLight
{
	vec3 position; // xyz position of source
	vec3 ambient; // rgb contribution to scene ambient light
	vec3 diffuse; // rgb intensity of diffuse
	vec3 specular; // rgb intensity of specular
};

struct Material
{
	float diffuse;
	float specular;
	float ambient;
	float shininess;
};

// lights
uniform vec3 ambientLight;
uniform DirectionalLight directionalLights[16];
uniform PointLight pointLights[16];

// model parameters
uniform Material material;

// camera
uniform vec3 cameraPosition;

// surface parameters
varying vec3 fragPosition;
varying vec3 fragNormal;

// texture parameters
varying vec2 fragTexCoord;
uniform sampler2D sampler;

void main()
{
	vec4 texel = texture2D(sampler, fragTexCoord);	
	// TODO complete the main method (determine what color the fragment should be, assign to gl_FragColor)
	vec3 ambient = ambientLight;
	vec3 diffuse = vec3(0.0, 0.0, 0.0);
	vec3 specular = vec3(0.0, 0.0, 0.0);

	for (int i = 0; i < 16; i++)
	{
	ambient += directionalLights[i].ambient;
		ambient += pointLights[i].ambient;




		vec3 Sl = -directionalLights[i].direction;
		float d = dot(Sl, fragNormal);
		vec3 Rl = reflect(Sl, fragNormal);
		vec3 V = normalize(cameraPosition - fragPosition);
		if(d > 0.0){
			diffuse += d * directionalLights[i].diffuse;
			float rad2 = length(directionalLights[i].direction - fragPosition);
			float r = dot(Rl, V);
			if(r > 0.0){
				specular += pow(r, material.shininess) 
					* directionalLights[i].specular 
					/ (rad2 * rad2 + 1.0);
			}
		}



		Sl = normalize(pointLights[i].position - fragPosition);
		float oof = dot(Sl, fragNormal);
		if(oof > 0.0){
			float rad = length(pointLights[i].position - fragPosition);
			diffuse += oof * pointLights[i].diffuse / (rad * rad + 1.0); 
			
			Rl = reflect(Sl, fragNormal);
			float oof2 = dot(Rl, V);

			if(oof2 > 0.0){
				specular += pow(oof2, material.shininess) 
					* pointLights[i].specular 
					/ (rad * rad + 1.0);
			}
		}
	 }

	vec3 light = (material.ambient * ambient) + (material.diffuse * diffuse) + (material.specular * specular);

	gl_FragColor = vec4(light * texel.rgb, texel.a);
}

