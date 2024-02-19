# Seminar (third session)

This session will enter into some more details of how to use A-Frame with only HTML, and how to write simple A-Frame components with JavaScript.

## 3D objects in GLTF format

We can set 3D objects in GLTF 2.0 format (as a single file, or GLB format) using the `gltf-model` component. Since GLTF file may be large, it is convenient to use a `a-assets` element to enclose the assets (in this case, the GLB file).

* [Scene source code](https://github.com/jgbarah/aframe-playground/tree/master/seminar-02/basic_gltf.html)
* [View online](basic_gltf.html)

There are many sources for GLTF objects. For example:

* [Sketchfab](https://sketchfab.com/). Many objects to download. Some of them are free, and can be reused, some are not.
* [Polycam](https://poly.cam/). Produce a GLTF from an object, using the camera of your mobile phone. Download the app, record the object with the camera from all angles, download the result as GLTF.

GLTF objects may have movements. Those can be animated with the `animation-mixer` component,
from [aframe-extras](https://github.com/c-frame/aframe-extras), which we already used to have the `movement-controls` component.

Let's work with
[Mech Drone](https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e),
by [Willy Decarpentrie](https://sketchfab.com/skudgee) (license CC-by). To download it, you will need to create an account in Sketchfab for you, and login.

By default, `animation-mixer` will run all the animations of the object
(in this case only one, which shows the arms of the drone moving):

```html
      <a-entity gltf-model="#drone" position="-1 0.6 -3"
          scale="2 2 2" animation-mixer>
      </a-entity>
```

* [Scene source code](https://github.com/jgbarah/aframe-playground/tree/master/seminar-02/basic_gltf2.html)
* [View online](basic_gltf2.html)


## Simple A-Frame component

[Detailed documentation in the A-Frame tutorial](https://aframe.io/docs/1.5.0/introduction/writing-a-component.html)


