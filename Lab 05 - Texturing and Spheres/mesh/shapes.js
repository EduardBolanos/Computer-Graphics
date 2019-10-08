/*	Eduard Bolanos
    Lab 05 - Texturing and Spheres
*/
class Cube
{
    static uvArray()
    {
        return [
            // top
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            // bottom
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            // right
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            // left
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // back
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // front
            0, 0,
            0, 1,
            1, 1,
            1, 0
        ]
    }
    static postionArray()
    {
        return [
            // top			
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5, 
            0.5, 0.5, 0.5,  
            -0.5, 0.5, 0.5, 
            // bottom
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            // right
            -0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5, 
            -0.5, 0.5, 0.5,		 
            -0.5, -0.5, 0.5, 
            // left
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5, 
            0.5, 0.5, 0.5,		 
            0.5, 0.5, -0.5, 
            // back
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5, 
            -0.5, 0.5, -0.5,
            // front
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5, 
            0.5, 0.5, 0.5, 		
            0.5, -0.5, 0.5
        ];
    }

    static indexArray()
    {
        return [
            // top
            0, 2, 1,
            0, 3, 2,
            // bottom
            4, 6, 5,
            4, 7, 6,
            // right
            8, 10, 9,
            8, 11, 10,
            // left
            12, 14, 13,
            12, 15, 14,
            // back
            16, 18, 17,
            16, 19, 18,
            // front
            20, 22, 21,
            20, 23, 22
        ];
    }

    static normalArray()
    {
        return [	
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
    
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
    
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
    
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
    
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
    
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];
    }

    static solidColorArray(color)
    {
        var r = color[0];
        var g = color[1];
        var b = color[2];
        return [
            // top 
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,
            
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,
            // left 
            r, g, b,
            r, g, b,
             r, g, b,
            r, g, b,
            
            r, g, b,
            r, g, b,
             r, g,b,
            r, g, b,
            // front 
            r, g, b,
            r, g, b,
            r,g, b,
            r, g, b,
    
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b
        ];
    }
    static create(gl, program, fill, postion = new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
    {
        return new RGBMesh(
            gl, // WebGL context
            program, // shader program to use to draw this
            Cube.postionArray(), // position attribute array
            Cube.indexArray(), // index array
            Cube.normalArray(), // nomral array
            Cube.solidColorArray(fill), // color array
            postion,
            rotation,
            scale
        );  
    }

    static uvcreate(gl, program, imageID, flipTexture, postion = new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
    {
        return new UVMesh(
            gl, // WebGL context
            program, // shader program to use to draw this
            Cube.postionArray(), // position attribute array
            Cube.indexArray(), // index array
            Cube.normalArray(), // nomral array
            Cube.uvArray(),
            imageID,
            flipTexture,
            postion,
            rotation,
            scale
        );  
    }
}