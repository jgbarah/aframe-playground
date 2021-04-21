
*[Back to the main page](../README.md)*

## Adding 3D objects with animations

Now, I'm going to work in `moving-01`,
creating a scene  with a moving object from
[Sketchfab](https://sketchfab.com).

### Inserting the object in the scene, rotating

I'm going to work with
[Mech Drone](https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e),
by [Willy Decarpentrie](https://sketchfab.com/skudgee) (license CC-by).
I donwload it, and unzip it in the `assets/3d/mech_drone` directory.
Now, I only need to write some HTML with and scene including it.
We will first include it rotating, with no self-animation:

```html
<a-scene>
  <a-assets>
    <a-asset-item id="drone" src="../assets/3d/mech_drone/scene.gltf"></a-asset-item>
  </a-assets>

  <a-entity position="0 2 -9" gltf-model="#drone"
            scale="0.02 0.02 0.02"
            animation="property: rotation; dur: 10000;
                       to: 0 360 0; loop: true">
  </a-entity>

  <a-sky color="grey"></a-sky>
  <a-light type="ambient" color="white"></a-light>
  <a-light type="point" intensity="1" position="-2 2 2"></a-light>
</a-scene>
```

### Inserting the object with its self-animation

But we already know how to do that.
Let's now use the animation that the object has itself,
as a part of its glTF definition. For that, we will use
the component `animation-mixer`,
from [aframe-extras](https://github.com/donmccurdy/aframe-extras/).
We will need to load the library:

```html
<script src="https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.min.js"</script>
```

Finally, we only need to use the parameter `animation-mixer`
in the `a-entity` with which I will import the drone,
which will make the properties of the component `animation-mixer`
to be inherited. By default, it will run all the animations of the objects
(in this case only one, which shows the arms of the drone moving):

```html
<a-entity position="8 2 -9" gltf-model="#drone"
          scale="0.02 0.02 0.02" animation-mixer>
</a-entity>
```

### Combining rotation with self-animation

Finally, let's create a third dron, this one rotating and
self-animating at the same time, combining what we already know:

```html
<a-entity position="-6 -2 -9" gltf-model="#drone"
          scale="0.03 0.03 0.03" animation-mixer
          animation="property: rotation; dur: 10000;
                     to: 0 360 0; loop: true">
</a-entity>
```

### Making it mysterious

Some light and fog can change the aspect of the scene a lot.
I tried with oscillating light and fog:

```html
<a-scene background="color: #D3D3D3"
         fog="type: exponential; density: 0.12; color: #696969;"
         animation="property: fog.color; dur: 7000;
                   from: #696969; to: #fff;
                   loop: true; dir: alternate">
...
  <a-light type="point" intensity="0" position="-2 2 2"
           animation="property: light.intensity;
                      dur: 7000; from: 0; to: 1.5;
                      dir: alternate; loop: true">
  </a-light>
</a-scene>
```

The fog component is embedded as a property in `a-scene`,
and its `animation` component controls how color changes over
time, oscillating from white to grey, every 7 seconds.
I set a grey background,
and a point of light oscillating between off and 1.5 in intensity,
also every 7 seconds. The result is, well, foggy...

This final touch was directly inspired by
[How to Animate Moods in WebVR with A-Frame and the Animation Element](https://ottifox.com/develop/2017/08/30/animate-moods-in-webvr-with-aframe.html).

### Results

Check the resulting [virtual reality scene](figures.html).

### To probe further

There is a nice demo of how to build a GLTF model viewer with A-Frame,
the [A-Frame Showcase Model Viewer](https://aframe.io/aframe/examples/showcase/model-viewer/).
It works with desktop, mobile, and VR devices. In some devices supporting
Android ARCore you can also see the model in AR (tested with Chrome on Android).

The [source code for this demo is available in Glitch](https://glitch.com/edit/#!/aframe-model-viewer?path=model-viewer.js).
