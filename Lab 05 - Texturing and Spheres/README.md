# Lab 05: Texturing and Spheres

1. Download [uvMeshDemo.zip](https://github.com/EduardBolanos/Computer-Graphics/tree/master/OriginalLabs) and follow the example to complete the UVMesh class and a corresponding shaders.
    - (Note: there are completed and uncompleted versions of the uvMeshDemo in [Original Labs](https://github.com/EduardBolanos/Computer-Graphics/tree/master/OriginalLabs).)
2. Copy your Cube class from the previous lab into shapes.js. Edit the Cube.create method to work with RGB or UV cubes. Replace the arrays and UVMesh creations in demo.js with calls to Cube.create. Change one of the two cubes in the initial demo to an RGB cube, so you have one of each type of cube.
3. Create a Sphere class. Populate it with static methods to get the position, index, normal, color and uv arrays for a sphere given a number of latitude bands and longitude bands. You may find this [link](https://bl.ocks.org/camargo/649e5903c4584a21a568972d4a2c16d3) helpful for making the arrays, and this [link](https://threejs.org/docs/#api/en/geometries/SphereGeometry) helpful for visualizing what's being done.
4. Use these arrays to create and display a textured sphere. You may use the provided spherical texture of the earth's surface, or find your own spherical texture.
5. Make the Sphere.create static method, which should mirror the Cube.create method but for spheres.
6. Replace your spheres created in step 4 calls to "Sphere.create".
7. Your demo should have 1 RGB cube, 1 textured cube, 1 RGB sphere, and 1 textured sphere.
