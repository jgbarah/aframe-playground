
*[Back to the main page](../README.md)*

## More and more screens!

We have explored
[how to add some screens to the scene](../camrender-01/README.md),
but we can still explore this path further.
Let's add screens and cameras that go with our screen.
Multiple screens showing the same camera. And much more.

### Adding a screen to a camera

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
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/camrenderer-02/cameras-4.html)

The final result is like this:

![Screen with camera](aframe-cameras-4.gif)

### Camera linked to the main camera

Cameras can placed anywhere, including linked to the main camera.
This can be used to simulate a rear camera projecting on the windshell.

```html
<a-entity position="1.5 0 3" movement-controls...>
  ...
  <a-entity camera camrender="rid: cam3"
            position="0 1.6 0" rotation="0 180 0"></a-entity>
  <a-entity geometry="primitive: cylinder; radius:.7; height: .3;
                      openEnded: true; thetaStart: 195; thetaLength: 40"
            position="0 1 -1" material="src: #cam3; opacity: .8; side: back"></a-entity>
</a-entity>
```

I just insert the rear camera in the main camera rig,
pointing backwards.
I also insert a screen, as we did above, for projecting this new camera.

You can visit [the resulting scene in your browser](cameras-5.html),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/camrenderer-02/cameras-5.html)

The final result is like this:

![Screen with camera](aframe-cameras-5.gif)


### Cameras and screens all over the place

Finally, I prepared a scene with one more camera,
this one moving, and projected on a box. 
The relevant code for this new camera is:

```html
<a-entity>
  <a-animation attribute="position" dur="30000"
               from="-3 -5 -6" to="3 -5 -6"
               direction="alternate" repeat="indefinite"></a-animation>
  <a-entity camera="active: false" camrender="rid: cam4"
            position="0 -0 0" rotation="90 90 0">
  </a-entity>
  <a-cone color="green" radius-bottom=".2" radius-top=".05" height=".5">
  </a-cone>
</a-entity>
```

The enclosing `a-entity` acts as a rig for the camera,
the animation that will move it, and a cone to help in visualizing where is
the camera in the scene.
The animation makes the camera (wich is set up to point upwards)
move below the scene, alternating left-to-right and right-to-left.
The position of the rig is defined by the animation within it,
and the rest of positions (for the camera and the conde) are relative to that of the rig.

That camera (rendered in the `cam4` canvas) is projected on a box,
placed at the right of the scene:

```html
<a-box position="-3 2 0" width="2" height="2" depth="2"
       material="src:#cam4"></a-box>
```

I also improved a bit the appearance of the screen for showing the
main camera (on the right of the screen):

```html
<a-plane position="4 1 1" rotation="0 -15 0" width="4.5" height="3.5"
         material="color: black">
  <a-text position="-.3 1.56 .2" value="Main view" color="red"></a-text>
  <a-plane position="0 0 .1" width="4" height="3"
           material="src:#cam1"></a-plane>
</a-plane>
```

I used a black plane to provide some border to the screen, and then
(relative to it) the plane for projecting the camera, and some text
on the top border.

This scene, when running in the browser, is doing a good deal of computing
for rendering all the cameras. So, depending on the hardware you have,
maybe it will not update for every frame, and will take some time
to boot.

You can visit [the resulting scene in your browser](cameras-6.html),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/camrenderer-02/cameras-6.html)

The final result is like this:

![Screen with camera](aframe-cameras-6.gif)
