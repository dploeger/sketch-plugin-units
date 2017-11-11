export function calculate(value, dpi, unit) {
  // calculate inch

  var returnValue = value * dpi;

  if (unit == "inch") {
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

export function calculateFromPixel(value, dpi, unit) {
  // calculate inch
  var returnValue = value / dpi;

  if (unit == "inch") {
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
