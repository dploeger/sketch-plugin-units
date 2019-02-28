/* Bridges used by the plugin */

/**
 * Add a new unit to the units table
 * @param {Object} unit New unit object
 * @param {string} unit.unitName Name of unit (is used as an identifier)
 * @param {string} unit.dpi DPI value
 * @param {string} unit.factor Conversion factor
 */
window.addUnit = function(unit) {
  const unitRow = $('<tr class="unitRow"></tr>');
  unitRow.click(() => {
    openEditUnitEditor(unitRow);
  });
  unitRow.css("cursor", "pointer");

  unitRow.data("unitName", unit.unitName);
  unitRow.data("dpi", unit.dpi);
  unitRow.data("factor", unit.factor);

  unitRow.append("<td class=unitName>" + unit.unitName + "</td>");
  unitRow.append("<td class=dpi>" + unit.dpi + "</td>");
  unitRow.append("<td class=factor>" + unit.factor + "</td>");

  $("#unitsTable tbody").append(unitRow);
};

/**
 * Show an error message
 */
window.showErrorMessage = function(message) {
  $("#errorMessage").html(message);
  $("#errorMessage").show();
};

/**
 * Hide the error message alert
 */
window.hideErrorMessage = function() {
  $("#errorMessage").hide();
};

/**
 * UI handling
 */

checkFormValidity = function() {
  return $("input", "#unitEditorForm")
    .toArray()
    .reduce(function(isValid, item) {
      if (item.id === "unitName") {
        var exists = $(".unitRow")
          .toArray()
          .reduce(function(doesNameExist, existingItem) {
            if ($(existingItem).data("unitName") === item.value) {
              doesNameExist = true;
            }
            return doesNameExist;
          }, false);
        if (exists) {
          isValid = false;
          item.setCustomValidity("Name already exists");
        }
      }
      if (!item.checkValidity()) {
        isValid = false;
      }
      return isValid;
    }, true);
};

/**
 * Open the unit editor to add a new unit
 */
openNewUnitEditor = function() {
  $("#editWindow").modal();

  // Remove event triggers on modal hide
  $("#editWindow").on("hidden.bs.modal", function() {
    $("#unitEditorOk").off();
  });

  // reset input fields

  $("#unitName")
    .val("")
    .focus();
  $("#dpi").val("");
  $("#factor").val("");

  // Hide delete button for new units
  $("#unitEditorDelete").hide();

  $("#unitEditorOk").click(function() {
    // Validate form
    var isFormValid = checkFormValidity();
    if (isFormValid === false) {
      // Mimic a form submit to trigger form validation messages
      $('<input type="submit">')
        .hide()
        .appendTo($("#unitEditorForm"))
        .click()
        .remove();
    } else {
      // Add the unit
      window.addUnit({
        unitName: $("#unitName").val(),
        dpi: $("#dpi").val(),
        factor: $("#factor").val()
      });
      $("#editWindow").modal("hide");
    }
  });
};

/**
 * Open the unit editor to modify an existing unit
 * @param {Object} unitRow the table row holding the existing unit
 */
openEditUnitEditor = function(unitRow) {
  $("#editWindow").modal();

  // Remove event triggers on modal hide

  $("#editWindow").on("hidden.bs.modal", function() {
    $("#unitEditorOk").off();
    $("#unitEditorDelete").off();
  });

  // Set input field values
  $("#unitName")
    .val(unitRow.data("unitName"))
    .focus();
  $("#dpi").val(unitRow.data("dpi"));
  $("#factor").val(unitRow.data("factor"));

  // React to delete action
  $("#unitEditorDelete")
    .show()
    .click(function() {
      $("#editWindow").modal("hide");
      $(unitRow).remove();
    });
  $("#unitEditorOk").click(function() {
    // Validate form
    var isFormValid = checkFormValidity();
    if (isFormValid === false) {
      // Mimic a form submit to trigger form validation messages
      $('<input type="submit">')
        .hide()
        .appendTo($("#unitEditorForm"))
        .click()
        .remove();
    } else {
      // Change row to match the edited fields
      unitRow.data("unitName", $("#unitName").val());
      unitRow.data("dpi", $("#dpi").val());
      unitRow.data("factor", $("#factor").val());
      $(".unitName", unitRow).text($("#unitName").val());
      $(".dpi", unitRow).text($("#dpi").val());
      $(".factor", unitRow).text($("#factor").val());
      $("#editWindow").modal("hide");
    }
  });
};

/**
 * Gather all units from the unit table and call the plugin to store them
 */
saveSettings = function() {
  var units = [];
  $(".unitRow")
    .toArray()
    .forEach(function(value) {
      var item = $(value);
      units.push({
        unitName: item.data("unitName"),
        dpi: item.data("dpi"),
        factor: item.data("factor")
      });
    });
  window.postMessage("saveSettings", units);
};
