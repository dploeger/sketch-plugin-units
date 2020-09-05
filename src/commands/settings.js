import BrowserWindow from 'sketch-module-web-view'
const Settings = require('sketch/settings')

/**
 * Units plugin settings
 */
export default function () {
  // Setup BrowserWindow

  const options = {
    identifier: 'units.settingsView',
    show: false,
    height: 606,
  }

  const browserWindow = new BrowserWindow(options)

  browserWindow.loadURL(require('../../ui/settings-view.html'))

  /**
   * Close window on UI clicks
   */
  browserWindow.webContents.on('closeSettings', () => {
    browserWindow.close()
  })

  /**
   * Save settings
   */
  browserWindow.webContents.on('saveSettings', settings => {
    Settings.setSettingForKey('units', settings.units)
    Settings.setSettingForKey('defaultUnit', settings.defaultUnit)
    browserWindow.close()
  })

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  browserWindow.webContents.on('did-finish-load', () => {
    /**
     * Hide the error message on startup
     */
    browserWindow.webContents.executeJavaScript('hideErrorMessage()')

    /**
     * Load the existing units
     */
    if (!Settings.settingForKey('units')) {
      // Set default units
      Settings.setSettingForKey('units', {
        'cm (PDF)': { unitName: 'cm (PDF)', dpi: '72', factor: '2.54', precision: '2' },
        'cm (Image)': { unitName: 'cm (Image)', dpi: '300', factor: '2.54', precision: '2' },
        'Inch (Image)': { unitName: 'Inch (Image)', dpi: '300', factor: '1', precision: '2' },
        'Inch (PDF)': { unitName: 'Inch (PDF)', dpi: '72', factor: '1', precision: '2' },
      })
    }
    browserWindow.webContents.executeJavaScript(`setUnits(${JSON.stringify(Settings.settingForKey('units'))})`)

    // Set the default unit

    if (!Settings.settingForKey('defaultUnit')) {
      Settings.setSettingForKey('defaultUnit', '_last')
    }

    browserWindow.webContents.executeJavaScript(`setDefaultUnit('${Settings.settingForKey('defaultUnit')}')`)

    browserWindow.webContents.executeJavaScript('redrawUI()')
  })
}
