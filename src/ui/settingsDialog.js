/**
 * Settings UI
 */

import {
  calculate,
  calculateFromPixel
}
from '../lib/calculate.js';

import {
  createLabel,
  createInput,
  createDropdown
}
from './dialog.js';

/**
 * Create the settings Dialog
 * @param context Sketch app context
 * @return object containing the alert, the unit and dpi inputs
 */
export function createSettingsDialog(context) {
  let userDefaults = NSUserDefaults.alloc().initWithSuiteName(
    'de.dieploegers.resize');
  let alert = COSAlertWindow.new();

  //alert.setIcon(NSImage.alloc().initByReferencingFile(plugin.urlForResourceNamed(
  //  "rectangle@2x.png").path()));
  alert.setMessageText("Settings")


  // Creating dialog buttons
  alert.addButtonWithTitle("Ok");
  alert.addButtonWithTitle("Cancel");

  // Creating the view
  let viewWidth = 300;
  let viewHeight = 100;

  let view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth,
    viewHeight));
  alert.addAccessoryView(view);

  view.addSubview(createLabel(0, viewHeight - 20, 100, 20, "Unit"));
  let unitDropDown = createDropdown(100, viewHeight - 20, 150, 20, ["inch",
    "cm",
    "mm"
  ]);
  unitDropDown.selectItemWithTitle(userDefaults.objectForKey('unit'));
  view.addSubview(unitDropDown);

  view.addSubview(createLabel(0, viewHeight - 40, 100, 20, "DPI"));
  let dpiInput = createInput(100, viewHeight - 40, 150, 20, userDefaults.objectForKey(
    'dpi'));
  view.addSubview(dpiInput);

  let dpiHint = createLabel(0, viewHeight - 100, 300, 60,
    "Hint: If you want to export a vector file (e.g. PDF), set this to 72. If you're exporting to an image, set it to 300."
  );
  dpiHint.textColor = NSColor.colorWithGray(0.5);
  view.addSubview(dpiHint);

  // Show the dialog
  return {
    alert: alert,
    unit: unitDropDown,
    dpi: dpiInput
  };
}
