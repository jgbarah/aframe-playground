// Code for a component implementing texture coming from a camera
//
// Original code:
//   https://wirewhiz.com/how-to-use-a-cameras-output-as-a-texture-in-aframe/
//
AFRAME.registerComponent('view',{
    'schema': {
       canvas: {
            type: 'string',
            default: ''
       },
       // desired FPS
       fps: {
            type: 'number',
            default: 90.0
       }
    },
    'init': function() {
        var targetEl = document.querySelector(this.data.canvas);
        this.counter = 0;
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( targetEl.offsetWidth, targetEl.offsetHeight );
        // creates spectator canvas
        targetEl.appendChild(this.renderer.domElement);
        this.renderer.domElement.id = "canvas";
        this.renderer.domElement.crossorigin="anonymous"
        this.renderer.domElement.height=300;
        this.renderer.domElement.width=400;
        this.el.removeAttribute('look-controls');
        this.el.removeAttribute('wasd-controls');
        console.log(this.renderer.domElement);
        console.log(document.querySelector('a-scene'))
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