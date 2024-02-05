# Seminar (first session)

This session will show the most basic aspects of [A-Frame](https://aframe.io).

## Basic example

We will start with the [canonical basic HTML A-Frame scene](https://aframe.io/docs/1.5.0/introduction/):

* [Basic scene source code](https://github.com/jgbarah/aframe-playground/tree/master/seminar-01/basic.html)
* [View online](basic.html)

At this point, it is convenient that you also read the first part of [Building a Basic Scene](https://aframe.io/docs/1.5.0/guides/building-a-basic-scene.html).

## Basic working environment

To work comfortably, we will use some tools:

* [VSCode](https://code.visualstudio.com/), or the free version [VSCodium](https://vscodium.com/) (we will refer to it as VSC from now on). You can also use VSCode as a web app for any GitHub repository (see below), but in that case you cannot run the LiveServer extension. Some other IDEs, such as Eclipse or JetBrains will also work.
* The [LiveServer extension for VSCode or VSCodium](https://ritwickdey.github.io/vscode-live-server/)
    * Launch it as an HTTPS server. For that, you need to configure a certificate.
    You can use these self-signed certificates that we produced for the [BabiaXR project](https://babiaxr.gitlab.io): [babia_cert.pem](babia_cert.pem), [babia_key.pem](babia_key.pem). For that, download the two files somewhere in your filesystem, and configure LiveServer to use them.
* [GitHub](https://github.com) or [GitLab](https://gitlab.com), and [GitHub Pages](https://pages.github.com/) or [GitLab Pages](https://about.gitlab.com/stages-devops-lifecycle/pages/).
    * Create an account and log in
    * Create a repository
    * If you know how to use git, use it (you can use it from VSC)
    * If not, upload / download files to the repository using the web interface.
    * You can also use VSCode as a web app for any GitHub repo, just type "." (the dot) when in the repository. There, you can upload files maybe more easily.
    * Activate GitHub Pages (while in the repository, go to Settings | Pages)

The usual workflow will be as follows:

* Create a repository in GitHub or GitLab
* Using git, clone it locally, and open it as a project with VSC, or clone it directly from within VSC.
* Create / modify HTML files, and other files used as assets.
* View the results locally using LiveServer for serving the project via HTTPS. That can be done with a local browser, but also with the browser of a XR device in the same WiFi.
* When done, commit and push to GitHub or GitLab, either using git or from VSC, so that the changes can be seen from GitHub or GitLab Pages.

While checking the XR scenes in the desktop browser, we can also use the [A-Frame Inspector](https://aframe.io/docs/1.5.0/introduction/visual-inspector-and-dev-tools.html) and/or, if you know how to use them, the Developer Tools of your browser.

In general, everything in this seminar works with Firefox and Chromium in desktop, with Chromium in Android phones and tablets, and with Chromium (the standard web browser) in Quest, Pico and other XR devices. It will likely also work with [Wolvik](https://www.wolvic.com/en/) in Quest, Pico and other XR devices.

## Movement in the basic example

Let's add movement in the scene, using the available controllers in each device: arrow keys or wasd keys in desktop, touching the screen with a finger in mobile, gamepad controls in XR devices. For that, we need to use a third party module, [aframe-extras](https://github.com/c-frame/aframe-extras/), which is imported in the header, right after the A-Frame module:

```html
<script src="https://cdn.jsdelivr.net/gh/c-frame/aframe-extras@7.2.0/dist/aframe-extras.min.js"></script>
```

And then, we need a camera, and a camera rig:

```html
<a-entity movement-controls="fly: true">
    <a-entity camera look-controls wasd-controls position="0 1.6 0"></a-entity>
</a-entity>
```

See the complete scene, based on the basic example:

* [Scene source code](https://github.com/jgbarah/aframe-playground/tree/master/seminar-01/basic_move.html)
* [View online](basic_move.html)

## Augmented reality

When we use devices such as Quest 2 or Quest 3, we can try our scenes in augmented reality. For that, we need to add a component to the scene (to `a-scene`), that let's us select AR in devices in which it is available. This component is `xr-mode-ui="XRMode: xr"`. We can also use the `hide-on-enter-ar` component for entities that should not appear in AR (such as `sky`, for example, which would hide the reality).

See the complete scene, based on the basic example:

* [Scene source code](https://github.com/jgbarah/aframe-playground/tree/master/seminar-01/basic_ar.html)
* [View online](basic_ar.html)

We can also make the AR scene more real:

* [Scene source code](https://github.com/jgbarah/aframe-playground/tree/master/seminar-01/basic_ar2.html)
* [View online](basic_ar2.html)

## Hands as controllers

Instead of controllers, we can also use our hands. In this scene, we can see how the Quest can model our hands in augmented reality, following the gestures we do with them:

* [Scene source code](https://github.com/jgbarah/aframe-playground/tree/master/seminar-01/basic_hands.html)
* [View online](basic_hands.html)

And once we can track hands gestures, we can use them to interact with the scene. For example, check out this demo of grabbing objects with our hands:

* [Scene source code](https://github.com/jgbarah/aframe-playground/tree/master/seminar-01/basic_hands2.html)
* [View online](basic_hands2.html)


