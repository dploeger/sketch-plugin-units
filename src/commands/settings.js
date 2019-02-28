var UI = require("sketch/ui");
import BrowserWindow from "sketch-module-web-view";
var Settings = require("sketch/settings");

/**
 * Use BrowserWindow to show the settings UI
 */

export default function() {
  const options = {
    identifier: "units.settingsView",
    frame: false,
    show: false
  };

  const browserWindow = new BrowserWindow(options);

  browserWindow.loadURL(require("../../ui/settings-view.html"));

  /**
   * Close window on UI clicks
   */
  browserWindow.webContents.on("closeSettings", function(s) {
    browserWindow.close();
  });

  /**
   * Save settings
   */
  browserWindow.webContents.on("saveSettings", function(items) {
    Settings.setSettingForKey("units", items);
    browserWindow.close();
  });

  /**
   * Hide the error message on startup
   */
  browserWindow.webContents.executeJavaScript("hideErrorMessage()");

  /**
   * Load the existing units
   */
  if (Settings.settingForKey("units")) {
    Settings.settingForKey("units").forEach(function(unit) {
      browserWindow.webContents.executeJavaScript(
        "addUnit(" + JSON.stringify(unit) + ")"
      );
    });
  }

  browserWindow.once("ready-to-show", () => {
    browserWindow.show();
  });
}
