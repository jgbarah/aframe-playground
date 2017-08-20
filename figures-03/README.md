
*[Back to the main page](../README.md)*

## Improving webpack configuration

Now, I'm going to work in `figures-03`,
improving the webpack and npm configuration to automate some tasks,
and to make life more comfortable
(isn't that what we all want?).

### Automating the build process

First, automating the build process,
and making webpack produce minified, production ready, files.

For that, I just need to run `webpack` with the corresponding options:
`-p` for production, and `--watch` for rebuilding when there are changes.
I'm going to include this in the npm configuration, `package.json`:

```
  ...
  "scripts": {
        "build": "webpack -p",
        "watch": "webpack --watch"
    },
  ...
```

Now, when I run `npm run build`, it builds the thing,
ready for production.
When I run `npm run watch`, it builds every time there is a new version
of a source file:

```
$ npm run watch

Webpack is watching the files…

Hash: f2229974cd40391a714a
Version: webpack 3.5.4
Time: 2150ms
    Asset     Size  Chunks                    Chunk Names
bundle.js  2.14 MB       0  [emitted]  [big]  main
   [0] (webpack)/buildin/global.js 509 bytes {0} [built]
   [1] ./src/figures.js 387 bytes {0} [built]
    + 5 hidden modules

[I save a new version of src/figures.js]

Hash: 41432c82e83cf3f9c01f
Version: webpack 3.5.4
Time: 71ms
    Asset     Size  Chunks                    Chunk Names
bundle.js  2.14 MB       0  [emitted]  [big]  main
   [1] ./src/figures.js 422 bytes {0} [built]
    + 6 hidden modules
...
```

I no longer need to run webpack every time I have new source files!

*Important note:*
This does not apply to changes in the webpack configuration,
so every time I change `webpack.config.js`
I need to run `node run watch` again.

### Using webpack's web server

I also want to have webpack provide its own web server,
just in case I don't want to run one-line Python server.
For that, we have the
[webpack-dev-server package](https://webpack.github.io/docs/webpack-dev-server.html).
I first install it:

```
$ npm install --save-dev webpack-dev-server
```

And include a new script for npm, in `package.json`:

```
  "scripts": {
    ...
    "web": "webpack-dev-server --content-base dist/"
```

Now, when running 'npm run web',
I can point my browser to http://localhost:8080/figures.html
and see my application.

This module will also watch source files, and recompile then when needed.

### Using babel for transpiling es6 to es5

Next, I'm interested in writing es6 (ECMA Script v6, or ES2015) programs,
so I will be using `babel` as a transpiler to es5.
For that, I will use a webpack loader.
Loaders are scripts that know how to "load", or "prepare",
some kinds of files.
In this base, the babel loader will prepare `.js` files.

First, I need to install the loader, with npm:

```
npm install --save-dev babel-core babel-preset-es2015
npm install --save-dev babel-loader
```

And add a configuration for the default module in webpack:

```
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ],
  }
```

I add the `include` property to be sure that only files in the `src`
directory are tested.
For example, I don't want those in 'node_modules' to be tested...
(and include rules seem better than exclude ones).

### Adding support for colored messages

This is a simple configuration option that will cause messsages
in webpack output to get colored
(as a property of `module.exports`):

```
  stats: {
    colors: true
  },
```

### Generate a sourcemap for debugging

If you want to use a debugger on the code,
you need a sourcemap.
You can easily get this adding to the weebpack configuration
(as a property of `module.exports`):

```
  devtool: 'source-map'
```

### I prefer HTML driver page in src

Up to now, `dist/images.html` is the driver (launcher) HTML page
which includes all JavaScript, images, etc.
I want to have it in `src`, instead of `dist`,
since it looks more like a source file for the project.

For that, I'm going to use it as a template for the HTML that
act as the driver...
Although in my case, the template is going to be
practically the HTML file I want.
The only thing I need to change from the
`dist/images.html` I had is removing, in the `head`,
the reference to the `bundle.js` script,
which will be included in the 'template'.

For managing this file as a template with webpack,
I will use a webpack plugin: `html-webpack-plugin`
(if you want,
[check documentation about it](https://www.npmjs.com/package/html-webpack-plugin)).

I install it as usual:

```
$ npm install html-webpack-plugin --save-dev
```

And then, I need some changes to `webpack.config.js`:

```
...
const HtmlWebpackPlugin = require('html-webpack-plugin');

...
  plugins: [new HtmlWebpackPlugin({
    template: './src/figures.html',
    inject: 'head',
    filename: 'index.html'
  })]
```

The first line will requite the plugin, and the last lines,
to be included as a property of `module.exports`,
will actually launch the plugin.
It will generate an HTML in the `dist` directory
(because that's our output directory),
using the name `index.html`
(because of the property `filename`),
using our `src/figures.html` file as template,
and injecting the needed JavaScript code
(`bundle.js`)
in the `head` element.

Now, if I just run for example `npm run start`
my broswer will be pointed to the new `index.html`
(since that's the default launching it on the directory url).

### Copy images from src

I also want images to be in src.
For that, I will be using the combination of two loaders:
`html-loader` ([check documentation about it](https://webpack.js.org/loaders/html-loader/)),
and `file-loader`
([check documentation about it](https://webpack.js.org/loaders/file-loader/)).

The first one will be used to generate `require` statements for each
`img` element found in the HTML files parsed
(I will parse `figures.html`),
and the second one for loading the files corresponding to those `require`d
images to the `dist` directory.

As a byproduct, the HTML file will be minimized.

To install, as usual:

```
npm install html-loader --save-dev
npm install file-loader --save-dev
```

And some additions to `webpack.config.js`:

```
  {
    test: /\.html$/,
    include: [path.resolve(__dirname, 'src')],
    loader: "html-loader"
  },
  {
    test: /\.(jpg|png|svg)$/,
    include: [path.resolve(__dirname, 'src')],
    loader: 'file-loader',
    options: {
      name: '[name].[ext]'
    }
  },
```

Both go in the list of loaders.
The first one will produce the list of images,
and the second one, for each of them,
will copy the corresponding file to the `dist` directory.

As a result, now after running for example `npm run build`
I get `.jpg` files with their own names,
thanks to the `options` entry.
If I don't use it,
I will get as names the file hash and the corresponding extension.
This is useful to avoid issues with caches,
but for now I prefer not to use it,
for clarity in the `dist` directory.

The `index.html` file is now minified
(courtesy of `html-loader`).

### Copy font files from src

In my example I'm using Roboto fonts.
I want to have everything needed for running the application local,
available from the dist directory.
So I want a copy of those two files
(`Roboto-msdf.json` and `Roboto-msdf.png`) in the dist directory.

I'm not completely happy with the way I did it,
since I prefered something more automatic.
But well, for sake of simplicity,
and not spending more time exploring other options,
I decided to just require the files in the main JavaScript entry point,
`figures.js`, and then let `file-loader` copy them to `dist`.
For that, I added the following lines to `figures.js`:

```
// Require font files to have them included in dist
const roboto_json = require ("./Roboto-msdf.json")
const roboto_png = require ("./Roboto-msdf.png")
```

And a new test to `webpack.config.js`,
which is very specific, because I just want MSDF files
to be copied this way.
In fact, since one of the files is a `.png` file,
I also need to ensure that it won't be catch by the test on images,
so I have to restrict it.
For simplifying adding future fonts,
I define a constant at the beggining of the `webpack.config.js` file,
and then use it when testing for files and fonts:

```
const fontFilesPattern = /-msdf\.(json|png)$/

module.exports = {
  ...
    loaders: [
    {
      test: /\.(jpg|png|svg)$/,
      include: [path.resolve(__dirname, 'src')],
      exclude: fontFilesPattern,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    },
    {
      test: fontFilesPattern,
      include: [path.resolve(__dirname, 'src')],
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    },
  ...
```

### Adding a cleaning script

In may cases, it is convenient to build from scratch.
Given the structure of compilation that I'm using,
you only need to be sure that `dist` directory is empty before building.
For that, I've added a couple of new scripts in package.json:

```
  "scripts": {
    ...
    "clean": "rm -r dist/*",
    "cleanbuild": "rm -r dist/* && webpack -p",
    ...
  },
```

Now, I can just run `npm run clean` when I want a clean `dist` directory,
or `npm run cleanbuild` when I want a built from scratch.

### Generating dist files and running everything

With all this goodies, now you can use the stuff in `figures-03`
to produce all the files (`bundle.js` and `bundle.js.map`)
needed to run the application.

The complete process (starting from the contents in the directory)
is:

```
$ cd figures-03
$ npm install
$ npm run start
```

This will build everything, and launch the predefined browser
pointing to the `dist` directory,
exported by the webpack web server.
If you change source code,
webpack will recompile and the new version will be pushed to the browser.

If you only want to build the stuff,
and rebuild every time there are changes
(for example, because you're launching your own web server),
just run instead of the last line:

```
$ npm run watch
```

For building the production version, instead of the last line,
run:

```
$ npm run build
```
