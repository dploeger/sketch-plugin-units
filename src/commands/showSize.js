import { getSelection } from '../utils'
const Settings = require('sketch/settings')
const UI = require('sketch/ui')
import Decimal from 'decimal.js-light'
const DOM = require('sketch/dom')

export default function () {

  const selection = getSelection()

  if (!selection) {
    return;
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

  if (Settings.settingForKey('lastUnit') && unit === '_last') {
    unit = Settings.settingForKey('lastUnit')
    if (!units.hasOwnProperty(unit)) {
      return
    }
  }

  if (unit === '_none') {
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
