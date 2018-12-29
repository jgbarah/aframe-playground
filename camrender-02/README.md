
*[Back to the main page](../README.md)*

## More and more screens!

We have explored how to add some screens to the scene,
but we can still explore this path further.
Let's add screens and cameras that go with our screen.
Multiple screens showing the same camera. And much more.

### Add a screen to a camera

In some cases, you may need a screen that is always in your scene,
in the same relative place with respect the point of view
(the main camera of the scene).
For obtaining this effect, I will attach a screen to the main camera.

For example, let's attach a cylindrical screen
(well, a section of a cylinder) to the main screen.
The relevant part of the scene is as follows:

```html
<a-entity position="1.5 0 3" movement-controls="fly: true; speed: 0.1; camera: #priCam">
  <a-entity id="priCam" camera position="0 1.6 0" look-controls></a-entity>
  <a-cone color="brown" radius-bottom=".2" radius-top=".05" height=".5"
          position="0 1 -1" rotation="-80 0 0"></a-cone>
  <a-entity geometry="primitive: cylinder; radius:.7; height: .3;
                      openEnded: true; thetaStart: 135; thetaLength: 40"
            position="0 1 -1" material="src: #cam2; opacity: .8; side: back"></a-entity>
</a-entity>
```

You can notice that it is pretty much the same code we used for
[cameras-3](../camrender-01/README.md#cameras-3), except for the
addition of the last entity, the screen.
As we did before, we use the `material` component to project the canvas
that is rendering the camera (`cam2` in this case).

To avoid a minor bug in `movement-controls`, we will set the
`camera: #priCam"` attribute, to declare the camera we want to use 
attached to `movement-controls` (whihc is labeled with the same `id`: `priCam`).

It is also important to have the secondary camera before the primary one,
because we need its canvas to be created before it is used for the
material of the screen attached to that primary camera.

You can visit [the resulting scene in your browser](cameras-4.html),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/camrenderer-01/cameras-4.html)

The final result is like this:

![Screen with camera](aframe-cameras-4.gif)
