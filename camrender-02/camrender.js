// Code for a component implementing texture coming from a camera
//
// Original code:
//   https://wirewhiz.com/how-to-use-a-cameras-output-as-a-texture-in-aframe/
//
AFRAME.registerComponent('camrender',{
    'schema': {
       // desired FPS
       fps: {
            type: 'number',
            default: 90.0
       },
       // Id of the canvas element used for rendering the camera
       cid: {
            type: 'string',
            default: 'camRenderer'
       },
       // Height of the renderer element
       height: {
            type: 'number',
            default: 300
       },
       // Width of the renderer element
       width: {
            type: 'number',
            default: 400
       }
    },
    'update': function(oldData) {
        var data = this.data
        if (oldData.cid !== data.cid) {
            // Find canvas element to be used for rendering
            var canvasEl = document.getElementById(this.data.cid);
            // Create renderer
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                canvas: canvasEl
            });
            // Set properties for renderer DOM element
            this.renderer.setPixelRatio( window.devicePixelRatio );
            this.renderer.domElement.crossorigin = "anonymous";
        };
        if (oldData.width !== data.width || oldData.height !== data.height) {
            // Set size of canvas renderer
            this.renderer.setSize(data.width, data.height);
            this.renderer.domElement.height = data.height;
            this.renderer.domElement.width = data.width;
        };
        if (oldData.fps !== data.fps) {
            // Set how often to call tick
            this.tick = AFRAME.utils.throttleTick(this.tick, 1000 / data.fps , this);
        };
    },
    'tick': function(time, timeDelta) {
        this.renderer.render( this.el.sceneEl.object3D , this.el.object3DMap.camera );
    }
});

AFRAME.registerComponent('canvas-updater', {
    dependencies: ['geometry', 'material'],

    tick: function () {
	    var el = this.el;
	    var material;

	    material = el.getObject3D('mesh').material;
	    if (!material.map) { return; }
        material.map.needsUpdate = true;
    }
});