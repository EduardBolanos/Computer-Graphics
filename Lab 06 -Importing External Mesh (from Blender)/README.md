# Lab 06: Importing External Mesh (from Blender)

1. Download [suzyDemo.zip](https://github.com/EduardBolanos/Computer-Graphics/tree/master/OriginalLabs)
2. Download [io_three.zip](https://github.com/EduardBolanos/Computer-Graphics/tree/master/OriginalLabs) and install the exporter in Blender.
3. Next we'll make and texture two simple models in Blender:
    -  Create a "models" folder in your project.
    -  Create and unwrap a cube in Blender. Use the UV editor to map it onto the provided "cube-texture.jpg" or another texture of your choosing. Export as a JSON named "cube.json" using the ThreeJS add-on to Blender (requires Blender 2.79).
    -  Create, unwrap, and paint the default monkey head mesh in Blender. Save as "suzy.blender" and also export the a corresponding JSON file "suzy.json".
    -  Ensure these work with the provided demo script (You'll need to change "JSONToUVMesh" calls to "ThreeJSToUVMesh" calls if you exported using ThreeJS, but if you used an online converter like this one (Links to an external site.) instead you should leave the calls as is).
4. Create at least 2 more textured models and display them in the same demo (this requires editing both "demo.js" and "index.html").
    - You may find [this modeling tutorial series](https://www.youtube.com/watch?v=yi87Dap_WOc&t=29s) helpful. It goes through modeling good practices and then through UV mapping and texturing.
    - If you want to do more detailed paint jobs, check out [this video](https://www.youtube.com/watch?v=0orFcVkk1T4) on making your own brushes for use in Blender!
    - All models should be unique, both in the shape of the mesh and in the texture used.
    - Models may be hand-painted or may be painted covered with a downloaded texture
    - Note that we'll only be getting keeping the position, index, normal and uv arrays from the Blender file; nothing you do with respect to material or other special effects will show up in our WebGL setup.
