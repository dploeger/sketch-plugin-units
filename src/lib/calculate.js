/**
 * Calculate the pixel value fromn a unit value
 * @param value the unit value
 * @param dpi DPI selection
 * @param unit Unit selection
 * @return the calculated pixel value
 */
export function calculate(value, dpi, unit) {
  // calculate inch

  var returnValue = value * dpi;

  if (unit == "inch" || unit == "other") {
    return Math.round(returnValue);
  }

  // calculate cm

  if (unit == "cm") {
    return Math.round(returnValue / 2.54);
  }

  // calculate mm

  if (unit == "mm") {
    return Math.round(returnValue / 2.54 / 10);
  }
}

/**
 * Calculate the unit value from the pixel value
 * @param value the pixel value
 * @param dpi DPI selection
 * @param unit Unit selection
 * @return the calculated unit value
 */
export function calculateFromPixel(value, dpi, unit) {
  // calculate inch
  var returnValue = value / dpi;

  if (unit == "inch" || unit == "other") {
    return Math.round(returnValue);
  }

  // calculate cm

  if (unit == "cm") {
    return Math.round(returnValue * 2.54);
  }

  // calculate mm

  if (unit == "mm") {
    return Math.round(returnValue * 2.54 * 10);
  }
}
