var UI = require("sketch/ui");
import BrowserWindow from "sketch-module-web-view";
var Settings = require("sketch/settings");

export default function() {
  const options = {
    identifier: "units.settingsView",
    frame: false,
    show: false
  };

  const browserWindow = new BrowserWindow(options);

  browserWindow.loadURL(require("../../ui/settings-view.html"));
  browserWindow.webContents.on("closeSettings", function(s) {
    browserWindow.close();
  });
  browserWindow.webContents.on("saveSettings", function(items) {
    Settings.setSettingForKey("units", items);
    browserWindow.close();
  });
  browserWindow.webContents.executeJavaScript("hideErrorMessage()");

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
