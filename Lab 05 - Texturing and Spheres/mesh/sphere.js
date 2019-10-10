//Populate it with static methods to get the position, index, normal, color and uv arrays for a sphere given a number of latitude bands and longitude bands.

class Sphere
{
    static positionArray(latitude, longitude)
    {
        let radius = 1;
        let vertexPosition = [];

        for (let latNumber = 0; latNumber <= latitude; latNumber++) {
            let theta = latNumber * Math.PI / latitude;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let longNumber = 0; longNumber <= longitude; longNumber++) {
                let phi = longNumber * 2 * Math.PI / longitude;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                vertexPosition.push(radius * x);
                vertexPosition.push(radius * y);
                vertexPosition.push(radius * z);
            }
        }
        return vertexPosition;
    }

    static indexArray(latitude, longitude)
    {
        let index = [];

        for (let latNumber = 0; latNumber < latitude; latNumber++) {
            for (let longNumber = 0; longNumber < longitude; longNumber++) {
               let first = (latNumber * (longitude + 1)) + longNumber;
               let second = first + longitude + 1;

               index.push(first);
               index.push(second);
               index.push(first + 1);

               index.push(second);
               index.push(second + 1);
               index.push(first + 1); 
            }
        }
        return index;
    }

    static normalArray(latitude, longitude)
    {
        let normal = [];

        for (let latNumber = 0; latNumber <= latitude; latNumber++) {
            let theta = latNumber * Math.PI / latitude;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let longNumber = 0; longNumber <= longitude; longNumber++) {
                let phi = longNumber * 2 * Math.PI / longitude;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                normal.push(x);
                normal.push(y);
                normal.push(z);
            }
        }
        return normal;
    }

    static colorArray(latitude, longitude, fill)
    {
        let color = [];

        for (let latNumber = 0; latNumber <= latitude; latNumber++) {
            for (let longNumber = 0; longNumber <= longitude; longNumber++) {
                color.push(fill[0]);
                color.push(fill[1]);
                color.push(fill[2]);
            }
        }
        return color;
    }

    static uvArray(latitude, longitude)
    {
        let textureCoord = [];

        for (let latNumber = 0; latNumber <= latitude; latNumber++) {
            for (let longNumber = 0; longNumber <= longitude; longNumber++) {
                let u = 1 - (longNumber / longitude);
                let v = 1 -(latNumber / latitude);

                textureCoord.push(u);
                textureCoord.push(v);
            }
        }
        return textureCoord;
    }

    static create(gl, program, latitude, longitude, imageID, flipTexture)
    {
        var vertexPosition = Sphere.positionArray(latitude, longitude);
        var index = Sphere.indexArray(latitude, longitude);
        var normal = Sphere.normalArray(latitude, longitude);
        var textureCoord = Sphere.uvArray(latitude, longitude);
       return new UVMesh(
           gl,
           program,
           vertexPosition,
           index,
           normal,
           textureCoord,
           imageID,
           flipTexture
       );
    }
    static createRGB(gl, program, latitude, longitude, fill)
    {
        var vertexPosition = Sphere.positionArray(latitude, longitude);
        var index = Sphere.indexArray(latitude, longitude);
        var normal = Sphere.normalArray(latitude, longitude);
        var colorCoord = Sphere.colorArray(latitude, longitude, fill);
       return new RGBMesh(
           gl,
           program,
           vertexPosition,
           index,
           normal,
           colorCoord,
       );
    }
}