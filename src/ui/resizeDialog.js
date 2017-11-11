/**
 * Resize UI
 */

import {
  MochaJSDelegate
}
from '../lib/MochaJSDelegate.js';

import {
  createLabel,
  createInput
}
from './dialog.js';

import {
  calculate,
  calculateFromPixel
}
from '../lib/calculate.js'

/**
 * Create the resize Dialog
 * @param context Sketch app context
 * @return object containing the alert, the width and height inputs
 */
export function createResizeDialog(context) {
  let userDefaults = NSUserDefaults.alloc().initWithSuiteName(
    'de.dieploegers.resize');
  let alert = COSAlertWindow.new();

  //alert.setIcon(NSImage.alloc().initByReferencingFile(plugin.urlForResourceNamed(
  //  "rectangle@2x.png").path()));
  alert.setMessageText("Resize selection with units")


  // Creating dialog buttons
  alert.addButtonWithTitle("Ok");
  alert.addButtonWithTitle("Cancel");

  // Creating the view
  let viewWidth = 300;
  let viewHeight = 80;

  // Settings
  let dpi = userDefaults.objectForKey('dpi');
  let unit = userDefaults.objectForKey('unit');

  let view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth,
    viewHeight));
  alert.addAccessoryView(view);

  view.addSubview(createLabel(0, viewHeight - 20, 150, 20, "Width"));
  view.addSubview(createLabel(150, viewHeight - 20, 150, 20, "Height"));

  let widthPixel = createLabel(0, viewHeight - 60, 150, 20, "0px");
  widthPixel.textColor = NSColor.colorWithGray(0.5);
  view.addSubview(widthPixel);

  let widthInput = createInput(0, viewHeight - 40, 100, 20, "");
  let calcWidthDelegate = new MochaJSDelegate();
  calcWidthDelegate.setHandlerForSelector('control:textShouldEndEditing:', () => {
    widthPixel.setStringValue(calculate(widthInput.stringValue(), dpi, unit) +
      "px");

  });

  widthInput.setDelegate(calcWidthDelegate.getClassInstance());
  view.addSubview(widthInput);
  view.addSubview(createLabel(100, viewHeight - 40, 50, 20, userDefaults.objectForKey(
    'unit')));

  let heightPixel = createLabel(150, viewHeight - 60, 150, 20, "0px");
  view.addSubview(heightPixel);
  heightPixel.textColor = NSColor.colorWithGray(0.5);

  let heightInput = createInput(150, viewHeight - 40, 100, 20, "");
  let calcHeightDelegate = new MochaJSDelegate();
  calcHeightDelegate.setHandlerForSelector('control:textShouldEndEditing:', () => {

    heightPixel.setStringValue(calculate(heightInput.stringValue(), dpi,
      unit) + "px");

  });
  heightInput.setDelegate(calcHeightDelegate.getClassInstance());
  view.addSubview(heightInput);
  view.addSubview(createLabel(250, viewHeight - 40, 50, 20, userDefaults.objectForKey(
    'unit')));

  // set values, if we have a selection

  if (context.selection.length == 1) {
    widthPixel.setStringValue(context.selection[0].frame().width() + "px");
    heightPixel.setStringValue(context.selection[0].frame().height() + "px");
    widthInput.setStringValue(
      calculateFromPixel(
        context.selection[0].frame().width(),
        dpi,
        unit
      )
    );
    heightInput.setStringValue(
      calculateFromPixel(
        context.selection[0].frame().height(),
        dpi,
        unit
      )
    );
  }

  // Show the dialog
  return {
    alert: alert,
    heightInput: heightInput,
    widthInput: widthInput
  };
}
