
*[Back to the main page](../README.md)*

## Learning to add interaction

I want to move in the scene, and want to select objects, triggering some event when selecting,
that I can use to do something (such as changing some propierty of the object,
or popping up a banner with data about the object, for example).
I want all of this to work in desktop and in Oculus Go,
and to the extent possible, in mobile too.

Since this is not that difficult, but a bit different from other stuff
we have done up to now, I'm going to first show how this is done with a simple example.

### Movement in the scene

Let's start with the basic movement, provided by  A-Frame by default.
For this, it is enough to just define which objects we want in the scene,
with no further element:

```html
<a-scene>
  <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow></a-box>
  <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow></a-sphere>
  <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>
  <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow></a-plane>
  <a-sky color="#ECECEC"></a-sky>
</a-scene>
```

This will cause the following behavior:

* Desktop: Dragging with the mouse simulates gaze,
and arrow keys (or WASD keys) move the default camera relative to gaze.

* Mobile: Orientation of the screen is used for gaze,
there is no way of moving the camera.

* Oculus Go: Orientation of the headset is used for gaze,
there is no way of moving the camera.

See [this scene in your browser](basic.html),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/interaction-01/basic.html)

### Adding a camera

I want to move the camera in the scene, so that I can "move" to any place in it.
And I want that both in desktop and Oculus Go, and to some extent in mobile:

* For Oculus Go, I will use gaze (the direction in which I'm looking)
and the touch button in the Go control. Gaze will be used for the relative
direction in which the touch button works (touch front, moves forward,
touch back moves backwards, right and left move perpendicular to gaze).

* For desktop, I will use dragging with the mouse to simulate gaze,
and arrow keys (or WASD keys) for moving relative to gaze.

* For mobile, the orientation of the mobile screen will be used for gaze,
and touching the screen will be used for moving forward.

