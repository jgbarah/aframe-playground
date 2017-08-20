
*[Back to the main page](../README.md)*

## Simple configuration for webpack

There are some very nice and complete boilerplates to use A-frame with webpack,
such as [aframe-webpack-boilerplate](https://github.com/mkungla/aframe-webpack-boilerplate).
But they are, well, nice, and complete, and... complex.
So I will start with a simpler one that I can easily understand.

### Creating a directory for webpack

I want to create a simple project for A-frame,
using webpack, with all the assets in the project
(nothing to be retrieved from CDNs).
You can find the files with which I start in the
`figures-02` directory in this repository.

Let's assume I only have a `.js` file and a `.html` file,
plus some images (JPG files) and one MSDF font (Roboto) as assets.
A very simple configuration that seems to work is obtained as follows.

I create a directory for sources, `src`, where I include my `figures.js` file,
and a directory for final results, `dist` (output directory),
with my `figures.html` file, and all the other assets.

So, I start with a directory structure as:

```
figures-02/
|- dist/
  |- figures.html
  |- bands.jpg
  |- molinos-bw.jpg
  |- soil.jpg
  |- window.jpg
  |- Roboto-msdf.json
  |- Roboto-msdf.png
|- src/
  | - figures.js
```

I need to ensure that 'figures.html' loads the right JS file,
which in this case is going to be `bundle.js`.
This file will be conveniently produced by webpack out of
`figures.js`, `aframe.js`, and all its dependencies needed to work.
For that I insert the following lines in the HTML `HEAD` element:

```
<head>
  <script src="bundle.js"></script>
</head>
```

Once I'm done with the preliminaries,
I need to run some commands in the root of my new directory,
and write a configuration file for webpack.

### Initialize npm and install packages

First I initialize npm on it (assuming node is already installed),
and install via npm `webpack` (as a developer dependency) and
`aframe` (as a regular dependency):

```bash
$ npm init -y
$ npm install --save-dev webpack
$ npm install --save aframe
```

This will create a default `packages.json` file for `npm`,
with entries for `webpack` and `aframe` in it.
Additionally, both packages and all their dependencies
will now be installed under `node_modules`.

### Simple configuration for webpack

And I create a very simple configuration file for webpack,
`webpack.config.js`:

```javascript
const path = require('path');

module.exports = {
  entry: './src/figures.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

And we're ready to let webpack do its magic:

```bash
$ node_modules/webpack/bin/webpack.js
Hash: f2229974cd40391a714a
Version: webpack 3.5.4
Time: 2036ms
    Asset     Size  Chunks                    Chunk Names
bundle.js  2.14 MB       0  [emitted]  [big]  main
   [0] (webpack)/buildin/global.js 509 bytes {0} [built]
   [1] ./src/figures.js 387 bytes {0} [built]
    + 5 hidden modules
```

After this, the structure of my project is as follows:

```
figures-02/
|- dist/
  |- figures.html
  |- bands.jpg
  |- molinos-bw.jpg
  |- soil.jpg
  |- window.jpg
  |- Roboto-msdf.json
  |- Roboto-msdf.png
|- node_modules/
  |- aframe/
    - ...
  |- node_modules/
    - ...
|- src/
  | - figures.js
|- packages.json
|- webpack.config.js
```

webpack produced the `dist/bundle.js` file,
which is the one that we conveniently had referenced in the HTML file.

### Browsing the results

Now, the `dist` directory has it all.
For this very simple case,
we don't even need a web server,
we can just load the HTML file in the browser:

```bash
$ firefox dist/figures.html
```

But as before, we can also fire a simple HTTP server,
like the Python one,
which will need to export only that `dist` directory.

### Looking at the code

In this case I've added everything,
except for the `node_modules` directory,
to the git repository (directory `figures-02`).
Remember that the `packages.json` file was actually produced
by npm when installing the needed packages,
and that `dist/bundle.js` was produced by webpack.

If you just want to get a populated `node_modules`,
you only need to install via `npm` what the `package.json` specifies.
And then you can just run `webpack` as above, to produce
`dist/bundle.js`:

```
$ cd figures-02
$ npm install
$ node_modules/webpack/bin/webpack.js
```
