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

