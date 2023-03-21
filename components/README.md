## Playground Components

[![Version](http://img.shields.io/npm/v/aframe-playground-components.svg?style=flat-square)](https://npmjs.org/package/aframe-playground-components)
[![License](http://img.shields.io/npm/l/aframe-playground-components.svg?style=flat-square)](https://npmjs.org/package/aframe-playground-components)

A-Frame Playground components for [A-Frame](https://aframe.io):

* Camrender ([Documentation](#camrender)).
  Component that renders the output of a camera in a canvas.
  
* Canvas Updater ([Documentation](#canvas-updater)).
  Component for updating a material showing a canvas,
  when the canvas is updated.
  
### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/jgbarah/aframe-playground/components/dist/aframe-playground-components.min.js"></script>
</head>

<body>
  <a-scene>
    <a-assets>
      <!-- Canvas for rendering secondary camera -->
      <canvas id="cam2"></canvas>
    </a-assets>
  
    <!-- Objects in the scene -->
    <a-box position='0 0.5 0' material='color: red;'></a-box>
    <a-box position="-1 0.5 -1" rotation="0 45 0" color="#4CC3D9" shadow></a-box>
    <a-sphere position="0 1.25 -3" radius="1.25" color="#EF2D5E" shadow></a-sphere>
    <a-cylinder position="1 0.75 -1" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>
    <a-plane position="0 0 -2" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow></a-plane>
    <a-sky color="#ECECEC"></a-sky>

    <!-- "Regular" camera -->
    <a-entity camera position="0 0 5" look-controls></a-entity>

    <!-- Secondary camera, set above the objects, looking down, with camrender -->
    <a-entity camera="active: false" camrender="cid: cam2" position="-1 5 -3" rotation="-90 90 0">
    </a-entity>

    <!-- Screen for showing the secondary camera, with canvas-updater -->
    <a-plane position="-4 2 0" rotation="0 20 0" width="4" height="3"
             material="src:#cam2; opacity: .95" canvas-updater></a-plane>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-playground-components
```

Then require and use.

```js
require('aframe');
require('aframe-playground-components');
```

### Camrender

This component renders the output of a camera in a canvas element.
Usually, this component will be included in the same entity than the camera,
and will render on a canvas defined within `a-assets`:

```html
<a-scene>
  <a-assets>
    <canvas id="camRenderer"></canvas>
  </a-assets>
  ...
  <a-entity camera camrender="cid: camRenderer"></a-entity>
</a-scene>
```

That canvas can be used for the material of any suitable object,
which will then act as a screen or projection (see `canvas-updater`)
below).

Note: if this is not applied to the primary (main) camera,
ensure that the camera includes the `active` property set to false:

```html
  <a-entity camera="active: false" camrender="cid: camRenderer"></a-entity>
```

See more details in this [A-Frame Playground](../README.md)
([Cameras and screens](../camrender-01/README.md),
[More and more screens!](../camrender-02/README.md)),
[Making it components](../camrender-03/README.md)).

#### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| fps      | desired FPS | 90            |
| cid      | Id of the canvas element used for rendering the camera | camRenderer |
| height   | Height of the renderer canvas | 300 |
| width    | Width of the renderer canas   | 400 |

### Canvas Updater

Component for updating a material showing a canvas,
when the canvas is updated.
It may work in combination with `camrender`
to show the output of a camera in any suitable material
(using a canvas for the rendering):
  
```html
<a-scene>
  <a-assets>
    <canvas id="camRenderer"></canvas>
  </a-assets>
  ...
  <a-plane width="4" height="3"
           material="src:#camRenderer" canvas-updater>
  </a-plane>
</a-scene>
```

See more details in this [A-Frame Playground](../README.md)
([Cameras and screens](../camrender-01/README.md),
[More and more screens!](../camrender-02/README.md)),
[Making it components](../camrender-03/README.md)).

#### API

No properties are supported by this component
