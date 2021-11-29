
*[Back to the main page](../../README.md)*

## Adding a complex object

Now, I'm going to work in `figures-04`,
adding an object to the scene, of arbitrary shape, in some formats.
This will be also a good example of how to add new stuff to our project.
The final result will be quite similar to [figures-04](../../figures-04/README.md),
but using webpack in this case (see there details about the scene itself,
how to include OBJ or GLTF files, etc).

### Inserting an object in the scene

Let's start by inserting a object in OBJ format, `urjc.obj`, in the scene.
We will add code in `figures.js` to ensure that `webpack`
finds the object description, `urjc.obj`:

```javascript
import urjc_object from './urjc.obj';
```

And a new rule for `webpack.config.js`,
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

### Generating dist files and running everything

As we saw in the previous section, the complete process to build the project is:

```
$ cd webpack/figures-04
$ npm install
$ npm run start
```

This will build everything,
you will only need a browser to see the resulting scene.

### Results

Check the resulting [virtual reality scene](web/index.html).
