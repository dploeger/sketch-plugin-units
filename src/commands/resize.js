import {
  createResizeDialog
}
from '../ui/dialog.js';

import {
  initVars
}
from '../base.js';

import {
  calculate
}
from '../lib/calculate.js';

export default function onRun(context) {
  var userDefaults = initVars(context);
  let dpi = userDefaults.objectForKey('dpi');
  let unit = userDefaults.objectForKey('unit');
  let api = context.api();
  if (context.selection.length === 0) {
    context.api().alert('No selection', 'Please select an item.');
  } else {
    let alert = createResizeDialog(context, userDefaults);
    if (alert.alert.runModal() == '1000') {
      for (let i = 0; i < context.selection.length; i++) {
        let selected = context.selection[i];
        selected.frame().setWidth(calculate(
          alert.widthInput.stringValue(),
          dpi,
          unit
        ));
        selected.frame().setHeight(
          calculate(
            alert.heightInput.stringValue(),
            dpi,
            unit
          )
        );
      }
    }
  }
}
