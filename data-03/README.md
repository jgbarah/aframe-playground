
*[Back to the main page](../README.md)*

## Visualizing data (fully componentized)

Now, I'm going to work in `data-03`,
still visualizing some data points with a scatterplot
(each dot will be an sphere), with an axis.
Exactly the same visualization we had in
[data-01](../data-01) and [data-02](../data-02).
But now, I will go further the way of having components.

### One component for holding everything

In this case, we're building a `plot` component, that will build everything.
This plot will have "in it" an `axis` component, and a `datapoint` component
for each of the data points (spheres) to plot.

All the data to plot will be passed to this component as an array of
data points, each data point having five features: x, y, z coordinates,
size, and color. This is the same we had in previous cases,
but then the code was using a global variable.
Now, it still uses that global variable (`items`), but passes it
as argument to the component. The relevant code for producing the plot is:

```javascript
var entity = document.createElement('a-entity');
entity.setAttribute('plot', {
  'color': 'blue',
  'size': 1,
  'position': {x: 0, y: 0, z: 0},
  'datapoints': items
});
scene.appendChild(entity);
```

And the definition of the component, which uses the
`datapoint` and `axis` components that we had built in
[data-02](../data-02):

```javascript
AFRAME.registerComponent('plot', {
    schema: {
      position: {type: 'vec3', default: {x:0, y:0, z:0}},
      color: {type: 'string', default: 'red'},
      size: {type: 'number', default: 1},
      datapoints: {type: 'array'}
    },

    update: function () {
      var self = this;

      var entity = document.createElement('a-entity');
      entity.setAttribute('axis', {'color': 'green'});
      this.el.appendChild(entity);

      for (let point of this.data.datapoints) {
        entity = document.createElement('a-entity');
        entity.setAttribute('datapoint', {
          'color': point['color'],
          'size': point['size'],
          'position': {x: point['x'], y: point['y'], z: point['z']}
        });
        this.el.appendChild(entity);
      };
    }
});
```

### Generating dist files and running everything

As we saw in the previous section, the complete process to build the project is:

```
$ cd data-03
$ npm install
$ npm run start
```

This will build everything,
you will only need a browser to see the resulting scene.

### Results

Check the resulting [virtual reality scene](web/index.html).
