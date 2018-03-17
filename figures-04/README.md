
*[Back to the main page](../README.md)*

## Adding a complex object

Now, I'm going to work in `figures-04`,
adding an object to the scene, of arbitrary shape, in OBJ format.
This will be also a good example of how to add new stuff to our project.

### Inserting an object in the scene

Let's start by inserting the object, `urjc.obj`, in the scene.
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

### Generating dist files and running everything

As we saw in the previous section, the complete process to build the project is:

```
$ cd figures-03
$ npm install
$ npm run start
```

This will build everything,
you will only need a browser to see the resulting scene.

### Results

Check the resulting [virtual reality scene](web/index.html).
