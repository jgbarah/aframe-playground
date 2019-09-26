// Simple JS file for figures.html

function activate () {
  var sphere = document.querySelector('a-sphere');
  sphere.addEventListener('mouseenter', function () {
    sphere.setAttribute('scale', {x: 1.2, y: 1.2, z: 1.2});
  });
  sphere.addEventListener('mouseleave', function () {
    sphere.setAttribute('scale', {x: 1, y: 1, z: 1});
  });
};

document.addEventListener('DOMContentLoaded', activate);
