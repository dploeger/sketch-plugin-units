var UI = require('sketch/ui')
import BrowserWindow from 'sketch-module-web-view'
var Settings = require('sketch/settings')

/**
 * Use BrowserWindow to show the settings UI
 */

export default function() {
  const options = {
    identifier: 'units.resizeView',
    frame: false,
    show: false,
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
   * Apply resize
   */
  browserWindow.webContents.on('apply', function(settings) {
    browserWindow.close()
  })

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })
}
