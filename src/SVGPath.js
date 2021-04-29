export default class SVGPath {
  constructor(path) {
    if (!(this instanceof SVGPath)) {
      return new SVGPath(path);
    }

    this.currentPath = path || '';
    this.isRelative = false;
  }

  /**
   * Sets the start position of the path to specify where the drawing should begin
   *
   * Accepts X and Y coordinates; multiple sets of coordinates can be provided
   *
   *
   * @returns this
   */
  moveTo() {
    this._appendToPath('M', arguments);
    return this;
  }

  /**
   * Draws a straight line to the absolute coordinates x,y from the current position
   * If relative draws a straight line to a point that is relatively right x and down y
   * (or left and up if negative values)
   *
   * Accepts X and Y coordinates; multiple sets of coordinates can be provided
   * @returns this
   */
  lineTo() {
    this._appendToPath('L', arguments);
    return this;
  }

  /**
   * Draws a line horizontally to the exact coordinate x from the current position
   * If relative draws a line horizontally relatively to the right x
   * (or to the left if a negative value)
   *
   * Expects X coordinate
   * @param {*} y
   * @returns this
   */
  horizontalLineTo(x) {
    this._appendToPath('H', x);
    return this;
  }

  /**
   * Draws a line vertically  to the exact coordinate y from the current position
   * If relative draws a line vertically relatively down y
   * (or up if a negative value)
   *
   * Expects Y coordinate
   * @param {*} y
   * @returns this
   */
  verticalLineTo(y) {
    this._appendToPath('V', y);
    return this;
  }

  /**
   * Draws a bézier curve based on two bézier control points and end at specified coordinates
   * If relative does the same with all relative values
   *
   * Expects cX1,cY1 cX2,cY2 eX,eY coordinates; multiple sets of coordinates can be provided
   * The points marked with 'c' are the control points, while the points marked with 'e' are the end points
   * @returns this
   */
  curveTo() {
    this._appendToPath('C', arguments);
    return this;
  }

  /**
   * Similar to the C command. It assumes the first bézier control point is a reflection of the
   * last bézier point used in the previous S or C command
   * If relative does the same with all relative values
   *
   * Expects cX2,cY2 eX,eY coordinates
   * The points marked with 'c' are the control points, while the points marked with 'e' are the end points
   * @returns this
   */
  smoothCurveTo() {
    this._appendToPath('S', arguments);
    return this;
  }

  /**
   * Draws a bézier curve based a single bézier control point and end at specified coordinates
   * If relative does the same with all relative values
   *
   * Expects cX,cY eX,eY coordinates; multiple sets of coordinates can be provided.
   * The points marked with 'c' are the control points, while the points marked with 'e' are the end points
   * @returns this
   */
  bezierCurveTo() {
    this._appendToPath('Q', arguments);
    return this;
  }

  /**
   * Similar to the Q command. It assumes the first bézier control point is a reflection of the
   * last bézier point used in the previous Q or T command
   * If relative does the same with all relative values
   *
   * Expects eX,eY coordinates; multiple sets of coordinates can be provided.
   * The points marked with 'e' are the end points
   * @returns this
   */
  smoothBezierCurveTo() {
    this._appendToPath('T', arguments);
    return this;
  }

  /**
   * Draws an arc that is based on the curve an oval makes.
   * First define the width and height of the oval via the radii. Next declare the rotation of the oval.
   * Along with the end point, this makes two possible ovals.
   * So the arc and sweep are either 0 or 1 and determine which oval and which path it will take.
   *
   * Expects rX,rY, xAxisRotation, largeArcFlag, sweepFlag, eX,eY coordinates
   * The points marked with 'r' are the radii, while the points marked with 'e' are the end points
   * @returns this
   */
  ellipticalArc() {
    this._appendToPath('A', arguments);
    return this;
  }

  /**
   * Draws a straight line back to the start of the path, thus closing the current path
   * Relative won't effect this
   * @returns this
   */
  close() {
    this._appendToPath('Z', []);
    return this;
  }

  /**
   * Sets the 'relative' flag for the next command.
   * With this the next command will use relative values instead of absolutes
   * @returns this
   */
  relative() {
    this.isRelative = true;
    return this;
  }

  /**
   * Converts Path to a string.
   * @returns String
   */
  end() {
    return this.currentPath.trim();
  }

  /**
   * Converts Path to a string.
   * @returns String
   */
  toString() {
    return this.end();
  }

  /**
   * Appends new values to the current path.
   * If relative is set, converts the symbol to lowercase
   * @param {*} symbol
   * @param {*} args
   */
  _appendToPath(symbol, args) {
    const coordinates = [...args].join(' ');
    if (this.isRelative) {
      symbol = symbol.toLowerCase();
      this.isRelative = false;
    }

    this.currentPath += ' ' + symbol + coordinates;
  }
}
