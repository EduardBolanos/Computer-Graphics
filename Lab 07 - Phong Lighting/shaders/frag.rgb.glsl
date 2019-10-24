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
	vec3 diffuse; // diffuse reflection color
	vec3 specular; // specular reflection color
	vec3 ambient; // ambient reflection color
	float shininess; // "shininess / glossiness" constant
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


//idk

vec4 calculateDirectionalLight(DirectionalLight light, Material calcFragMaterial, vec3 calcFragPostion, vec3 calcFragNormal)
{
	vec4 ambient = vec4(0.0, 0.0, 0.0, 0.0);
	vec4 diffuse = vec4(0.0, 0.0, 0.0, 0.0);
	vec4 specular = vec4(0.0, 0.0, 0.0, 0.0);
	
	float diffuseFactor = dot(-light.direction, calcFragNormal);

	ambient = vec4(light.ambient * calcFragMaterial.ambient, 1.0);
	
	if(calcFragNormal > 0.0)
	{		
		diffuse = vec4(light.diffuse * diffuseFactor * calcFragMaterial.diffuse, 1.0); 
		
		vec3 directionToCamera = normalize(cameraPosition - calcFragPostion);
		vec3 flippedLightDirection = normalize(((2.0 * dot(-light.direction, calcFragNormal)) * calcFragNormal) + light.direction);
		float specularFactor = dot(directionToCamera, flippedLightDirection);
		if(specular_factor > 0.0)
		{
			specular = vec4(light.specular * pow(specularFactor, calcFragMaterial.shininess) * calcFragMaterial.specular, 1.0);
		}
	}
	
	return ambient + diffuse + specular;
}

vec4 calculatePointLight(PointLight light, Material calcFragMaterial, vec3 calcFragPosition, vec3 calcFragNormal)
{
	vec4 ambient = vec4(0.0, 0.0, 0.0, 0.0);
	vec4 diffuse = vec4(0.0, 0.0, 0.0, 0.0);
	vec4 specular = vec4(0.0, 0.0, 0.0, 0.0);
	
	vec3 distance = calcFragPosition - light.position;
	float distance2 = (distance.x * distance.x) + (distance.y * distance.y) + (distance.z * distance.z);
	vec3 lightDirection = normalize(distance);
	
	float diffuseFactor = dot(-lightDirection, calcFragNormal);
	
	ambient = vec4(light.ambient * calcFragMaterial.ambient, 1.0);
	
	if(diffuseFactor > 0.0)
	{
		diffuse = vec4(light.diffuse * diffuseFactor * calcFragMaterial.diffuse, 1.0);
	
		vec3 directionFromCamera = normalize(calcFragPosition - cameraPosition);
		vec3 flippedLightDirection = normalize(((2.0 * dot(-lightDirection, calcFragNormal)) * calcFragNormal) + lightDirection);
		float specularFactor = dot(directionFromCamera, flippedLightDirection);
		if(specularFactor > 0.0)
		{		
			specular = vec4(light.specular * pow(specularFactor, calcFragMaterial.shininess) * calcFragMaterial.specular, 1.0);
		}
	}
	
	return ambient + ((diffuse + specular) / (distance2 + 1.0));
}

void main()
{
	// TODO decide what color the fragment should be, assign to gl_FragColor
	vec4 color = vec4(material.diffuse, 1.0);
	vec4 totalColor = color * vec4(ambientLight, 1.0);
	
	for(int i = 0; i < 16; i++)
	{
		totalColor += calculateDirectionalLight(directionalLights[i], material, fragPosition, fragNormal);
		totalColor += calculatePointLight(pointLights[i], material, fragPosition, fragNormal);
	}
	
	gl_FragColor = totalColor;
}
