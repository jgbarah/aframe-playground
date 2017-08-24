// Simple JS file for figures.html

// We need the A-frame library.
// We asign the d3 object to a window property because
// aframe-scatterplot expects it as a global object.
import 'aframe';

// Actual code for the application

// Create components (in this case, scatterplot)
//
function create_components() {
  AFRAME.registerComponent('scatterplot', {

    // Only attribute is points, a JSON string corresponding to
    // a list of points, each of them an object with the propierties:
    // {x, y, z, radius, color}
    //
    schema: {
      points: {
        parse: JSON.parse,
        stringify: JSON.stringify
      }
    },

    // Initialize the component
    //
    init: function () {
      // All coordinates as x,y,z, so that we can later loop consistently
      var geometry = this.el.components.geometry.data;
      this.data.frame_size = {x: geometry.width,
        y: geometry.height,
        z: geometry.depth};
      // Compute chart bounds and size
      var bounds = this.chart_bounds();
      this.data.chart_bounds = {max: bounds.max, min: bounds.min};
      this.data.chart_size = bounds.size
      // Draw points
      for (const point of this.data.points) {
        var position = this.to_frame_coords({x: point.x, y: point.y, z: point.z});
        this.point(position, point.radius, point.color);
      };
    },

    // Compute bounds for the chart, by looking at all points
    // Returns maximun and minimum coordinates, and size
    //
    chart_bounds: function() {
      var max = {x: 0, y: 0, z: 0};
      var min = {x: 0, y: 0, z: 0};
      for (const point of this.data.points) {
        for (const coord in point) {
          if (point[coord] > max[coord]) {
            max[coord] = point[coord];
          } else if (point[coord] < min[coord]) {
            min[coord] = point[coord];
          };
        };
      };
      var size = {};
      for (const coord in max) {
        size[coord] = max[coord] - min[coord];
      };
      return {max: max, min: min, size: size};
    },

    // Convert chart coordinates to frame coordinates
    // Frame coordinates are centered in the center of the framing box
    // frame_x = (((chart_x-chart_min)*frame_size)/chart_size)-frame_size/2
    //
    to_frame_coords: function(chart_coords) {
      var frame_coords = {};
      var chart_min = this.data.chart_bounds.min;
      var chart_size = this.data.chart_size;
      var frame_size = this.data.frame_size;
      for (const coord in chart_coords) {
        frame_coords[coord] =
          (((chart_coords[coord] - chart_min[coord]) *
            frame_size[coord]) /
          chart_size[coord]) - frame_size[coord] / 2;
      }
      return frame_coords;
    },

    // Produce the sphere for a point, insert it in the frame_coords
    //
    point: function (position, radius, color){
      var sphere = document.createElement('a-sphere');
      sphere.setAttribute('position', position);
      sphere.setAttribute('geometry', {'radius': radius});
      sphere.setAttribute('material', {'color': color});
      this.el.appendChild(sphere);
      return(sphere);
    },
  });
};

// Create the scatterplot, by creating a box in the scene,
// which will be used as the frame for the plot,
// by adding the scatterplot component to it
//
function main() {
  create_components();
  var scene = document.querySelector('a-scene');
  var frame = document.createElement('a-box');
  frame.setAttribute('position', {x: -3, y: 0, z: -8});
  frame.setAttribute('geometry', {width: 10, height: 5, depth: 4});
  frame.setAttribute('rotation', {x: 0, y: -30, z: 0},);
  frame.setAttribute('material', {
    'color': 'blue',
    'transparent': true,
    'opacity': 0.1
  });
  scene.appendChild(frame);
  frame.setAttribute('scatterplot', 'points',
    '[{"x": -3, "y": 0, "z": -4, "radius": 0.2, "color": "red"},' +
     '{"x": -4, "y": 1, "z": -2, "radius": 0.1, "color": "yellow"},' +
     '{"x": -6.7, "y": 2, "z": 0, "radius": 0.3, "color": "yellow"},' +
     '{"x": -2.4, "y": 3, "z": 2, "radius": 0.5, "color": "yellow"},' +
     '{"x": -1, "y": 4, "z": 4, "radius": 0.2, "color": "yellow"},' +
     '{"x": 1, "y": 5, "z": 6, "radius": 0.3, "color": "green"}]');
};

document.addEventListener('DOMContentLoaded', main);
