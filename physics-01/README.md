
*[Back to the main page](../README.md)*

## Adding some physics

Up to now, we have completely defined the behavior of components,
usually as static bodies, or with simple movements.
But we can add some physics to the scene, so that components behave as
physical bodies: falling with gravity, bouncing when interacting with elastic bodies,
behaving to push as if bodies had mass, etc.

For all of this, we can use the [aframe-physics-system](https://github.com/donmccurdy/aframe-physics-system/)
module, using [Ammo.js](https://github.com/kripken/ammo.js/) behind the scenes.

**Note:** As of A-Frame 1.4.0, the Cannon.js backend is not working with aframe-physics-system.
Thus, all the demos in this playground are working with the Ammo.js backend.
Check detailed instructions
about how to configure aframe-physics-system for working with Ammo.js in the
[Ammo driver documentation](https://github.com/n5ro/aframe-physics-system/blob/master/AmmoDriver.md#basics). Have in mind also that the Cannon.js backend may be deprecated in
the future, according to aframe-physics-system documentation.

### Falling boxes

When using `aframe-physics-system`, you place bodies in the scene,
and let physics control their behaviour.
For example, if you place a box in the scene, and there is gravity,
it will just fall down until something stops it (it that ever happens).

The basic components introduced by this physics module (using the Ammo.js backend) are:

* `ammo-body`: adds "body physics" to an entity. The entity will have its
  own geometry, and this component will add a physics behaviour, depending
  on its type (a property of `ammo-body`). Main types are `static`
  (a body which will remain static whatever happen to it:
  it is not affected by gravity, nor by other bodies colliding with it),
  and `dynamic` (a body subject to gravity, or to other bodies
  colliding with it).

* `ammo-shape`: the shape of the collision shape that will "surround"
  the body. Usual shapes (specified as properties of the component) are
  `box` or `sphere`, although more complex collision shapes are possible.

Let's try them, by defining a simple scena with a static plane,
and two dynamic boxes over it.

First, in the `head` element of the HTML page, we include the physics module,
and the ammo.js module, needed for it to work:

```html
<head>
  ...
  <script src="https://mixedreality.mozilla.org/ammo.js/builds/ammo.wasm.js"></script>
  <script src="http://cdn.jsdelivr.net/gh/n5ro/aframe-physics-system@v4.0.1/dist/aframe-physics-system.min.js"></script>
</head>
```

Then, let's define the scene (not the `physics` property in the `scene` element,
so that the scene is subject to physics):

```html
<a-scene physics="driver: ammo; debug: true; debugDrawMode: 1;">
  <a-entity camera position="0 1.6 5" look-controls wasd-controls></a-entity>
  <a-plane ammo-body="type: static" ammo-shape="type: box"
      position="0 0 -4" rotation="-90 0 0" width="8" height="8"
      color="yellow"></a-plane>
  <a-box ammo-body="type: dynamic" ammo-shape="type: box"
      position="0 4 -2" width="3" height="2" depth="1"
      color="red"></a-box>
  <a-box ammo-body="type: dynamic" ammo-shape="type: box"
      position="2 10 0" width="1" height="1" depth="1"
      color="blue"></a-box>
</a-scene>
```

The `debug: true` parameter to `physics` will produce wires around the bodies
subject to physics, which makes it easier to understand the behavior of the scene.
The rest is just placing the bodies and defining them as static or dynamic.

Watch [this scene in your browser](fall.html),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/physics-01/fall.html)

The final result is like this:

![Boxes falling](aframe-falling.gif)

### Bodies may have impulse

There are several ways of controlling movement in a world with physics.
For example, bodies may receive impulse, and depending on the impulse vector,
it will behave by gaining velocity, and maybe impacting other bodies.

To illustrate this, we will use some JavaScript to define a new AFrame component,
`pùsh`, which will emulate "pushing" (giving some impulse) to the body.
This will happen whenever the body collides with some other in the scene,
and when that happens, it will get a "push", always in the same direction and
with the same intensity (that is, with the same impulse vector).

The new component is defined below:

```html
<script>
  AFRAME.registerComponent('push', {
    init: function() {
          var el = this.el;
          el.addEventListener("collidestart", function () {
            const impulse = new Ammo.btVector3(1.4, 1, 0);
            const pos = new Ammo.btVector3(0, 0, 0);
            el.body.applyImpulse(impulse, pos);
            Ammo.destroy(impulse);
            Ammo.destroy(pos);
      });
    }
  });
</script>
```

We only needed to define a `init` function for the component,
which sets a handler for the `collidestart` event, which is fired by the 
physics system when bodies collide.
When this happens, the handler (second argument to `addEventListener`)
will use `Ammo` primitives to set the impulse.

Note that for the `collidestart` event to be fired,
the property `emitCollisionEvents` of the body has to be set to true:

```html
  ammo-body="type: dynamic; emitCollisionEvents: true;"
```

To show this new component, we define a scene with a static plane,
to "regular" dynamic boxes falling on it, and one dynamic box
(the green one), with the `push` component, which is pushed
every time it collides with the plane:

```html
<a-scene physics="driver: ammo; debug: true; debugDrawMode: 1;">
  <a-entity camera position="0 1.6 5" look-controls wasd-controls></a-entity>
  <a-plane ammo-body="type: static" ammo-shape="type: box"
      position="0 0 -4" rotation="-90 0 0" width="16" height="12"
      color="yellow"></a-plane>
  <a-box ammo-body="type: dynamic" ammo-shape="type: box"
      position="0 4 -2" width="3" height="2" depth="1"
      color="red"></a-box>
  <a-box ammo-body="type: dynamic" ammo-shape="type: box"
      position="2 10 0" width="1" height="1" depth="1"
      color="blue"></a-box>
  <a-entity geometry="primitive: box" push
      ammo-body="type: dynamic; emitCollisionEvents: true;" ammo-shape="type: box"
      position="-3 4 -2" width="1" height="1" depth="1"
      material="color: green"></a-entity>
</a-scene>
```

The movement is complex, and everytime you launch the scene, it
will be different (meaning that small changes to how the blue box falls
can cause it to bounce more or less times, thus pushing the red box
more or less, in some cases even pushing it out of the plane).

Watch [this scene in your browser](impulse.html),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/physics-01/impulse.html)

The final result is like this:

![Boxes falling](aframe-impulse.gif)

### Bodies with uniform velocity

Now, I will add a sphere with a uniform velocity.
I want it to run horizontally, not being affected by gravity.
For that, it is enough to make its mass equal to 0.
The element will be like this:

```html
<a-sphere explode ammo-body="type: kinematic; emitCollisionEvents: true;"
          ammo-shape="type: sphere"
          position="-6 2 -2" velocity="1 0 0" radius="1"
          color="blue"></a-sphere>
```

As seen, velocity is expressed using the `velocity` component.
For this component to work, we use `kinematic` as the type of
body. Kinematic bodies are not subject to the physical rules
of movement, but to the movement we specify (in this case, via
the `velocity` component). Thus, it will not be affected by
gravity (but it will still collide with other bodies).

We also use the `explode` component, which we defined earlier,
in the `head` element of the HTML page:

```js
AFRAME.registerComponent('explode', {
  init: function() {
    var el = this.el;
    el.addEventListener("collidestart", function () {
      el.parentElement.removeChild(el)
    });
  }
});
```

This component will add a listener for the `collidestart` event,
which will remove the element from the page.

Finally, we add a new box to the right, so it is more likely that the
sphere has something to collide with.

Watch [this scene in your browser](velocity.html),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/physics-01/velocity.html)

The final result is like this:

![Boxes falling](aframe-velocity.gif)