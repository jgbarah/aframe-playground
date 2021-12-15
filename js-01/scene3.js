// Component for injecting some A-Frame entities in a scene

/* global AFRAME */
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('basic-scene', {

    init: function() {
        // Box
        // <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
        let box = document.createElement('a-box');
        box.setAttribute('color', 'red');
        box.setAttribute('position', {x: -1, y: 0.5, z: -3});
        box.setAttribute('rotation', {x: 0, y: 45, z: 0});
        box.setAttribute('color', "#4CC3D9");
        box.setAttribute('animation', {'startEvents': 'click',
                                       'property': 'position',
                                       'from': {x: -1, y: 1.5, z: -3},
                                       'to': {x: -1, y: 0.5, z: -3},
                                       'dur': 1000});
        this.el.appendChild(box); 

        // Sphere
        // <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        let sphere = document.createElement('a-sphere');
        sphere.setAttribute('position', {x:0, y: 1.25, z: -5});
        sphere.setAttribute('radius', 1.25);
        sphere.setAttribute('color', "#EF2D5E");
        this.el.appendChild(sphere);
        sphere.addEventListener('click', function() {
            color = sphere.getAttribute('color');
            if (color == '#EF2D5E') {
                sphere.setAttribute('color', 'red');
            } else {
                sphere.setAttribute('color', '#EF2D5E');
            };
    });
        // Cylinder
        // <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>

        // Plane
        // <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>

    }
});
