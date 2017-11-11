import {
  MochaJSDelegate
}
from '../lib/MochaJSDelegate.js';

import {
  calculate,
  calculateFromPixel
}
from '../lib/calculate.js';

function createLabel(x, y, width, height, text) {
  var label = NSTextField.alloc().initWithFrame(
    NSMakeRect(x, y, width, height)
  );
  label.setStringValue(text);
  label.setSelectable(false);
  label.setEditable(false);
  label.setBezeled(false);
  label.setDrawsBackground(false);
  return label;
}

function createInput(x, y, width, height, value) {
  var input = NSTextField.alloc().initWithFrame(
    NSMakeRect(x, y, width, height)
  );
  input.setStringValue(value);
  return input;
}

function createDropdown(x, y, width, height, options) {
  var dropdown = NSPopUpButton.alloc().initWithFrame(
    NSMakeRect(x, y, width, height)
  );

  for (let option of options) {
    dropdown.addItemWithTitle(option)
  }

  return dropdown;
}

export function createResizeDialog(context, userDefaults) {
  var alert = COSAlertWindow.new();

  //alert.setIcon(NSImage.alloc().initByReferencingFile(plugin.urlForResourceNamed(
  //  "rectangle@2x.png").path()));
  alert.setMessageText("Resize selection with units")


  // Creating dialog buttons
  alert.addButtonWithTitle("Ok");
  alert.addButtonWithTitle("Cancel");

  // Creating the view
  var viewWidth = 300;
  var viewHeight = 80;

  // Settings
  var dpi = userDefaults.objectForKey('dpi');
  var unit = userDefaults.objectForKey('unit');

  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth,
    viewHeight));
  alert.addAccessoryView(view);

  view.addSubview(createLabel(0, viewHeight - 20, 150, 20, "Width"));
  view.addSubview(createLabel(150, viewHeight - 20, 150, 20, "Height"));

  var widthPixel = createLabel(0, viewHeight - 60, 150, 20, "0px");
  widthPixel.textColor = NSColor.colorWithGray(0.5);
  view.addSubview(widthPixel);

  var widthInput = createInput(0, viewHeight - 40, 100, 20, "");
  var calcWidthDelegate = new MochaJSDelegate();
  calcWidthDelegate.setHandlerForSelector('control:textShouldEndEditing:',
    function() {

      widthPixel.setStringValue(calculate(widthInput.stringValue(), dpi, unit) +
        "px");

    });

  widthInput.setDelegate(calcWidthDelegate.getClassInstance());
  view.addSubview(widthInput);
  view.addSubview(createLabel(100, viewHeight - 40, 50, 20, userDefaults.objectForKey(
    'unit')));

  var heightPixel = createLabel(150, viewHeight - 60, 150, 20, "0px");
  view.addSubview(heightPixel);
  heightPixel.textColor = NSColor.colorWithGray(0.5);

  var heightInput = createInput(150, viewHeight - 40, 100, 20, "");
  var calcHeightDelegate = new MochaJSDelegate();
  calcHeightDelegate.setHandlerForSelector('control:textShouldEndEditing:',
    function() {

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

export function createSettingsDialog(context, userDefaults) {
  var alert = COSAlertWindow.new();

  //alert.setIcon(NSImage.alloc().initByReferencingFile(plugin.urlForResourceNamed(
  //  "rectangle@2x.png").path()));
  alert.setMessageText("Settings")


  // Creating dialog buttons
  alert.addButtonWithTitle("Ok");
  alert.addButtonWithTitle("Cancel");

  // Creating the view
  var viewWidth = 300;
  var viewHeight = 100;

  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth,
    viewHeight));
  alert.addAccessoryView(view);

  view.addSubview(createLabel(0, viewHeight - 20, 100, 20, "Unit"));
  var unitDropDown = createDropdown(100, viewHeight - 20, 150, 20, ["inch",
    "cm",
    "mm"
  ]);
  unitDropDown.selectItemWithTitle(userDefaults.objectForKey('unit'));
  view.addSubview(unitDropDown);

  view.addSubview(createLabel(0, viewHeight - 40, 100, 20, "DPI"));
  var dpiInput = createInput(100, viewHeight - 40, 150, 20, userDefaults.objectForKey(
    'dpi'));
  view.addSubview(dpiInput);

  var dpiHint = createLabel(0, viewHeight - 100, 300, 60,
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
