import {
  createResizeDialog
}
from '../ui/resizeDialog.js';

import {
  initVars
}
from '../base.js';

/**
 * Open the settings dialog
 * @param context The Sketch app context
 */
export default function(context) {
  initVars(context);
  let dialog = createSettingsDialog(context, userDefaults);
  let response = dialog.alert.runModal();
  if (response == "1000") {
    userDefaults.setObject_forKey(dialog.dpi.stringValue(), 'dpi');
    userDefaults.setObject_forKey(dialog.unit.titleOfSelectedItem(), 'unit');
    userDefaults.synchronize();
  }
}
