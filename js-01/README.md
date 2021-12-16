
*[Back to the main page](../README.md)*

## Building a scene with JavaScript

Let's work in `js-01`, creating a scene from scratch using
JavaScript. In other words, in HTML will have only an
`a-scene` element, and a JS script that, when the HTML
document is loaded in the browser, injects the rest of the
scene in the DOM, as children of `a-secene`.



Check the resulting [virtual reality scene](scene1.html).

[Same scene, with movement-controls](scene1-mc.html).

## Building a scene with an A-Frame component

Now, let's do the same, but with an A-Frame component.

Check the resulting [virtual reality scene](scene2.html).


## Events

Events can be added via properties of components
(for example, the `animation` component responds to events
if its property `startEvents` is used), or vía JavaScript
handlers.

Check the resulting [virtual reality scene](scene3.html).
