
*[Back to the main page](../README.md)*

## Very simple maze

Let's build a simple maze game. Walls in the maze are built as boxes,
using the `aframe-physics-system` module to make them "impenetrable".
Then, we will use a `kinema-body` component (just a copy with very minor edits
from the Aframe Extras `kinematic-body` component) to add similar properties
to the camera. Let's look at the main elements of the code...

First of all, we're going to have a lot of boxes, so let's build a 
[mixin](https://aframe.io/docs/1.4.0/core/mixins.html)
to make all of them equial, except for their localtion.
The mixin should be declared within the `a-assets` element of the scene:

```html
<a-assets>
  <a-mixin id="wall" static-body
           geometry="primitive: box; width: 1; height: 4; depth: 1"
           material="color: green"></a-mixin>
</a-assets>
```

Notice the `static-body` component, which we already visited
when [adding physics](../physics-01/README.md) to our toolset.
Remember that for it to work, the scene should include the `physics` component:

```html
<a-scene physics="debug: true">
```

We can now use wall components to build the walls of the maze.
For example:

```html
<a-entity mixin="wall" position="0 2 0"></a-entity>
<a-entity mixin="wall" position="0 2 1"></a-entity>
<a-entity mixin="wall" position="0 2 2"></a-entity>
```

The rest is just adding a plane for the floor, and a camera
which doesn't move through the walls. This is a bit tricky,
because on the one hand, we want the camera to respect physics
by not going through walls (`static-body`).
But we also want to control it at will, with the keyboard,
the Oculus Go controls, etc.
I decided to use a version of the `kinematic-body` provided by
[Aframe Extras](https://github.com/donmccurdy/aframe-extras/)
(in fact, I copied it just because it is labeled as "deprecated").
I included it in the [kinema.js](kinema.js) file
(renaming the component to `kinema-body` to avoid interferencs
with `kinematic-body` still provided by AFrame Extras):

```html
<a-entity kinema-body="radius: 0.8" movement-controls="fly: false" position="0 0 10" look-controls>
  <a-entity camera position="0 1.6 0" ></a-entity>
  <a-cylinder height="2" radius="0.8" color="red"></a-box>
</a-entity>
```

The `radius` property is used to detect collisions. I use `fly: false`
to ensure the player doe snot trick the maze by flying over it to go out.
The `kinema-body` entity should be placed where you want the game to start
(in our case, X: 0, Y: 0, Z: 10).

In this element, we include two: the camera (at a relative position
of 1.6 high, similar to the height of eyes in a real person, in meters),
and a cylinder, with the same radius of the `kinema-body`, which will be used
to visualize the "rig"" in which the camera moves.

Enter [this scene in your browser](maze.html),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/maze-01/)

