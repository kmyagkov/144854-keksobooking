'use strict';

(function () {

  window.synchronizeFields = {
    syncFields: function (elem1, elem2, value1, value2, action) {
      if (Array.isArray(value1) && Array.isArray(value2)) {
        var elem1Value = elem1.value;
        var elem2Value = value2[value1.indexOf(elem1Value)];
      } else {
        elem1Value = elem1.value;
        elem2Value = value2[elem1Value];
      }
      action(elem2, elem2Value);
    }
  };
})();
