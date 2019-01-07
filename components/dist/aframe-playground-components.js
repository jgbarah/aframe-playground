/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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



/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Canvas updater component for A-Frame.
 *
 * Copy of this component, found in A-Frame tests:
 * https://github.com/aframevr/aframe/blob/master/examples/test/canvas-texture/components/canvas-updater.js
 */

AFRAME.registerComponent('canvas-updater', {

  dependencies: ['geometry', 'material'],

  schema: { },

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
  update: function (oldData) { },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  tick: function (time, timeDelta) {
	var el = this.el;
	var material;

	material = el.getObject3D('mesh').material;
	if (!material.map) { return; }
    material.map.needsUpdate = true;
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



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

__webpack_require__(0);
__webpack_require__(1);


/***/ })
/******/ ]);