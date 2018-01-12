/**
 * Settings UI
 */

import {
  MochaJSDelegate
}
from '../lib/MochaJSDelegate.js';

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

  // dataSource = new MochaJSDelegate()
  // dataSource.setHandlerForSelector("numberOfRowsInTableView:", function(
  //   tableView) {
  //   return 10
  // })
  //
  // delegate = new MochaJSDelegate()
  // delegate.setHandlerForSelector("tableView:objectValueForTableColumn:row:",
  //   function(tableView, column, row) {
  //     return "hello"
  //   })
  //
  // view.addSubview(createTable(0, 0, 100, 20, delegate, dataSource))

  view.addSubview(createLabel(0, viewHeight - 20, 100, 20, "Unit"));
  let unitDropDown = createDropdown(100, viewHeight - 20, 150, 20, ["inch",
    "cm",
    "mm",
    "other"
  ]);
  unitDropDown.selectItemWithTitle(userDefaults.objectForKey('unit'));
  view.addSubview(unitDropDown);

  view.addSubview(createLabel(0, viewHeight - 40, 100, 20, "Scale"));
  let dpiInput = createInput(100, viewHeight - 40, 150, 20, userDefaults.objectForKey(
    'dpi'));
  view.addSubview(dpiInput);

  let dpiHint = createLabel(0, viewHeight - 100, 300, 60,
    "Hint: Common values are 72 for a PDF or 300 for a print-ready image."
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
