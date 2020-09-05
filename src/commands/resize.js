import BrowserWindow from 'sketch-module-web-view'
import { getSelection } from '../utils'
const Settings = require('sketch/settings')
const UI = require('sketch/ui')

/**
 * Resize layer command
 */
export default function () {

  const selection = getSelection()

  if (!selection) {
    return;
  }

  let layerWidth = selection.layers[0].frame.width
  let layerHeight = selection.layers[0].frame.height

  const units = Settings.settingForKey('units')

  // Setup Browserwindow

  const options = {
    identifier: 'units.resizeView',
    show: false,
    width: 600,
    height: 367,
  }

  const browserWindow = new BrowserWindow(options)

  browserWindow.loadURL(require('../../ui/resize-view.html'))

  // Close window on UI clicks

  browserWindow.webContents.on('closeView', () => {
    browserWindow.close()
  })

  // Resize
  browserWindow.webContents.on('doResize', options => {
    browserWindow.close()
    selection.layers[0].frame.width = options.pixelWidth
    selection.layers[0].frame.height = options.pixelHeight
  })

  // Store currently selected unit as the last selected unit
  browserWindow.webContents.on('storeLastUnit', unit => {
    Settings.setSettingForKey('lastUnit', unit)
  })

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  browserWindow.webContents.on('did-finish-load', () => {
    // Set pixel sizes of layer
    browserWindow.webContents.executeJavaScript(`setPixelWidth('${layerWidth}')`)
    browserWindow.webContents.executeJavaScript(`setPixelHeight('${layerHeight}')`)

    if (units) {
      // Set units
      browserWindow.webContents.executeJavaScript(`setUnits(${JSON.stringify(units)})`)
    }

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
        unit = '_none'
        Settings.setSettingForKey('lastUnit', unit)
      }
    }
    browserWindow.webContents.executeJavaScript(`setUnit('${unit}')`)

    browserWindow.webContents.executeJavaScript('redrawUI()')
  })
}
