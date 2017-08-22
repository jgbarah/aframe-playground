
*[Back to the main page](../README.md)*

## Templates I'm using

I'm using the templates in this directory `templates`.
They include a base of what I need to produce an
A-frame application managed with webpack.
There is some stuff, such as fonts,
that you only need in some cases,
so use with care, and remove unneeded stuff.

When starting a new application,
I just copy all this stuff to a new directory, and:

* In `package.json`:
Write appropriate `name`, `version`, `description` propierties.

* In `src/main.js`:
Check if more dependencies should be included,
for other libraries besides A-frame,
or for the application code.
If Roboto fonts are to be used in A-frame text,
uncomment the corresponding lines
(otherwise, remove `Roboto*` files in `src` directory).

* In `src/main.html`:
Add whatever is convenient for the application I'm writing.

* Install dependencies in the template:

```
$ npm install
```

* If there are other libraries that are not in `package.json`,
install them, saving the new dependency to `package.json`:

```
$ npm install library --save
```

* Build the stuff, by running one of the following:

```
$ npm run build
$ npm run watch
$ npm run start
```

The first one will build the application in the `dist` directory,
by using `webpack -p` (production).

The second one will also build the application using webpack,
and will let it watch for any change to the source files,
which will trigger webpack producing the application again.

The third one will build the application, and launch a web server,
watching for changes to source files as well
(and re-producing the application any time they change).
Your default web browser will be launched as well to check the application.

You can also run any of:

```
$ npm run clean
$ npm run cleanbuild
```

The first one will clean (remove) all files in the `dist` directory.
The second one will clean, and then build the application.
