export function initVars(context) {
  userDefaults = NSUserDefaults.alloc().initWithSuiteName(
    'de.dieploegers.resize');

  var changed = false;
  if (!userDefaults.objectForKey('unit')) {
    userDefaults.setObject_forKey('inch', 'unit');
    changed = true;
  }

  if (!userDefaults.objectForKey('dpi')) {
    userDefaults.setObject_forKey('72', 'dpi');
    changed = true;
  }

  if (changed) {
    userDefaults.synchronize();
  }
  return userDefaults;
}
