import {
  createSettingsDialog
}
from '../ui/dialog.js';

import {
  initVars
}
from '../base.js';

export default function onRun(context) {
  var userDefaults = initVars(context);
  let dialog = createSettingsDialog(context, userDefaults);
  let response = dialog.alert.runModal();
  if (response == "1000") {
    userDefaults.setObject_forKey(dialog.dpi.stringValue(), 'dpi');
    userDefaults.setObject_forKey(dialog.unit.titleOfSelectedItem(), 'unit');
    userDefaults.synchronize();
  }
}
