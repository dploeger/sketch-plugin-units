const UI = require('sketch/ui')
const DOM = require('sketch/dom')

export function getSelection() {
  const document = DOM.getSelectedDocument()
  if (!document) {
    UI.alert('Units', 'Please open a document')
    return null
  }

  const selection = document.selectedLayers

  if (selection.length === 0) {
    UI.alert('Units', 'Please select a layer')
    return null
  }

  if (selection.length > 1) {
    UI.alert(
      'Only one layer supported',
      'Currently, Units only supports to resize one layer. You might want to group multiple layers to allow them to be resized by Units'
    )
    return null
  }

  return selection
}
