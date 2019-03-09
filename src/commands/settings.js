var UI = require('sketch/ui')
import BrowserWindow from 'sketch-module-web-view'
var Settings = require('sketch/settings')

/**
 * Use BrowserWindow to show the settings UI
 */

export default function() {
  const options = {
    identifier: 'units.settingsView',
    frame: false,
    show: false,
  }

  const browserWindow = new BrowserWindow(options)

  browserWindow.loadURL(require('../../ui/settings-view.html'))

  /**
   * Close window on UI clicks
   */
  browserWindow.webContents.on('closeSettings', function(s) {
    browserWindow.close()
  })

  /**
   * Save settings
   */
  browserWindow.webContents.on('saveSettings', function(settings) {
    Settings.setSettingForKey('units', settings.units)
    Settings.setSettingForKey('defaultUnit', settings.defaultUnit)
    browserWindow.close()
  })

  browserWindow.webContents.on('did-finish-load', () => {
    /**
     * Hide the error message on startup
     */
    browserWindow.webContents.executeJavaScript('hideErrorMessage()')

    /**
     * Load the existing units
     */
    if (Settings.settingForKey('units')) {
      browserWindow.webContents.executeJavaScript(`setUnits(${JSON.stringify(Settings.settingForKey('units'))})`)
    }

    if (!Settings.settingForKey('defaultUnit')) {
      Settings.setSettingForKey('defaultUnit', '_last')
    }

    browserWindow.webContents.executeJavaScript(`setDefaultUnit('${Settings.settingForKey('defaultUnit')}')`)

    browserWindow.webContents.executeJavaScript('redrawUI()')
  })

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })
}
