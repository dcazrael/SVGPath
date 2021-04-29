# SVG Path

## utilities to generate svg paths

## usage

```js
import SVGPaths from 'svg-paths
let path = new SVGPath();

path.moveTo(10, 25)
  .lineTo(10, 75)
  .lineTo(60, 75)
  .lineTo(10, 25)
  .end();

console.log(path) // M10 25 L10 75 L60 75 L10 25

```

to use relative coordinates, call `.relative()` before any method

e.g.

```js
import SVGPaths from 'svg-paths
let path = new SVGPath();

path.moveTo(10, 25)
  .relative()
  .lineTo(0, 50)
  .relative()
  .lineTo(50, 0)
  .relative()
  .lineTo(-50, -50)
  .end();

console.log(path); // M10 25 l0 50 l50 0 l-50 -50
```

both paths are equivalent.

## methods

### svg path methods

- `moveTo(x, y)`
  - Sets the start position of the path to specify where the drawing should begin
  - Accepts X and Y coordinates; multiple sets of coordinates can be provided
- `lineTo(x, y)`
  - Draws a straight line to the absolute coordinates x,y from the current position  
    If relative draws a straight line to a point that is relatively right x and down y (or left and up if negative values)
  - Accepts X and Y coordinates; multiple sets of coordinates can be provided
- `horizontalLineTo(x)`
  - Draws a line horizontally to the exact coordinate x from the current position  
    If relative draws a straight line to a point that is relatively right x and down y (or left and up if negative values)
  - Accepts X and Y coordinates; multiple sets of coordinates can be provided
- `verticalLineTo(y)`
  - Draws a line vertically to the exact coordinate y from the current position  
    If relative draws a line vertically relatively down y (or up if a negative value)
  - Expects Y coordinate
- `curveTo(x1, y1, x2, y2, x, y)`

  - Draws a bézier curve based on two bézier control points and end at specified coordinates  
    If relative does the same with all relative values

  - Expects cX1,cY1 cX2,cY2 eX,eY coordinates; multiple sets of coordinates can be provided  
    The points marked with 'c' are the control points, while the points marked with 'e' are the end points

- `smoothCurveTo(x2, y2, x, y)`

  - Similar to the C command. It assumes the first bézier control point is a reflection of the last bézier point used in the previous S or C command  
    If relative does the same with all relative values
  - Expects cX2,cY2 eX,eY coordinates  
    The points marked with 'c' are the control points, while the points marked with 'e' are the end points

- `bezierCurveTo(x1, y1, x, y)`

  - Draws a bézier curve based a single bézier control point and end at specified coordinates  
    If relative does the same with all relative values
  - Expects cX,cY eX,eY coordinates; multiple sets of coordinates can be provided.  
    The points marked with 'c' are the control points, while the points marked with 'e' are the end points

- `smoothBezierCurveTo(x, y)`

  - Similar to the Q command. It assumes the first bézier control point is a reflection of the last bézier point used in the previous Q or T command  
    If relative does the same with all relative values
  - Expects eX,eY coordinates; multiple sets of coordinates can be provided.  
    The points marked with 'e' are the end points

- `ellipticalArc(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y)`

  - Draws an arc that is based on the curve an oval makes.
  - First define the width and height of the oval via the radii. Next declare the rotation of the oval.  
    Along with the end point, this makes two possible ovals.  
    So the arc and sweep are either 0 or 1 and determine which oval and which path it will take.
  - Expects rX,rY, xAxisRotation, largeArcFlag, sweepFlag, eX,eY coordinates  
    The points marked with 'r' are the radii, while the points marked with 'e' are the end points

- `close()`
  - Draws a straight line back to the start of the path, thus closing the current path
  - Relative won't effect this

### other methods

- `.relative()`

  - Sets the 'relative' flag for the next command.  
    With this the next command will use relative values instead of absolutes

- `.end()`
  - Converts Path to a string and trims whitespace.  
    This also gets called on the `.toString()` method

## license

MIT
