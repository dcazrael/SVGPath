import SVGPath from './src/SVGPath';

/** move pointer */
test('should move pointer to X20 Y 40', () => {
  const Path = new SVGPath();

  //test
  const move = Path.moveTo(20, 40);
  expect(move.currentPath).toBe(' M20 40');
});

/** draw line */
test('should draw line to X10 Y10', () => {
  const Path = new SVGPath();
  let drawLine = Path.moveTo(0, 0);

  //test
  drawLine = Path.lineTo(10, 10);
  expect(drawLine.currentPath).toBe(' M0 0 L10 10');
});

/** draw horizontal line */
test('should draw horizontal line from X0 Y1 to X5 Y1', () => {
  const Path = new SVGPath();
  let drawHorizontalLine = Path.moveTo(0, 0);
  drawHorizontalLine = Path.lineTo(0, 1);

  //test
  drawHorizontalLine = Path.horizontalLineTo(5);
  expect(drawHorizontalLine.currentPath).toBe(' M0 0 L0 1 H5');
});

/** draw vertical line */
test('should draw vertical line from X1 Y0 to X1 Y5', () => {
  const Path = new SVGPath();
  let drawVerticalLine = Path.moveTo(0, 0);
  drawVerticalLine = Path.lineTo(1, 0);

  //test
  drawVerticalLine = Path.verticalLineTo(5);
  expect(drawVerticalLine.currentPath).toBe(' M0 0 L1 0 V5');
});

/** draw cubic bezier curve */
test('should draw cubic bezier curve from X0 Y0 to X5 Y0', () => {
  const Path = new SVGPath();
  let drawCurve = Path.moveTo(0, 0);

  //test
  drawCurve = Path.curveTo(0, 5, 5, 5, 5, 0);
  expect(drawCurve.currentPath).toBe(' M0 0 C0 5 5 5 5 0');
});

/** draw smooth cubic bezier curve based on previous control point */
test('should draw smooth cubic bezier curve from X0, Y0 to X5 Y0 based on previous control point', () => {
  const Path = new SVGPath();
  let drawSmoothCurve = Path.moveTo(0, 0);
  drawSmoothCurve = Path.curveTo(0, 0, 1, 1, 2, 0);

  //test
  drawSmoothCurve = Path.smoothCurveTo(4, 1, 5, 0);
  expect(drawSmoothCurve.currentPath).toBe(' M0 0 C0 0 1 1 2 0 S4 1 5 0');
});

/** draw quadratic bezier curve based on a single control point */
test('draw quadratic bezier curve from X0, Y0 to X4 Y0 based on single control point', () => {
  const Path = new SVGPath();
  let drawQuadraticBezierCurve = Path.moveTo(0, 0);
  drawQuadraticBezierCurve = Path.quadraticCurveTo(2, 2, 4, 0);

  //test
  expect(drawQuadraticBezierCurve.currentPath).toBe(' M0 0 Q2 2 4 0');
});

/** draw quadratic bezier curve based on a previous control point */
test('draw quadratic bezier curve from X0, Y0 to X4 Y0 based on single control point', () => {
  const Path = new SVGPath();
  let drawQuadraticBezierCurve = Path.moveTo(0, 0);
  drawQuadraticBezierCurve = Path.quadraticCurveTo(2, 2, 4, 0);

  //test
  drawQuadraticBezierCurve = Path.smoothQuadraticCurveTo(8, 0);
  expect(drawQuadraticBezierCurve.currentPath).toBe(' M0 0 Q2 2 4 0 T8 0');
});

/** draw arc */
test('draw arc', () => {
  const Path = new SVGPath();
  let drawArc = Path.moveTo(20, 10);

  //test
  drawArc = Path.ellipticalArc(5, 5, 0, 0, 0, 10, 5);
  expect(drawArc.currentPath).toBe(' M20 10 A5 5 0 0 0 10 5');
});

/** draw triangle and close path */
test('draw triangle with closed path', () => {
  const Path = new SVGPath();

  //test
  const triangle = Path.moveTo(2, 4).lineTo(4, 0, 6, 4).close();
  expect(triangle.currentPath).toBe(' M2 4 L4 0 6 4 Z');
});

/** draw heart and close path */
test('draw triangle with closed path', () => {
  const Path = new SVGPath();

  //test
  const triangle = Path.moveTo(10, 10)
    .curveTo(7, 7, 0, 0, 5, -5)
    .relative()
    .curveTo(0, 0, 2.5, -2.5, 5, 2)
    .relative()
    .curveTo(0, 0, 2, -4, 5, -2)
    .relative()
    .curveTo(0, 0, 7.5, 5, -5, 15)
    .close();
  expect(triangle.currentPath).toBe(
    ' M10 10 C7 7 0 0 5 -5 c0 0 2.5 -2.5 5 2 c0 0 2 -4 5 -2 c0 0 7.5 5 -5 15 Z'
  );
});
