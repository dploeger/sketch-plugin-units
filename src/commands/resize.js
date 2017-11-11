/**
 * The resize command
 */

import {
  createResizeDialog
}
from '../ui/resizeDialog.js';

import {
  initVars
}
from '../base.js';

import {
  calculate
}
from '../lib/calculate.js';

/**
 * The resize command
 *
 * @param context Sketch app context
 */
export default function onRun(context) {
  initVars(context);
  let dpi = userDefaults.objectForKey('dpi');
  let unit = userDefaults.objectForKey('unit');
  let api = context.api();
  if (context.selection.length === 0) {
    context.api().alert('No selection', 'Please select an item.');
  } else {
    let alert = createResizeDialog(context);
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
