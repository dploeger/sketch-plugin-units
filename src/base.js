/**
 * Initialize user defaults
 * @param context App context
 */
export function initVars(context) {
  userDefaults = NSUserDefaults.alloc().initWithSuiteName(
    'de.dieploegers.resize');

  var changed = false;
  if (!userDefaults.objectForKey('unit')) {
    // set the default unit value to inch
    userDefaults.setObject_forKey('inch', 'unit');
    changed = true;
  }

  if (!userDefaults.objectForKey('dpi')) {
    // set the default dpi value to 72
    userDefaults.setObject_forKey('72', 'dpi');
    changed = true;
  }

  if (changed) {
    // save the user defaults
    userDefaults.synchronize();
  }
}
