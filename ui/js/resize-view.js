/**
 * Resize view functions
 */

let unit = ''
let pixelWidth = 0
let pixelHeight = 0

/**
 * Set the  unit
 * @param {string} pUnit Unit to set
 */
window.setUnit = pUnit => {
  unit = pUnit
  storeLastUnit()
  calculateSize()
}

window.storeKeepAspectRatio = checked => {
  window.postMessage('storeKeepAspectRatio', checked)
}

/**
 * Set the pixel width
 */
window.setPixelWidth = width => {
  pixelWidth = width
}

/**
 * Set the pixel height
 */
window.setPixelHeight = height => {
  pixelHeight = height
}

/**
 * Redraw the UI
 */
window.redrawUI = () => {
  $('#unitSelect option').remove()

  // Redraw the unit selection
  for (let unitName of ['_none'].concat(Object.keys(units))) {
    let description = unitName

    if (unitName === '_none') {
      description = 'None'
    }

    let selected = ''

    if (unitName === unit) {
      selected = ' selected'
    }

    $('#unitSelect').append(`<option value="${unitName}"${selected}>${description}</option>`)
  }

  $('#unitSelect').focus()
}

/**
 * Return the currently selected unit or defaults for the "_none" unit
 */
getCurrentUnit = () => {
  if (unit === '_none') {
    return {
      dpi: 1,
      factor: 1,
      precision: 0,
    }
  } else {
    return units[unit]
  }
}

/**
 * Set the checked state of the "keep aspect ratio" field
 * @param checked
 */
setKeepAspectRatioSelected = (checked) => {
  $('#keepAspectRatio').get(0).checked = checked
}

/**
 * Calculate the aspect ratio of the layer
 */
getAspectRatio = () => {
  return new Decimal(pixelHeight).dividedBy(new Decimal(pixelWidth)).toFixed(Number(getCurrentUnit().precision))
}

/**
 * Set the width to a new value, recalculate the pixel width and optionally
 * set the height if aspect ratio should be kept
 */
setWidth = width => {
  const ratio = getAspectRatio()
  pixelWidth = new Decimal(width)
    .dividedBy(new Decimal(getCurrentUnit().factor))
    .times(new Decimal(getCurrentUnit().dpi))
    .toInteger()
  if ($('#keepAspectRatio').get(0).checked) {
    pixelHeight = pixelWidth.times(ratio).toInteger()
  }
  calculateSize()
}

/**
 * Set the height to a new value, recalculate the pixel height and optionally
 * set the width if aspect ratio should be kept
 */
setHeight = height => {
  const ratio = getAspectRatio()
  pixelHeight = new Decimal(height)
    .dividedBy(new Decimal(getCurrentUnit().factor))
    .times(new Decimal(getCurrentUnit().dpi))
    .toInteger()
  if ($('#keepAspectRatio').get(0).checked) {
    pixelWidth = pixelHeight.dividedBy(ratio).toInteger()
  }
  calculateSize()
}

/**
 * Calculate the width and height based on the selected unit and the original pixel width and height
 */
calculateSize = () => {
  let width = new Decimal(pixelWidth)
  let height = new Decimal(pixelHeight)

  width = width.dividedBy(new Decimal(getCurrentUnit().dpi)).times(new Decimal(getCurrentUnit().factor))
  height = height.dividedBy(new Decimal(getCurrentUnit().dpi)).times(new Decimal(getCurrentUnit().factor))

  $('#width').val(width.toFixed(Number(getCurrentUnit().precision)))
  $('#height').val(height.toFixed(Number(getCurrentUnit().precision)))

  $('#pixelWidth').text(pixelWidth)
  $('#pixelHeight').text(pixelHeight)
}

/**
 * Call the plugin to store the current settings
 */
doResize = () => {
  window.postMessage('doResize', { pixelWidth: pixelWidth, pixelHeight: pixelHeight })
}

/**
 * Store the currently selected unit as the last selected unit
 */
storeLastUnit = () => {
  window.postMessage('storeLastUnit', unit)
}
