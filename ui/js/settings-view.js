/**
 * Settings view functions
 */

let defaultUnit = '_last'

/**
 * Set the default unit
 * @param {string} pDefaultUnit Unit to set
 */
window.setDefaultUnit = pDefaultUnit => {
  defaultUnit = pDefaultUnit
}

/**
 * Redraw the UI
 */
window.redrawUI = () => {
  $('#unitsTable .unitRow').remove()
  $('#defaultUnitSelect option').remove()

  // Redraw the unit table

  for (let unitName of Object.keys(units).sort()) {
    const unit = units[unitName]
    const unitRow = $('<tr class="unitRow"></tr>')
    unitRow.click(() => {
      openEditUnitEditor(unitRow)
    })
    unitRow.css('cursor', 'pointer')

    unitRow.data('unitName', unit.unitName)
    unitRow.data('dpi', unit.dpi)
    unitRow.data('factor', unit.factor)
    unitRow.data('precision', unit.precision)

    unitRow.append(`<td class="unitName">${unit.unitName}</td>`)
    unitRow.append(`<td class="dpi">${unit.dpi}</td>`)
    unitRow.append(`<td class="factor">${unit.factor}</td>`)
    unitRow.append(`<td class="precision">${unit.precision}</td>`)

    $('#unitsTable tbody').append(unitRow)
  }

  // Redraw the default unit selection
  for (let unitName of ['_none', '_last'].concat(Object.keys(units))) {
    let description = unitName

    if (unitName === '_none') {
      description = 'None'
    } else if (unitName === '_last') {
      description = 'Last selected'
    }

    let selected = ''

    if (unitName === defaultUnit) {
      selected = ' selected'
    }

    $('#defaultUnitSelect').append(`<option value="${unitName}"${selected}>${description}</option>`)
  }
}

/**
 * Show an error message
 * @param {string} message Error message
 */
window.showErrorMessage = message => {
  $('#errorMessage').html(message)
  $('#errorMessage').show()
}

/**
 * Hide the error message alert
 */
window.hideErrorMessage = () => {
  $('#errorMessage').hide()
}

/**
 * Check the unit editor form for validity
 */
checkFormValidity = () => {
  return $('input', '#unitEditorForm')
    .toArray()
    .reduce((isValid, item) => {
      if (item.id === 'unitName') {
        if (units.hasOwnProperty(item.value)) {
          isValid = false
          item.setCustomValidity('Name already exists')
        }
      }
      if (!item.checkValidity()) {
        isValid = false
      }
      return isValid
    }, true)
}

/**
 * Open the unit editor to add a new unit
 */
openNewUnitEditor = () => {
  $('#editWindow').modal()

  // Remove event triggers on modal hide
  $('#editWindow').on('hidden.bs.modal', () => {
    $('#unitEditorOk').off()
  })

  // reset input fields

  $('#unitName')
    .val('')
    .focus()
  $('#dpi').val('')
  $('#factor').val('')
  $('#precision').val(2)

  // Hide delete button for new units
  $('#unitEditorDelete').hide()

  $('#unitEditorOk').click(() => {
    // Validate form
    var isFormValid = checkFormValidity()
    if (isFormValid === false) {
      // Mimic a form submit to trigger form validation messages
      $('<input type="submit">')
        .hide()
        .appendTo($('#unitEditorForm'))
        .click()
        .remove()
    } else {
      // Add the unit
      units[$('#unitName').val()] = {
        unitName: $('#unitName').val(),
        dpi: $('#dpi').val(),
        factor: $('#factor').val(),
        precision: $('#precision').val()
      }
      $('#editWindow').modal('hide')
      redrawUI()
    }
  })
}

/**
 * Open the unit editor to modify an existing unit
 * @param {Object} unitRow the table row holding the existing unit
 */
openEditUnitEditor = unitRow => {
  const originalUnitName = unitRow.data('unitName')
  $('#editWindow').modal()

  // Remove event triggers on modal hide

  $('#editWindow').on('hidden.bs.modal', () => {
    $('#unitEditorOk').off()
    $('#unitEditorDelete').off()
  })

  // Set input field values
  $('#unitName')
    .val(unitRow.data('unitName'))
    .focus()
  $('#dpi').val(unitRow.data('dpi'))
  $('#factor').val(unitRow.data('factor'))
  $('#precision').val(unitRow.data('precision'))

  // React to delete action
  $('#unitEditorDelete')
    .show()
    .click(() => {
      $('#editWindow').modal('hide')
      delete(units[originalUnitName])
      redrawUI()
    })
  $('#unitEditorOk').click(() => {
    // Validate form
    var isFormValid = checkFormValidity()
    if (isFormValid === false) {
      // Mimic a form submit to trigger form validation messages
      $('<input type="submit">')
        .hide()
        .appendTo($('#unitEditorForm'))
        .click()
        .remove()
    } else {
      // Change row to match the edited fields
      delete units[originalUnitName]
      units[$('#unitName').val()] = {
        unitName: $('#unitName').val(),
        dpi: $('#dpi').val(),
        factor: $('#factor').val(),
        precision: $('#precision').val()
      }
      redrawUI()
      $('#editWindow').modal('hide')
    }
  })
}

/**
 * Call the plugin to store the current settings
 */
saveSettings = () => {
  window.postMessage('saveSettings', { units: units, defaultUnit: defaultUnit })
}
