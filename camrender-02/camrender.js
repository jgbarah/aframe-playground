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
       // Id of the renderer element
       rid: {
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
        // Create a-assets to add renderer to it
        var assetsEl = document.createElement('a-assets');
        this.el.sceneEl.appendChild(assetsEl);
        // Counter for ticks since last render
        this.counter = 0;
        // Create renderer
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.data.width, this.data.height );
        // Set properties for renderer DOM element, and add it to a-assets
        this.renderer.domElement.id = this.data.rid;
        this.renderer.domElement.crossorigin = "anonymous"
        this.renderer.domElement.height = this.data.height;
        this.renderer.domElement.width = this.data.width;
        assetsEl.appendChild(this.renderer.domElement);
        // Remove some attributes from camera, if they are present
        this.el.removeAttribute('look-controls');
        this.el.removeAttribute('wasd-controls');
    },
    'tick': function(time, timeDelta) {
        var loopFPS = 1000.0 / timeDelta;
        var hmdIsXFasterThanDesiredFPS = loopFPS / this.data.fps;
        var renderEveryNthFrame = Math.round(hmdIsXFasterThanDesiredFPS);
        if(this.counter % renderEveryNthFrame === 0){
            this.render(timeDelta);
            }
        this.counter += 1;
    },
    'render': function(){
        this.renderer.render( this.el.sceneEl.object3D , this.el.object3DMap.camera );
    }
});