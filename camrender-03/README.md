
*[Back to the main page](../README.md)*

## Making it components

After [playing with cameras and screens](../camrender-02/README.md), we have realized we need
some components (`camrender`, `canvas-updater`).
Let's build them now as first-class citizens: components that everyone can use
confortably.

### Building a ready-to-use component

After reading [Writing a component](https://aframe.io/docs/master/introduction/writing-a-component.html),
and in particular its section
[Publishing a component](https://aframe.io/docs/master/introduction/writing-a-component.html#publishing-a-component),
I followed its advice, and installed
[angle](https://www.npmjs.com/package/angle).
I did it locally, in the root of this repo
(I could have installed it globally for my laptop,
but I prefer to keep every thing in its place):

```bash
npm init -y
npm install angle
```

Then, I can initialize the component with some templates:

```bash
./node_modules/.bin/angle initcomponent
[Answer some questions about the component to create,
 using playground as the name of the component]
mv aframe-playground-component components
```

This produces a template of a component in the `components` directory
(I renamed the directory to `components` just for convenience).

Then, I need to do some tinkering, since for now I want to install two
components (`camrender` and `canvas-updater`). So, I wrote them
using the `index.js` template produce by `angle`, in two separate files
(`components/camrender.js` and `components/canvas-updater.js`).

I want the JavaScript file to include in HTML documents
to be `aframe-playground-components`
(instead of `aframe-playground-component`, as angle named it),
so I edit `name` property in package.json`, and other occurences
of that string in the file.

I also edit `README.md` to include some documentation and details.

Then, I run:

```bash
npm install
```

And commit the result in the git repo.

To upload the packages to [npm](https://npmjs.com),
I run the following commands (but before that, I check
the package version in `package.json`):

```bash
npm adduser
npm publish
```

### Using the new components in a scene

Once the git repository is pushed to GitHub,
we can use the new components from there.
For that, instead of including the `camrender.js` file,
as we did in previous examples, we get the file with the components,
for example, from [jsDelivr](https://jsdelivr.com):

```html
  <script src="https://cdn.jsdelivr.net/gh/jgbarah/aframe-playground/components/dist/aframe-playground-components.min.js"></script>
```

We can apply this change, for example, to
[one of our previous scenes with cameras and screens](../camrender-02/README.md#cameras-and-screens-all-over-the-place)

You can visit [the resulting scene in your browser](cameras-6.html),
or check its complete [source code](https://github.com/jgbarah/aframe-playground/blob/master/camrenderer-03/cameras-6.html)

