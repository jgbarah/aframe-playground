
*[Back to the main page](../README.md)*

## Augmented reality

AFrame can be used on top of augmented reality (AR) libraries,
so that you can see AFrame scenes on top of the video provided
by a camera, for example, in the screen of a mobile.

The AR library that we will use is [AR.js](https://github.com/jeromeetienne/ar.js),
which includes `AR-Aframe.js`,
a library which allows to define an AFrame camera element,
`a-marker-camera`, which recognizes a special pattern,
and uses it to position the AFrame scene.

To use it, you can just include the AR-Aframe library in the HTML header,
and the `a-marker-camera` elememnt instead of the usual camera element in
the AFrame scene:

```html
<head>
  <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
  <script src="https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js"></script>
  ...
</head>
<body>
  ...
  <a-scene embedded arjs>
    ...
    <a-marker-camera preset='hiro'></a-marker-camera>
  </a-scene>
</body>
```

Note the `embedded` and `arjs` properties of the `a-scene` element,
that are needed in addition to the insertion of the `a-marker-camera`
element in the scene.

The elements in the scene are inserted relative to the position
of the marker, which is assumed to be in `0 0 0`. That way,
for example, positive numbers for the Z coordinate will mean that
the object is ahead the marker, and negative Z coordinates will
place the object behind the marker.
For placing a box exactly on the marker, you can use:

```html
<a-box position='0 0.5 0' material='color: red;'></a-box>
```

You can read much more details in this
[blog post about how to use AR-Aframe](https://aframe.io/blog/arjs/).

See [the scene](ar.html)
(use a mobile, or any device with a camera),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/ar-01/ar.html)

## Adding movement

Different feartures of AFrame can be used with AR-Aframe.
For example, adding movement is easy. Let's add a moving box:

```html
<a-box position="0 0 -1" rotation="0 90 0" scale=".5 .5 .5" material='color: blue;'>
  <a-animation attribute="position" to="0 0 1" direction="alternate" dur="4000"
    repeat="indefinite"></a-animation>
</a-box>
```

See [the scene](ar-moving.html)
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/ar-01/ar-moving.html)
