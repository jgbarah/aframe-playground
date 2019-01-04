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
    'init': function() {
        // Counter for ticks since last render
        this.counter = 0;
        // Find canvas element to be used for rendering
        var canvasEl = document.getElementById(this.data.cid);
        // Create renderer
        this.renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvasEl } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.data.width, this.data.height );
        // Set properties for renderer DOM element
        this.renderer.domElement.crossorigin = "anonymous"
        this.renderer.domElement.height = this.data.height;
        this.renderer.domElement.width = this.data.width;
    },
    'tick': function(time, timeDelta) {
        var loopFPS = 1000.0 / timeDelta;
        var hmdIsXFasterThanDesiredFPS = loopFPS / this.data.fps;
        var renderEveryNthFrame = Math.round(hmdIsXFasterThanDesiredFPS);
        if(this.counter % renderEveryNthFrame === 0){
            this.renderer.render( this.el.sceneEl.object3D , this.el.object3DMap.camera );
            }
        this.counter += 1;
    }
});