/**
 * Camera Render component for A-Frame.
 *
 * Based on code from:
 * https://wirewhiz.com/how-to-use-a-cameras-output-as-a-texture-in-aframe/
 */

AFRAME.registerComponent('camrender', {
  schema: {
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
    // Height of the renderer canvas
    height: {
      type: 'number',
      default: 300
    },
    // Width of the renderer canvas
    width: {
      type: 'number',
      default: 400
    }},

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () { },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
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

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  tick: function (time, timeDelta) {
    this.renderer.render( this.el.sceneEl.object3D , this.el.object3DMap.camera );
  },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { }
});

