
*[Back to the main page](../README.md)*

## Adding a complex object

Now, I'm going to work in `figures-04`,
adding an object to the scene, of arbitrary shape, in some formats.
This will be also a good example of how to add new stuff to our project.

### Inserting an object in the scene

Let's start by inserting a object in OBJ format, `urjc.obj`, in the scene.
For that, we will use the `obj-model` property:

```html
<a-entity position="-1 1 -9" obj-model="obj: url(urjc.obj)"
          material="color: green" scale="0.1 0.1 0.2">
</a-entity>
```

We will also add code in `figures.js` to ensure that `webpack`
finds the object description, `urjc.obj`:

```javascript
import urjc_object from './urjc.obj';
```

And finally, a new rule for `webpack.config.js`,
to copy the object description to the `dist` directory:

```javascript
// 3D objects
{
  test: /\.obj$/,
  include: [path.resolve(__dirname, 'src')],
  use: [
    {
      loader: 'file-loader',
      options: {name: '[name].[ext]'}
    }
  ]
},
```

The result should show a green coin, with the URJC logo in it,
in our previous scene.

### Animating the object

First, and just to improve how the scene loads,
let´s add the object as an asset:

```html
<a-assets>
  ...
  <a-asset-item id="urjc" src="urjc.obj"></a-asset-item>
</a-assets>
```

And let's move the object. For that, we will add a new `a-animation`
entity, defining how the object will rotate:

```html
<a-entity position="-1 1 -9" obj-model="obj: #urjc"
          material="color: green" scale="0.1 0.1 0.2">
  <a-animation attribute="rotation" dur="10000" fill="forwards"
               to="0 360 0" repeat="indefinite">
  </a-animation>
</a-entity>
```

### Adding a glTF model

Now, let's get a model from [Sketchfab](https://sketchfab.com/),
downloaded in glTF format, and let´s add it to our scene,
rotating too.

But before that, we need an important change to our project.
Images in Sketchfab, when downloaed as glTF, are a .zip file which
includes a .gltf file and some others. The .glft file is a
kind of "driver", that needs the other (with textures, for example),
to produce the 3D image in all its glory.

So, in short, we will unzip the .zip file in a directory under `src`,
since it is a source file for our project,
and then we will need to copy it to our `dist` directory,
for exporting it via the HTTP server.

For copying directories, we can use a webpack plugin: `copy-webpack-plugin`:

```bash
$ npm install --save-dev copy-webpack-plugin
```

The object I've used is
[Pony Cartoon](https://sketchfab.com/models/885d9f60b3a9429bb4077cfac5653cf9#),
by [Slava Z](https://sketchfab.com/slava) (CC-by license).
I download it, and then I unzip it in the `src/auto` directory in my project.

I then need to tell `webpack` how to copy it to the `dist` directory,
by adding some stuff to `webpack.config.js`:

```javascript
...
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  ...
  plugins: [
    ...
    new CopyWebpackPlugin([
      {from:'src/auto',to:'auto'}
    ])
  ]
}
```

And then, in the `figures.html` file:

```html
<a-assets>
  ...
  <a-asset-item id="car" src="auto/scene.gltf"></a-asset-item>
</a-assets>
...
<a-scene>
  <a-entity position="-2 2 -9" gltf-model="#car"
            scale="0.01 0.01 0.01">
    <a-animation attribute="rotation" dur="10000" fill="forwards"
                 to="0 360 0" repeat="indefinite">
    </a-animation>
  </a-entity>
...
</a-scene>
```

You can see how, for the car, we first define an asset
(only with the gltf "driver" file), and then in the scene
we create a new object, with property `gltf-model`,
and some scale (because the model was too big for our scene).
An animation just completes the entity, making it rotate.

### Generating dist files and running everything

As we saw in the previous section, the complete process to build the project is:

```
$ cd figures-04
$ npm install
$ npm run start
```

This will build everything,
you will only need a browser to see the resulting scene.

### Results

Check the resulting [virtual reality scene](web/index.html).
