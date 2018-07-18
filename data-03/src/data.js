// Simple JS file for figures.html

// We need the A-frame library
import aframe from 'aframe';

var items = [
    {x: 2, y: 8, z: 0, size: 1, color: "#ff0000"},
    {x: -2, y: 3, z: 1, size: 1.5, color: "#00ff00"},
    {x: 3, y: 3, z: 2, size: 1, color: "#0000ff"},
    {x: 5, y: 7, z: 7, size: 1.5, color: "#0000ff"},
    {x: 1, y: 6, z: 3, size: 1, color: "#4CC3D9"},
    {x: 5, y: 4, z: 1, size: 1.5, color: "#EF2D5E"},
    {x: 4, y: 1, z: 5, size: 1, color: "#ff0000"},
    {x: 2, y: 10, z: 6, size: 1.5, color: "#00ff00"}
];


AFRAME.registerComponent('datapoint', {
    schema: {
      position: {type: 'vec3', default: {x:0, y:0, z:0}},
      color: {type: 'string', default: 'red'},
      size: {type: 'number', default: 1},
    },

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
      self.sphere.addEventListener('mouseleave', function () {
        self.sphere.setAttribute('scale', {x: 1, y: 1, z: 1});
      });
    }
});

AFRAME.registerComponent('axis-line', {
    schema: {
      axis: {type: 'string', default: 'x'},
      color: {type: 'string', default: 'red'}
    },

    multiple: true,

    update: function () {
      var el = this.el

      var axis = this.data.axis;
      if (axis == 'x') {
        var ticks_axis = 'y';
      } else if (axis == 'y') {
        var ticks_axis = 'z';
      } else {
        var ticks_axis = 'x';
      };
      var line_end = {x: 0, y: 0, z: 0}
      line_end[axis] = 10;
      var tick_start = {x: 0, y: 0, z: 0}
      tick_start[ticks_axis] = -0.2;
      var tick_end = {x: 0, y: 0, z: 0}
      tick_end[ticks_axis] = 0.2;

      el.setAttribute('line', {'start': {x: 0, y: 0, z: 0},
                                      'end': line_end,
                                      'color': this.data.color});

      for (var tick = 1; tick < 10; tick++) {
        tick_start[axis] = tick;
        tick_end[axis] = tick;
        el.setAttribute('line__' + tick, {'start': tick_start,
                                              'end': tick_end,
                                              'color': this.data.color});
      };
//      this.el.appendChild(entity);
    }
});

AFRAME.registerComponent('axis', {
    schema: {
      color: {type: 'string', default: 'red'}
    },

    update: function () {
      for (let axis of ['x', `y`, `z`]) {
        var axis_line = document.createElement('a-entity');
        axis_line.setAttribute('axis-line',
                               {'axis': axis, 'color': this.data.color});
        this.el.appendChild(axis_line);
      };
    }
});

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

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    var scene = document.querySelector('a-scene');

    var entity = document.createElement('a-entity');
    entity.setAttribute('plot', {
      'color': 'blue',
      'size': 1,
      'position': {x: 0, y: 0, z: 0},
      'datapoints': items
    });
    scene.appendChild(entity);
});
