
*[Back to the main page](../README.md)*

## Adding axis and tooltips

I'm going to add some functionality,
and to refactor the code a bit.
The result is two components:
`scatterplot`, which I already had,
and `tooltip`,
which I'm going to use to show tooltips close to the points
(spheres), when the pointer is on them.
I will also draw X, Y and Z axis in the plot.

The result, with a tooltip shown, is like this:

![Scatterplot with axis and tooltip](scatterplot-axis-tooltip.png)

You can also [see it live](web/).
Move the cursor (the tiny black circle in the middle)
by looking around if you are in virtual reality,
or by clicking and dragging the pointer in desktop,
until it reaches one of the spheres. Wait for about one second,
and the sphere should get bigger, and a tooltip should appear on its right.

*Note:* For some reason, it seems that if the sphere is completely
within the framing box, the tooltip is not seen,
apparently because the box hides it
(despite the box being transparent).
I'm still not sure if this is an A-frame bug...

The code for this step is available in the `plots-03` directory.

### Adding axis

Adding axis was a matter of adding lines to the chart.

### The tooltip component

### Everything together
