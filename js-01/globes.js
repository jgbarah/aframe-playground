// Component for injecting some A-Frame entities in a scene

/* global AFRAME */
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('globe', {

    init: function() {
        this.el.setAttribute('animation', {'property': 'position',
                                       'to': {x: 0, y: 200, z: 0},
                                       'dur': 100000});
    }
});

AFRAME.registerComponent('breakable', {

    init: function() {
        scene = document.querySelector('a-scene');
        el = this.el;
        el.addEventListener('click', function() {
            scene.removeChild(el)
        });
    }
});
