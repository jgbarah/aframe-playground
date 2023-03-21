
*[Back to the main page](../README.md)*

## Visualizing data with components

Now, I'm going to work in `data-02`,
visualizing some data points with a scatterplot,
as we did in [data-01](../data-01).
But now, I will be using A-frame components
for the spheres and the axis.

We will follow the documentation in
[Writing a component](https://aframe.io/docs/1.4.0/introduction/writing-a-component.html)

### Writing a component

Writing an A-Frame component is easy: just produce a JavaScript object
which specifies how the component will be. For example, we
produce a component for visualizing a plot (sphere) in the scene.
The component is named `datapoint`, and produces the same result
as the `plotDot` function in `data-01`. The component is expressed
as a JavaScript object with two propierties: `schema` and `update`.
This object is passed as a parameter to `AFRAME.registerComponent`:

```javascript
AFRAME.registerComponent('datapoint', {
    schema: {
      ...
    },
    update: function () {
      ...
    }
});
```

The first property, `schema`, defines the attributes that
can be used to instantiate the component:

```javascript
schema: {
  position: {type: 'vec3', default: {x:0, y:0, z:0}},
  color: {type: 'string', default: 'red'},
  size: {type: 'number', default: 1}
}
```

You can get more information about which types can be specified,
and about the schema definition in general in the
[Schema section in the Component documentation](https://github.com/aframevr/aframe/blob/master/docs/core/component.md#schema).

The second property, `update`, is the code that will be run
whenever the component is updated in the DOM, including when it is
inserted in it for the first time:

```javascript
update: function () {
  var self = this;
  self.sphere = document.createElement('a-sphere');
  self.sphere.setAttribute('position', self.data.position);
  self.sphere.setAttribute('color', self.data.color);
  self.sphere.setAttribute('radius', self.data.size);
  this.el.appendChild(self.sphere);
  self.sphere.addEventListener('mouseenter', function () {
    self.sphere.setAttribute('scale', {x: 1.3, y: 1.3, z: 1.3});
  });
  ...
}
```

You can see how the data defined in the schema can be accessed
under `this.data`, and the element corresponding to the component
is `this.el`. Thus, in this case we're including an sphere element in the
`datapoint` element.

Finally, we instantiate all the components. In this case,
we instantiate the axis in the HTML file:

```html
<a-entity id="axis" axis="color: red"></a-entity>
```

And the data points at the end of the JavaScript file,
in a listener that is fired when the DOM is ready.
The loop gets the data for each data point,
produces a `datapoint` component for each of them,
and inserts it in the scene:

```javascript
for (let item of items) {
  console.log(item);
  var entity = document.createElement('a-entity');
  entity.setAttribute('datapoint', {
    'color': item['color'],
    'size': item['size'],
    'position': {x: item['x'], y: item['y'], z: item['z']}
  });
  scene.appendChild(entity);
};
```


### Generating dist files and running everything

As we saw in the previous section, the complete process to build the project is:

```
$ cd data-02
$ npm install
$ npm run start
```

This will build everything,
you will only need a browser to see the resulting scene.

### Results

Check the resulting [virtual reality scene](web/index.html).
