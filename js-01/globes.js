// Component for injecting some A-Frame entities in a scene

/* global AFRAME */
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('globe', {

    init: function() {
        // Box
        // <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
        this.el.setAttribute('animation', {'property': 'position',
                                       'to': {x: 0, y: 200, z: 0},
                                       'dur': 100000});
    }
});
