
*[Back to the main page](../README.md)*

## New year best wishes

Using basic AFrame it is easy to produce a scene that can be used to
wish new year.
In fact, the scene outlined below was produced by a young developer,
13 years old, who is starting to learn HTML and AFrame.

### From 2018 to 2019

The background idea for the scene is the transition from 2018 to 2019.
To represent it, we will show "2018" in a night sky, falling down slowly until 
it is hidden below the horion. Then, "2019" will appear in its place.
All of this over a white landscape, with some snow falling,
and some sparks in the background.

For the banners with the years ("2018" and "2019") we used
[aframe-text-geometry-component](https://github.com/supermedium/superframe/tree/master/components/text-geometry/),
which is a thin wrapper for
[THREE.TextGeometry](https://threejs.org/docs/#api/en/geometries/TextGeometry):

```html
<a-entity material="color: gold" scale="100 100 100"
          text-geometry="value: 2019" position="-70 1000 -1000">
  <a-animation attribute="position" to="-70 20 -100" dur="17000"></a-animation>
</a-entity>
<a-entity material="color: gold" scale="100 100 100"
          text-geometry="value: 2018" position="-70 20 -100">
  <a-animation attribute="position" to="-70 -100 -100" dur="20000"></a-animation>
</a-entity>
```

The `a-animation` component is responsible for lowering or raising
the corresponding texts.

The snowy landscape is provided by a single component,
[aframe-environment-component](https://github.com/supermedium/aframe-environment-component):

```html
<a-entity environment="preset: starry; ground: hills; groundColor: white;
                       groundColor2: grey; playArea: 1; groundYScale: 20"></a-entity>
```

For the falling snow, we used four "snow producers", using the
[particle-system](https://github.com/IdeaSpaceVR/aframe-particle-system-component) component:

```html
<a-entity position="0 5 0" particle-system="preset: snow"></a-entity>
<a-entity position="3 5 0" particle-system="preset: snow"></a-entity>
<a-entity position="-3 5 0" particle-system="preset: snow"></a-entity>
<a-entity position="0 5 0" particle-system="preset: snow"></a-entity>
```

Each of them provides some amount of snow falling in a part of the scene.

And finally, the sparks on the sides of the year
are built also with `particle-system`:

```html
<a-entity position="70 10 -50"
          particle-system="rotationAxis: x; rotationAngle: 0.7"></a-entity>
<a-entity position="-55 10 -50"
          particle-system="rotationAxis: x; rotationAngle: -0.7"></a-entity>
```

The rest is just including some lights:

```html
<a-light type="ambient" color="white" ></a-light>
<a-light type="point" intensiy="3" position="0 -20 -70" color="white" ></a-light>
<a-light type="point" intensiy="3" position="0 -10 -70" color="white" ></a-light>
<a-light type="point" intensiy="3" position="0 20 -70" color="white" ></a-light>
<a-light type="point" intensiy="3" position="0 10 -70" color="white" ></a-light>
```

And of course some final bits for moving in the scene:

```html
<a-entity movement-controls position="0 0 5">
  <a-entity camera position="0 1.6 0" look-controls></a-entity>
</a-entity>
```

Enter [this scene in your browser](newyear.html),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/newyear-01/newyear.html)

The final result is like this:

![New year greeting](aframe-newyear.gif)


### Some changes

A variation of the scene, somewhat simplified, and a bit more efficient
(in terms of computing needs): Enter [this scene in your browser](newyear-2.html),
(includes sound) or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/newyear-01/newyear-2.html)

The final result is like this:

![New year greeting revisited](aframe-newyear-2.gif)

### Credits

[Fireworks sound](http://soundbible.com/692-Fireworks.html) by Stephan in SoundBible.