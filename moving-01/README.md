
*[Back to the main page](../README.md)*

## Adding objects with animations

Now, I'm going to work in `moving-01`,
creating a scene  with a moving object from
[Sketchfab](https://sketchfab.com).

### Inserting the object in the scene, rotating

I'm going to work with
[Mech Drone](https://sketchfab.com/models/8d06874aac5246c59edb4adbe3606e0e),
by [Willy Decarpentrie](https://sketchfab.com/skudgee) (license CC-by).
I donwload it, and unzip it in the `src/mech_drone` directory.
Now, I only need to write a HTML with and scene including it.
We will first include it rotating, with no self-animation:

```html
<a-scene>
  <a-assets>
    <a-asset-item id="drone" src="mech_drone/scene.gltf"></a-asset-item>
  </a-assets>

  <a-entity position="0 2 -9" gltf-model="#drone"
            scale="0.02 0.02 0.02">
    <a-animation attribute="rotation" dur="10000" fill="forwards"
                 to="0 360 0" repeat="indefinite">
    </a-animation>
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
`aframe-extras.animation-mixer`,
from [aframe-extras](https://github.com/donmccurdy/aframe-extras/).

I first install the npm library:

```bash
$ npm install --save aframe-extras.animation-mixer
```

And then import it in `figures.js`, which will be now like this:

```html
import aframe from 'aframe';
import animation from 'aframe-extras.animation-mixer';

AFRAME.registerComponent('animation-mixer', animation);
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
          scale="0.03 0.03 0.03" animation-mixer>
  <a-animation attribute="rotation" dur="10000" fill="forwards"
               to="0 360 0" repeat="indefinite"></a-animation>
</a-entity>
```

### Making it mysterious

Some light and fog can change the aspect of the scene a lot.
I tried with oscillating light and fog:

```html
<a-scene fog="type: exponential; density: 0.15; color: #000;">
...
    <a-animation attribute="fog.color"
                 dur="7000"
                 from="#000"
                 to="#10454A"
                 repeat="indefinite"
                 direction="alternate">
    </a-animation>
    <a-sky color="grey"></a-sky>
    <a-light type="point" intensity="0" position="-2 2 2">
      <a-animation attribute="light.intensity"
                   dur="7000"
                   from="0"
                   to="1.5"
                   direction="alternate"
                   repeat="indefinite">
      </a-animation>
    </a-light>
...
</a-scene>
```

The fog component is embedded as a property in `a-scene`,
and then the first `a-animation` controls how its color changes over
time, oscillating from black to a greeninsh color, every 7 seconds.
I set a grey sky (so that the background is not just white),
and a point of light oscillating between off and 1.5 in intensity,
also every 7 seconds. The result is, well, foggy...

This final touch was directly inspired by
[How to Animate Moods in WebVR with A-Frame and the Animation Element](https://ottifox.com/develop/2017/08/30/animate-moods-in-webvr-with-aframe.html).

### Generating dist files and running everything

As we saw in the previous section, the complete process to build the project is:

```
$ cd moving-01
$ npm install
$ npm run start
```

This will build everything,
you will only need a browser to see the resulting scene.

### Results

Check the resulting [virtual reality scene](web/index.html).
