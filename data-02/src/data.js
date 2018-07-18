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


AFRAME.registerComponent('axis', {
    schema: {
      color: {type: 'string', default: 'red'}
    },

    update: function () {
      var el = this.el
      el.setAttribute('line__x', {'start': {x: 0, y: 0, z: 0},
                                 'end': {x: 10, y: 0, z: 0},
                                 'color': this.data.color});
      for (var tick = 1; tick < 10; tick++) {
        el.setAttribute('line__x' + tick, {'start': {x: tick, y: -0.2, z: 0},
                                   'end': {x: tick, y: 0.2, z: 0},
                                   'color': this.data.color});
      };
      el.setAttribute('line__y', {'start': {x: 0, y: 0, z: 0},
                                'end': {x: 0, y: 10, z: 0},
                                'color': this.data.color});
      for (var tick = 1; tick < 10; tick++) {
        el.setAttribute('line__y' + tick, {'start': {y: tick, z: -0.2, x: 0},
                                   'end': {y: tick, z: 0.2, x: 0},
                                   'color': this.data.color});
      };
      el.setAttribute('line__z', {'start': {x: 0, y: 0, z: 0},
                                'end': {x: 0, y: 0, z: 10},
                                'color': this.data.color});
      for (var tick = 1; tick < 10; tick++) {
        el.setAttribute('line__z' + tick, {'start': {z: tick, x: -0.2, y: 0},
                                   'end': {z: tick, x: 0.2, y: 0},
                                   'color': this.data.color});
      };
  }
});


document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    var scene = document.querySelector('a-scene');

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
});
