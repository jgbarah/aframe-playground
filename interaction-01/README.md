
*[Back to the main page](../README.md)*

## Learning to add interaction

I want to move in the scene, and want to select objects, triggering some event when selecting,
that I can use to do something (such as changing some propierty of the object,
or popping up a banner with data about the object, for example).
I want all of this to work in desktop and in Oculus Go,
and to the extent possible, in mobile too.

Since this is not that difficult, but a bit different from other stuff
we have done up to now, I'm going to first show how this is done with a simple example.

### Movement in the scene

I want to move the camera in the scene, so that I can "move" to any place in it.
And I want that both in desktop and Oculus Go, and to some extent in mobile:

* For Oculus Go, I will use gaze (the direction in which I'm looking)
and the touch button in the Go control. Gaze will be used for the relative
direction in which the touch button works (touch front, moves forward,
touch back moves backwards, right and left move perpendicular to gaze).

* For desktop, I will use dragging with the mouse to simulate gaze,
and arrow keys (or WASD keys) for moving relative to gaze.

* For mobile, the orientation of the mobile screen will be used for gaze,
and touching the screen will be used for moving forward.

