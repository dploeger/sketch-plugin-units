/**
 * Dialog utilities
 */

export function createLabel(x, y, width, height, text) {
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

export function createInput(x, y, width, height, value) {
  var input = NSTextField.alloc().initWithFrame(
    NSMakeRect(x, y, width, height)
  );
  input.setStringValue(value);
  return input;
}

export function createDropdown(x, y, width, height, options) {
  var dropdown = NSPopUpButton.alloc().initWithFrame(
    NSMakeRect(x, y, width, height)
  );

  for (let option of options) {
    dropdown.addItemWithTitle(option)
  }

  return dropdown;
}
