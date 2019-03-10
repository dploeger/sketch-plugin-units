var UI = require('sketch/ui')
import BrowserWindow from 'sketch-module-web-view'
var Settings = require('sketch/settings')
var Group = require('sketch/dom').Group


/**
 * Use BrowserWindow to show the settings UI
 */

export default function() {

  var document = require('sketch/dom').getSelectedDocument()
  if (!document) {
    UI.message('Please open a document')
    return;
  }

  var selection = document.selectedLayers

  if (selection.length == 0) {
    UI.message('Please select a layer')
    return;
  }

  if (selection.length > 1) {
    UI.message('Please select only one layer')
    return;
  }

  let layerWidth = selection.layers[0].frame.width
  let layerHeight = selection.layers[0].frame.height

  const units = Settings.settingForKey('units')

  const options = {
    identifier: 'units.resizeView',
    show: false,
    width: 600,
    height: 367
  }

  const browserWindow = new BrowserWindow(options)

  browserWindow.loadURL(require('../../ui/resize-view.html'))

  /**
   * Close window on UI clicks
   */
  browserWindow.webContents.on('closeView', function(s) {
    browserWindow.close()
  })

  /**
   * Resize
   */
  browserWindow.webContents.on('doResize', options => {
    browserWindow.close()
    selection.layers[0].frame.width = options.pixelWidth
    selection.layers[0].frame.height = options.pixelHeight
  })

  browserWindow.webContents.on('storeLastUnit', unit => {
    Settings.setSettingForKey('lastUnit', unit)
  })

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  browserWindow.webContents.on('did-finish-load', () => {

    if (units) {
      browserWindow.webContents.executeJavaScript(`setUnits(${JSON.stringify(units)})`)
    }

    let unit = "_none"

    if (!Settings.settingForKey('defaultUnit')) {
      Settings.setSettingForKey('defaultUnit', '_last')
      unit = "_last"
    } else {
      unit = Settings.settingForKey('defaultUnit')
    }

    if (Settings.settingForKey('lastUnit') && unit == "_last") {
      unit = Settings.settingForKey('lastUnit')
      if (!units.hasOwnProperty(unit)) {
        unit = "_none"
        Settings.setSettingForKey('lastUnit', unit)
      }
    }

    browserWindow.webContents.executeJavaScript(`setPixelWidth('${layerWidth}')`)
    browserWindow.webContents.executeJavaScript(`setPixelHeight('${layerHeight}')`)
    browserWindow.webContents.executeJavaScript(`setUnit('${unit}')`)

    browserWindow.webContents.executeJavaScript('redrawUI()')
  })
}
