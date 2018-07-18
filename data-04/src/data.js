// Simple JS file for figures.html

// We need the A-frame library
import aframe from 'aframe';

import data from './data.json';

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
      position: {type: 'vec3', default: {x:0, y:0, z:0}},
      color: {type: 'string', default: 'red'}
    },

    multiple: true,

    update: function () {
      var el = this.el
      const data = this.data;
      const pos = data.position

      var axis = data.axis;
      if (axis == 'x') {
        var ticks_axis = 'y';
      } else if (axis == 'y') {
        var ticks_axis = 'z';
      } else {
        var ticks_axis = 'x';
      };
      var line_end = {x: pos.x, y: pos.y, z: pos.z}
      line_end[axis] = pos[axis] + 10;
      var tick_start = {x: pos.x, y: pos.y, z: pos.z}
      tick_start[ticks_axis] = pos[ticks_axis]-0.2;
      var tick_end = {x: pos.x, y: pos.y, z: pos.z}
      tick_end[ticks_axis] = pos[ticks_axis]+0.2;

      el.setAttribute('line', {'start': {x: pos.x, y: pos.y, z: pos.z},
                                      'end': line_end,
                                      'color': data.color});

      for (var tick = 1; tick < 10; tick++) {
        tick_start[axis] = pos[axis]+tick;
        tick_end[axis] = pos[axis]+tick;
        el.setAttribute('line__' + tick, {'start': tick_start,
                                              'end': tick_end,
                                              'color': this.data.color});
      };
//      this.el.appendChild(entity);
    }
});

AFRAME.registerComponent('axis', {
    schema: {
      position: {type: 'vec3', default: {x:0, y:0, z:0}},
      color: {type: 'string', default: 'red'}
    },

    update: function () {
      const data = this.data;
      for (let axis of ['x', `y`, `z`]) {
        var axis_line = document.createElement('a-entity');
        axis_line.setAttribute('axis-line',
                               {'axis': axis,
                               'color': data.color,
                               'position': data.position
                                });
        this.el.appendChild(axis_line);
      };
    }
});

AFRAME.registerComponent('plot', {
    schema: {
      position: {type: 'vec3', default: {x:0, y:0, z:0}},
      color: {type: 'string', default: 'red'},
      size: {type: 'number', default: 1},
      datapoints: {type: 'asset'}
    },

    init: function () {
      var self = this;

      this.loader = new THREE.FileLoader();
    },

    update: function (oldData) {
      var self = this;

      const data = this.data;
      // Nothing changed
      if (AFRAME.utils.deepEqual(oldData, data)) {
        return;
      }
      if (data.datapoints && data.datapoints !== oldData.datapoints) {
        this.loader.load(data.datapoints, this.onDataLoaded.bind(this));
      }
    },

    onDataLoaded: function (file) {
      var self = this;
      const data = this.data;
      const pos = data.position;

      var entity = document.createElement('a-entity');
      entity.setAttribute('axis', {'color': data.color,
                                   'position': data.position});
      this.el.appendChild(entity);

      var datapoints = JSON.parse(file);
      for (let point of datapoints) {
        entity = document.createElement('a-entity');
        entity.setAttribute('datapoint', {
          'color': point['color'],
          'size': point['size'],
          'position': {x: pos.x + point['x'],
                       y: pos.y + point['y'],
                       z: pos.z + point['z']}
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
      'datapoints': 'data.json'
    });
    scene.appendChild(entity);
});
