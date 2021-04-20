
*[Back to the main page](../README.md)*

## Adding complex 3D objects

Now, I'm going to work in `figures-04`,
adding an object to the scene, of arbitrary shape, in some formats.

### Inserting an object in the scene

Let's start by inserting a object in OBJ format, `urjc.obj`, in the scene.
For that, we will use the `obj-model` property:

```html
<a-entity position="-1 1 -9" obj-model="obj: url(../assets/3d/urjc.obj)"
          material="color: green" scale="0.1 0.1 0.2">
</a-entity>
```

The result should show a green coin, with the URJC logo in it,
in our previous scene.

### Animating the object

First, and just to improve how the scene loads,
let´s add the object as an asset:

```html
<a-assets>
  ...
  <a-asset-item id="urjc" src="../assets/3d/urjc.obj"></a-asset-item>
</a-assets>
```

And let's move the object. For that, we will add a new `animation`
component, defining how the object will rotate:

```html
      <a-entity position="-2 1 -9" obj-model="obj: #urjc"
                material="color: green" scale="0.1 0.1 0.2"
                animation="property: rotation; dur: 10000;
                           dir: normal; loop: true;
                           to: 0 360 0">
      </a-entity>
```

### Adding a glTF model

Now, let's get a model from [Sketchfab](https://sketchfab.com/),
downloaded in glTF format, and let´s add it to our scene,
rotating too.

Images in Sketchfab, when downloaed as glTF, are a .zip file which
includes a .gltf file and some others. The .glft file is a
kind of "driver", that needs the other (with textures, for example),
to produce the 3D image in all its glory.
As we did with the URJC logo, we will place this directory in
`assets/3d`.

The object I've used is
[Pony Cartoon](https://sketchfab.com/models/885d9f60b3a9429bb4077cfac5653cf9#),
by [Slava Z](https://sketchfab.com/slava) (CC-by license).
I download it, and then I unzip it in the `src/auto` directory in my project.

So, in the `figures.html` file we have:

```html
...
<a-scene>
  <a-assets>
    ...
    <a-asset-item id="car" src="../assets/3d/auto/scene.gltf"></a-asset-item>
  </a-assets>
  
  <a-entity position="-2 2 -9" gltf-model="#car"
            scale="0.01 0.01 0.01"
            animation="property: rotation; dur: 10000;
                       dir: normal; loop: true;
                       to: 0 360 0">
  </a-entity>
...
</a-scene>
```

You can see how, for the car, we first define an asset
(only with the gltf "driver" file), and then in the scene
we create a new object, with property `gltf-model`,
and some scale (because the model was too big for our scene).
An animation just completes the entity, making it rotate.

### Results

Check the resulting [virtual reality scene](figures.html).
