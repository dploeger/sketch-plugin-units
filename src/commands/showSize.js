var UI = require('sketch/ui')
var Decimal = require('decimal.js-light')
var Settings = require('sketch/settings')

export default () => {
  var document = require('sketch/dom').getSelectedDocument()
  if (!document) {
    UI.message('Please open a document')
    return
  }

  var selection = document.selectedLayers

  if (selection.length == 0) {
    UI.message('Please select a layer')
    return
  }

  if (selection.length > 1) {
    UI.alert(
      'Only one layer supported',
      'Currently, Units only supports to resize one layer. You might want to group multiple layers to allow them to be resized by Units'
    )
    return
  }

  let layerWidth = selection.layers[0].frame.width
  let layerHeight = selection.layers[0].frame.height

  const units = Settings.settingForKey('units')

  // Calculate selected unit

  let unit = '_none'

  if (!Settings.settingForKey('defaultUnit')) {
    Settings.setSettingForKey('defaultUnit', '_last')
    unit = '_last'
  } else {
    unit = Settings.settingForKey('defaultUnit')
  }

  if (Settings.settingForKey('lastUnit') && unit == '_last') {
    unit = Settings.settingForKey('lastUnit')
    if (!units.hasOwnProperty(unit)) {
      return
    }
  }

  if (unit == '_none') {
    return
  }

  const width = new Decimal(layerWidth)
    .dividedBy(new Decimal(units[unit].dpi))
    .times(new Decimal(units[unit].factor))
    .toFixed(Number(units[unit].precision))
  const height = new Decimal(layerHeight)
    .dividedBy(new Decimal(units[unit].dpi))
    .times(new Decimal(units[unit].factor))
    .toFixed(Number(units[unit].precision))

  UI.message(`${width} x ${height} ${unit}`)
}
