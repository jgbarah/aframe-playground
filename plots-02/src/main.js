// Simple JS file for figures.html

// We need the A-frame library.
// We asign the d3 object to a window property because
// aframe-scatterplot expects it as a global object.
import 'aframe';

// Require font files to have them included in dist
// const roboto_json = require ("./Roboto-msdf.json")
// const roboto_png = require ("./Roboto-msdf.png")

// Actual code for the application

// Produce a box, insert it in parent element, return it
function box(parent, x, y, z, lenght_x, lenght_y, lenght_z, color){
  var entity = document.createElement('a-box');
  entity.setAttribute('position', {x: x, y: y, z: z});
  entity.setAttribute('geometry', {
    'width': lenght_x,
    'height': lenght_y,
    'depth': lenght_z
  });
  entity.setAttribute('material', {
    'color': color,
    'transparent': true,
    'opacity': 0.1
  });
  parent.appendChild(entity);
  return(entity);
};

// Produce a sphere, insert it in parent element, return it
function sphere(parent, x, y, z, radius, color){
  var entity = document.createElement('a-sphere');
  entity.setAttribute('position', {x: x, y: y, z: z});
  entity.setAttribute('geometry', {'radius': radius});
  entity.setAttribute('material', {'color': color});
  parent.appendChild(entity);
  return(entity);
};

function main() {
  var sceneEl = document.querySelector('a-scene');
  var boxEl = box(sceneEl, -2, 0, -5, 4, 3, 2, 'blue')
  sphere(boxEl, -1, 0, 0, 1, 'yellow');
  sphere(boxEl, 1, 0, 0, 1, 'green');
};

document.addEventListener('DOMContentLoaded', main);
