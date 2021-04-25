
*[Back to the main page](../README.md)*

## A camara respecting (some) physics

When living in a world with physics, we may want the camera to
respect it, but only in part. I still want the camera reacting to
arrow keys (in desktop) or to the virtual device control for moving around.
But I want it to collide with objects, so that it doesn't move through them.
However, in the case of static bodies, instead of "not moving through them",
I will make them to show a wireframe. The idea is that when you're moving
around in VR, the devide cannot stop you from "entering" a static body
in the scene. Therefore, the way of showing you are doing something
that doesn't match the physics of VR, is to show the wireframe.

*Note: * In many cases, moving the camera with the keys or touchpad is not a good idea,
and it is better to use teleports or meshes for moving around.
But still I find it very convenient for some cases, such as
first person games. Consider moving around in a maze, for example.

### Using kinematic bodies

We can use a kinematic body, from `aframe-physics-system` (Ammo backend),
connected to a rig with the camera. We will also use `movement-controls`
from `aframe-extras` to move the camera around, as we already did in
some previos demos.

```html
<a-entity movement-controls="fly: false" position="0 0 5"
    geometry="primitive: cylinder; height: 2; radius: 0.8"
    material="color: green; wireframe: true"
    id="cam" ammo-body="type: kinematic;" ammo-shape="type: cylinder">
  <a-entity camera position="0 1.6 0" look-controls></a-entity>    
</a-entity>
```

I've set `fly:false` for `movement-controls` to simulate
a land vehicule (or a person walking), but that's not really needed.
There is also a cylinder component, and a kinematic body component,
which act as a collider to push or interact with other bodies in the scene.

Since `camera` is now in a child entity of the rig, its position is relative to it.
Therefore, seting it to "X=0, Y=1.6, Z=0" will really position it,
when the scene loads, at  "X=0, Y=1.6, Z=5". When the rig moves,
the camera will move with it.

I've also added a new component, in a script element in the header.
This component, `collision-wire` is used to show a wireframe on it
when the camera collides with it (see previous discussion on what do
with static bodies). This component is set on the static cylinder in
the scene. The code for the component is as follows:

```js
AFRAME.registerComponent('collision-wire', {
  schema: {
    element: {type: 'string'}
  },
  init: function() {
    let el = this.el;
    let element = this.data.element;

    el.addEventListener("collidestart", function (event) {
      if ( event.detail.targetEl.id === element) {
        el.setAttribute('material', {'wireframe': true});
      };
    });
    el.addEventListener("collideend", function (event) {
      if ( event.detail.targetEl.id === element) {
        el.setAttribute('material', {'wireframe': false});
      };
    });
  }
});
```

The element installs event listeners for `collidestart` and `collideend`,
and thus we also need to enable events for the element:

```html
<a-cylinder ammo-body="type: static; emitCollisionEvents: true;"
    ammo-shape="type: cylinder"
    collision-wire="element: cam"
    position="0 1 -1" radius="1" height="3"
    color="orange"></a-cylinder>
```

Watch [this scene in your browser](camera.html),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/physics-02/camera.html)

The final result is like this:

![Physics camera](aframe-camera.gif)
