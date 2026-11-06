/** Match a Three.js curve's arc-length coordinate to the scroll range. */
export function createScrollPathMapping(curve, scrollRange, arcLengthDivisions = 2048) {
  const range = Number.isFinite(scrollRange) ? Math.max(0, scrollRange) : 0;
  // Arc-length sampling accounts for curved geometry, not just endpoint separation.
  // The current LineCurve3 is exact; curved replacements use this numerical lookup.
  curve.arcLengthDivisions = arcLengthDivisions;
  curve.updateArcLengths();
  const sourceLength = curve.getLength();
  const usable = Number.isFinite(sourceLength) && sourceLength > 0;
  const pathScale = usable ? range / sourceLength : 0;
  const projectionScale = pathScale > 0 ? 1 / pathScale : 0;
  const origin = curve.getPointAt(0);

  return {
    sourceLength,
    scrollRange: range,
    pathLength: usable ? range : 0,
    pathScale,
    projectionScale,
    sample(scrollOffset, target) {
      const offset = Number.isFinite(scrollOffset) ? scrollOffset : 0;
      const distance = usable ? Math.max(0, Math.min(offset, range)) : 0;
      const progress = range > 0 ? distance / range : 0;
      // getPointAt uses arc-length progress; getPoint would give uneven speed on curves.
      const point = curve.getPointAt(progress, target).sub(origin).multiplyScalar(pathScale);
      return {
        point,
        distance,
        progress,
        // A bounded viewport path cannot also span thousands of CSS pixels.
        // Scale path units to the scroll range, then project back to retain the corner stop.
        x: point.x * projectionScale,
        y: point.y * projectionScale,
      };
    },
  };
}
